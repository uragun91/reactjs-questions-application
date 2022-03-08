import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import '@testing-library/jest-dom';

import { IQuestion } from '../../models/question.interface';
import { AnswerControl } from './AnswerControl';

it('should render buttons labeled Yes and No', () => {
  const mockQuestion: IQuestion = { id: 'a', description: 'b', priority: 1 };
  const mockOnAnswer = () => {};

  render(<AnswerControl question={mockQuestion} onAnswer={mockOnAnswer} />);

  expect(screen.getByText('Yes')).toBeInTheDocument();
  expect(screen.getByText('No')).toBeInTheDocument();
});

it('should call onAnswer when click on Yes or No', async () => {
  const mockQuestion: IQuestion = { id: 'a', description: 'b', priority: 1 };
  const mockOnAnswer = jest.fn(() => {});

  render(<AnswerControl question={mockQuestion} onAnswer={mockOnAnswer} />);

  const yesButton = screen.getByText('Yes');
  await fireEvent.click(yesButton);

  expect(mockOnAnswer).toHaveBeenCalledWith('a', 'Yes');
});
