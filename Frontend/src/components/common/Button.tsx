import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, type = "button", ...props }: ButtonProps) => {
  return (
    <button type={type} {...props}>
      {children}
    </button>
  );
};

export default Button;