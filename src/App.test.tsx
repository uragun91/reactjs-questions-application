import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

it('should show loading when rendered', () => {
  const { getByText } = render(<App />);

  expect(getByText(/Please wait, loading\.\.\./)).toBeInTheDocument();
});
