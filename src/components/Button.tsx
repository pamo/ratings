import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button {...props} className={`cursor-pointer ${className}`}>
      {children}
    </button>
  );
}

export default Button;
