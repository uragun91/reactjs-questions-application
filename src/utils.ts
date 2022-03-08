import { IQuestion } from './models/question.interface';

export const isFormValid = (questions: IQuestion[]) => {
  return (
    questions.length &&
    (questions.some((question) => question.answer === 'No') ||
      questions.every((question) => question.answer === 'Yes'))
  );
};
