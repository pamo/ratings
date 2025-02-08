import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`bg-primary-purple text-background-white font-normal text-base py-small px-base rounded-md transition-all duration-150 ease-linear hover:opacity-90 cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
