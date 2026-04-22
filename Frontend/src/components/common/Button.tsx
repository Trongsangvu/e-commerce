import React from "react";

interface ButtonProps {
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

type Props = React.PropsWithChildren<ButtonProps>;

const Button = ({
  onClick,
  onMouseEnter,
  onMouseLeave,
  className,
  children,
  disabled,
  type = "button",
}: Props) => {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={className}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
