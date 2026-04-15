import React from "react";

interface ButtonProps {
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

type Props = React.PropsWithChildren<ButtonProps>;

const Button = ({
  className,
  onClick,
  children,
  onMouseEnter,
  onMouseLeave,
}: Props) => {
  return (
    <button
      className={className}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </button>
  );
};

export default Button;
