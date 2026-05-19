const ProductSuggestSkeleton = () => {
  return (
    <div className="mt-100 animate-pulse max-w-1200 mx-auto">
      <h3 className="uppercase font-[GucciSansPro-book] mb-30">
        You may also like
      </h3>

      <div className="relative">
        <div className="absolute -left-5 top-[35%] w-50 h-50 bg-gray-200 shadow-md z-10" />

        <div className="flex gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex-1">
              <div className="h-300 bg-gray-200 rounded" />

              <div className="h-5 w-3/4 mt-15 bg-gray-200 rounded" />

              <div className="h-5 w-1/3 mt-10 bg-gray-200 rounded" />
            </div>
          ))}
        </div>

        <div className="absolute -right-5 top-[35%] w-50 h-50 bg-gray-200 shadow-md z-10" />
      </div>
    </div>
  );
};

export default ProductSuggestSkeleton;