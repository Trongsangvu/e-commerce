export const PrevArrow = (props: { onClick?: () => void }) => {
    const { onClick } = props;
    return (
        <button
            className="absolute cursor-pointer left-0 top-1/2 -translate-y-1/2 bg-white/80 p-10 shadow-md z-10"
            onClick={onClick}
        >
            ←
        </button>
    )
}

export const NextArrow = (props: { onClick?: () => void }) => {
    const { onClick } = props;
    return (
        <button 
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-10 cursor-pointer shadow-md z-10"
            onClick={onClick}
        >
            →
        </button>
    );
};