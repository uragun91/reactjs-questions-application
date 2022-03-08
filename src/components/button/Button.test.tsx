import { render } from '@testing-library/react';
import React from 'react';

import '@testing-library/jest-dom';

import { Button } from './Button';

it('should render buttonwith  proper className', () => {
  const { container } = render(<Button variant="outline-primary" />);

  expect(container.getElementsByClassName('btn-outline-primary').length).toBe(
    1
  );
});
