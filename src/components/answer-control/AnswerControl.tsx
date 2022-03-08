import { IQuestion } from '../../models/question.interface';
import { Button } from '../button/Button';

import './AnswerControl.scss';

export const AnswerControl = ({
  question,
  disabled,
  onAnswer,
}: {
  question: IQuestion;
  disabled?: boolean;
  onAnswer: (checkId: string, value: 'Yes' | 'No') => void;
}) => {
  return (
    <div className="answer-control">
      <Button
        disabled={Boolean(disabled)}
        onClick={() => {
          onAnswer(question.id, 'Yes');
        }}
        variant={question.answer === 'Yes' ? 'primary' : 'outline-primary'}
      >
        Yes
      </Button>
      <Button
        disabled={Boolean(disabled)}
        onClick={() => {
          onAnswer(question.id, 'No');
        }}
        variant={question.answer === 'No' ? 'primary' : 'outline-primary'}
      >
        No
      </Button>
    </div>
  );
};
