const ProductDetailSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="flex flex-row gap-50 mx-auto max-w-1200 justify-start">
        <div className="w-auto flex flex-row pr-25 gap-50">
          <div className="w-340 h-420 bg-gray-200 rounded" />
        </div>

        <div className="w-470">
          <div className="h-44 w-3/4 bg-gray-200 rounded" />

          <div className="mt-16 h-30 w-full bg-gray-200 rounded" />
          <div className="mt-8 h-30 w-4/5 bg-gray-200 rounded" />

          <div className="mt-20 h-20 w-24 bg-gray-200 rounded" />

          <div className="mt-20 flex items-center gap-10">
            <div className="h-20 w-12 bg-gray-200 rounded" />

            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="w-80 h-40 bg-gray-200 rounded"
              />
            ))}
          </div>

          <div className="mt-20 flex gap-10">
            <div className="w-45 h-44 bg-gray-200 rounded" />
            <div className="w-50 h-44 bg-gray-200 rounded" />
            <div className="w-45 h-44 bg-gray-200 rounded" />

            <div className="w-150 h-44 bg-gray-200 rounded-23" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;