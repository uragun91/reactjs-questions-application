import React, { useCallback, useEffect, useState } from 'react';

import './QuestionsList.scss';

import { IQuestion } from '../../models/question.interface';
import { Question } from '../question/Question';

export const QuestionsList = ({
  questions,
  onAnswer,
  className,
  ...rest
}: {
  questions: IQuestion[];
  onAnswer: (checkId: string, answer: 'Yes' | 'No') => void;
} & React.HTMLAttributes<HTMLElement>) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [keyboardEnabled, setKeyboardEnabled] = useState(false);

  const handleAnswer = useCallback(
    (checkId: string, answer: 'Yes' | 'No') => {
      setCurrentQuestionIndex(
        questions.findIndex((question) => question.id === checkId)
      );
      setKeyboardEnabled(true);
      onAnswer(checkId, answer);
    },
    [onAnswer, questions]
  );

  const onKeyDown = useCallback(
    (event) => {
      const enabledKeys = ['ArrowUp', 'ArrowDown', 'Digit1', 'Digit2'];

      if (!keyboardEnabled && enabledKeys.indexOf(event.code) > -1) {
        setKeyboardEnabled(true);
      }

      switch (event.code) {
        case 'ArrowUp':
          if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
          }
          return;
        case 'ArrowDown':
          if (currentQuestionIndex < questions.length - 1) {
            if (
              ![undefined, 'No'].includes(
                questions[currentQuestionIndex].answer
              )
            ) {
              setCurrentQuestionIndex(currentQuestionIndex + 1);
            }
          }
          return;
        case 'Digit1':
          return onAnswer(questions[currentQuestionIndex].id, 'Yes');
        case 'Digit2':
          return onAnswer(questions[currentQuestionIndex].id, 'No');
        default:
          return;
      }
    },
    [questions, currentQuestionIndex, keyboardEnabled, onAnswer]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [questions, currentQuestionIndex, onKeyDown]);

  return (
    <section className={`questions-list ${className ?? ''}`} {...rest}>
      {questions.map((question, index) => (
        <Question
          className="questions-list__question"
          question={question}
          key={question.id}
          active={keyboardEnabled && currentQuestionIndex === index}
          disabled={
            !!questions[index - 1] &&
            [undefined, 'No'].includes(questions[index - 1].answer)
          }
          onAnswer={handleAnswer}
        />
      ))}
    </section>
  );
};
