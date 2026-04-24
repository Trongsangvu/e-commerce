const DotsLoading = () => {
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      <span className="h-8 w-8 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
      <span className="h-8 w-8 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
      <span className="h-8 w-8 animate-bounce rounded-full bg-gray-400 [animation-delay:0s]" />
      <span className="h-8 w-8 animate-bounce rounded-full bg-gray-400 [animation-delay:0.15s]" />
    </div>
  );
};

export default DotsLoading;
