import Button from "./Button";

export const PrevArrow = ({
  onClick,
}: {
  onClick?: () => void;
}) => {
  return (
    <Button
      className="absolute z-10 top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 cursor-pointer bg-white/80 p-10 shadow-md"
      onClick={onClick}
    >
      ←
    </Button>
  );
};

export const NextArrow = ({
  onClick,
}: {
  onClick?: () => void;
}) => {
  return (
    <Button
      className="absolute z-10 top-1/2 right-0 translate-x-1/2 -translate-y-1/2 cursor-pointer bg-white/80 p-10 shadow-md"
      onClick={onClick}
    >
      →
    </Button>
  );
};