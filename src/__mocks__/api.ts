import { IQuestionResultPayload } from '../models/question-result-payload.interface';
import { IQuestion } from '../models/question.interface';

export function fetchChecks(): Promise<IQuestion[]> {
  return new Promise((resolve, reject) =>
    setTimeout(
      () =>
        resolve([
          {
            id: 'aaa',
            priority: 10,
            description: 'Face on the picture matches face on the document',
          },
          {
            id: 'bbb',
            priority: 5,
            description: 'Veriff supports presented document',
          },
        ]),
      100
    )
  );
}

export function submitCheckResults(
  results: IQuestionResultPayload[]
): Promise<IQuestionResultPayload[]> {
  return new Promise((resolve, reject) =>
    setTimeout(
      () =>
        Math.random() <= 0.8 ? resolve(results) : reject({ success: false }),
      500
    )
  );
}
