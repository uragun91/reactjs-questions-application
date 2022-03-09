import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

jest.mock('./api');

it('should show loading when rendered', () => {
  const { getByText } = render(<App />);

  expect(getByText(/Please wait, loading\.\.\./)).toBeInTheDocument();
  cleanup();
});

it('should render questions when successfully loaded', async () => {
  render(<App />);

  const questionNodes = await screen.findAllByTestId('question');

  expect(questionNodes.length).toEqual(2);
});
