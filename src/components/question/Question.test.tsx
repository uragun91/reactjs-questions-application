import { render } from '@testing-library/react';
import React from 'react';

import '@testing-library/jest-dom';
import { Question } from './Question';
import { IQuestion } from '../../models/question.interface';

const mockQuestion: IQuestion = { id: 'a', description: 'a', priority: 1 };

it('should render question with active className', () => {
  const { container } = render(
    <Question
      question={mockQuestion}
      active={true}
      onAnswer={() => {}}
      disabled={false}
    />
  );

  expect(container.getElementsByClassName('question active').length).toBe(1);
});

it('should render question with disabled className', () => {
  const { container } = render(
    <Question
      question={mockQuestion}
      active={false}
      onAnswer={() => {}}
      disabled={true}
    />
  );

  expect(container.getElementsByClassName('question disabled').length).toBe(1);
});

it('should pass className property to the wrapper', () => {
  const { container } = render(
    <Question
      question={mockQuestion}
      active={false}
      onAnswer={() => {}}
      disabled={true}
      className="my-super-test-class-name"
    />
  );

  expect(
    container.getElementsByClassName('question my-super-test-class-name').length
  ).toBe(1);
});
