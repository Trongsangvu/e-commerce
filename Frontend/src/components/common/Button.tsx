import React from "react";

interface ButtonProps {
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

type Props = React.PropsWithChildren<ButtonProps>;

const Button = ({
  className,
  onClick,
  children,
  onMouseEnter,
  onMouseLeave,
  disabled,
  type = "button",
}: Props) => {
  return (
    <button
      className={className}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
