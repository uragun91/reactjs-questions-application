import { IQuestion } from '../../models/question.interface';
import { AnswerControl } from '../answer-control/AnswerControl';
import './Question.scss';

export const Question = ({
  question,
  active,
  onAnswer,
  disabled,
  className,
}: {
  question: IQuestion;
  active: boolean;
  onAnswer: (checkId: string, answer: 'Yes' | 'No') => void;
  disabled: boolean;
  className?: string;
}) => {
  return (
    <div
      data-testid="question"
      className={`question ${active ? 'active' : ''} ${
        disabled ? 'disabled' : ''
      } ${className ?? ''}`}
    >
      <div className="question__description">{question.description}</div>
      <AnswerControl
        question={question}
        onAnswer={onAnswer}
        disabled={disabled}
      />
    </div>
  );
};
