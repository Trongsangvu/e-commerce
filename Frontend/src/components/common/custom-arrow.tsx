import Button from "./Button";

export const PrevArrow = (props: { onClick?: () => void }) => {
  const { onClick } = props;
  return (
    <Button
      className="absolute cursor-pointer left-0 top-1/2 -translate-y-1/2 bg-white/80 p-10 shadow-md z-10"
      onClick={onClick}
    >
      ←
    </Button>
  );
};

export const NextArrow = (props: { onClick?: () => void }) => {
  const { onClick } = props;
  return (
    <Button
      className="absolute cursor-pointer right-0 top-1/2 -translate-y-1/2 bg-white/80 p-10 shadow-md z-10"
      onClick={onClick}
    >
      →
    </Button>
  );
};
