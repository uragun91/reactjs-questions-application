import React from 'react';

import './Button.scss';

export const Button = ({
  disabled,
  children,
  variant = 'primary',
  onClick,
  ...rest
}: React.HTMLAttributes<HTMLElement> & {
  disabled?: boolean;
  variant?: 'primary' | 'outline-primary';
}) => {
  return (
    <button
      data-testid="button"
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};
