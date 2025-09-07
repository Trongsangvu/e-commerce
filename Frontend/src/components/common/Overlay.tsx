interface OverlayProps {
  isOpen: boolean;
  handleClose: () => void;
}

export const Overlay: React.FC<OverlayProps> = ({ isOpen, handleClose }) => {
  return (
    <div
      className={`fixed z-[60] inset-0 bg-black/50 transition-all duration-500 ease-in-out 
                ${
                  isOpen
                    ? "opacity-100 visible pointer-events-auto"
                    : "opacity-0 invisible pointer-events-none"
                }`}
      onClick={handleClose}
    ></div>
  );
};
