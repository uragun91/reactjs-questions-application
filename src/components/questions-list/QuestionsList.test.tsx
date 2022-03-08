import { fireEvent, render, screen } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import React from 'react';

import '@testing-library/jest-dom';
import { IQuestion } from '../../models/question.interface';
import { QuestionsList } from './QuestionsList';

const mockQuestions: IQuestion[] = [
  { id: 'a', description: 'a', priority: 1 },
  { id: 'b', description: 'a', priority: 1 },
];

it('should render question with active className when pressing arrow down', async () => {
  const { container } = render(
    <QuestionsList questions={mockQuestions} onAnswer={() => {}} />
  );

  await fireEvent.keyDown(document, { key: 'ArrowUp', code: 'ArrowUp' });

  expect(container.getElementsByClassName('question active').length).toBe(1);
});

it('should react on Digit1 and Digit2 keys', async () => {
  const handleAnswer = jest.fn(() => {});

  render(<QuestionsList questions={mockQuestions} onAnswer={handleAnswer} />);

  fireEvent.keyDown(document, { key: 'Digit1', code: 'Digit1' }); // say yes
  expect(handleAnswer).toHaveBeenLastCalledWith('a', 'Yes');
  fireEvent.keyDown(document, { key: 'Digit1', code: 'Digit2' }); // say no
  expect(handleAnswer).toHaveBeenLastCalledWith('a', 'No');
});

it('should react on ArrowUp and ArrowDown keys', async () => {
  const handleAnswer = jest.fn(() => {});

  const { rerender } = render(
    <QuestionsList questions={mockQuestions} onAnswer={handleAnswer} />
  );

  fireEvent.keyDown(document, { key: 'Digit1', code: 'Digit1' }); // say yes
  expect(handleAnswer).toHaveBeenLastCalledWith('a', 'Yes');

  let newMockQuestions: IQuestion[] = [
    { ...mockQuestions[0], answer: 'Yes' },
    { ...mockQuestions[1] },
  ];

  rerender(
    <QuestionsList questions={newMockQuestions} onAnswer={handleAnswer} />
  );
  const secondQuestion = screen.getAllByTestId('question')[1];
  expect(secondQuestion.classList.contains('disabled')).toBeFalsy();

  fireEvent.keyDown(document, { key: 'ArrowDown', code: 'ArrowDown' }); // press arrowdown
  expect(secondQuestion.classList.contains('active')).toBeTruthy();

  fireEvent.keyDown(document, { key: 'ArrowUp', code: 'ArrowUp' }); // press arrowdown
  const firstQuestion = screen.getAllByTestId('question')[0];
  expect(firstQuestion.classList.contains('active')).toBeTruthy();
  expect(secondQuestion.classList.contains('active')).toBeFalsy();

  newMockQuestions = [
    { ...mockQuestions[0], answer: 'No' },
    { ...mockQuestions[1] },
  ];

  rerender(
    <QuestionsList questions={newMockQuestions} onAnswer={handleAnswer} />
  );
  expect(secondQuestion.classList.contains('disabled')).toBeTruthy();
});
