import React, { useCallback, useEffect, useState } from 'react';

import './styles.scss';

import { fetchChecks, submitCheckResults } from './api';
import { isFormValid } from './utils';
import { Button } from './components/button/Button';
import { IQuestionResultPayload } from './models/question-result-payload.interface';
import { QuestionsList } from './components/questions-list/QuestionsList';
import { IQuestion } from './models/question.interface';

const App = () => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(
    isFormValid(questions)
  );
  const [isSuccessfullySumitted, setIsSuccessfullySubmitted] = useState(false);
  const [isSubmissionError, setIsSubmissionError] = useState(false);
  const [isFetchingError, setIsFetchingError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getData = useCallback(() => {
    setQuestions([]);
    setIsFetchingError(false);
    setIsFetching(true);
    fetchChecks()
      .then((res: IQuestion[]) => {
        const quest = res.sort((a, b) => a.priority - b.priority);
        setQuestions(quest);
      })
      .catch((err) => {
        setIsFetchingError(true);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);

  useEffect(() => {
    let mounted = true;
    getData();
    return () => {
      mounted = false;
    };
  }, []);

  const handleAnswer = useCallback(
    (id: string, answer: 'Yes' | 'No') => {
      let indexToStartClearAnswersFrom: number;
      const newQuestions = questions.map((question, index) => {
        if (question.id === id) {
          question.answer = answer;
          if (answer === 'No') {
            indexToStartClearAnswersFrom = index;
          }
        }
        if (
          typeof indexToStartClearAnswersFrom === 'number' &&
          index > indexToStartClearAnswersFrom
        ) {
          question.answer = undefined;
        }
        return question;
      });
      setQuestions(newQuestions);
      setIsSubmitEnabled(isFormValid(newQuestions));
    },
    [questions]
  );

  const handleSubmit = useCallback(() => {
    setIsSubmitting(true);
    setIsSubmissionError(false);

    const data: IQuestionResultPayload[] = questions.map((question) => {
      return {
        checkId: question.id,
        result: question.answer as 'Yes' | 'No',
      };
    });

    submitCheckResults(data)
      .then((res) => {
        setIsSuccessfullySubmitted(true);
        setQuestions([]);
      })
      .catch((err) => {
        setIsSubmissionError(true);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }, []);

  const handleRetry = useCallback(() => {
    getData();
  }, [getData]);

  return (
    <div className="app">
      {(isFetching || isFetchingError) && (
        <div className="app__fetching">
          {isFetching && <div>Please wait, loading...</div>}
          {isFetchingError && (
            <div>
              <span>Loading failed. </span>
              <Button onClick={handleRetry} variant="outline-primary">
                Retry
              </Button>
            </div>
          )}
        </div>
      )}
      {isSuccessfullySumitted && (
        <div className="app__success">
          <h1>Success!</h1>
          <Button
            onClick={() => {
              setIsSuccessfullySubmitted(false);
              handleRetry();
            }}
          >
            Retry
          </Button>
        </div>
      )}

      {Boolean(questions.length) && (
        <>
          <QuestionsList
            className="app__questions-list"
            questions={questions}
            onAnswer={handleAnswer}
          />

          <div
            className={`app__submit-error ${
              isSubmissionError ? 'visible' : 'hidden'
            }`}
          >
            Something went wrong. Please try again.
          </div>
          <Button
            disabled={!isSubmitEnabled || isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? 'Saving...' : 'Submit'}
          </Button>
        </>
      )}
    </div>
  );
};

export default App;
