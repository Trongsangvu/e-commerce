import { useFetch } from "../../hooks/use-fetch";
import { useAppSelector } from "../../hooks/use-redux";
import { RootStore } from "../../redux/store";
import { list } from "../../services/product-service";
import { IProduct } from "../../types/product-type";
import { SkeletonCustom } from "../common/skeleton-custom";
import ProductCard from "./product-card";

const ProductList = () => {
  const { data: products = [], isLoading, error } = useFetch({
    queryKey: ["products"],
    queryFn: () => list(),
  });

  const selectedCategory = useAppSelector(
    (state: RootStore) => state.category.selectedCategory,
  );

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p: IProduct) => p.category === selectedCategory);

  if (error) return (
    <p className="text-center py-20 text-[#8a8278] text-sm tracking-wide">
      Unable to load products. Please try again.
    </p>
  );

  return (
    <div>
      {isLoading ? (
        <SkeletonCustom count={8} />
      ) : (
        <ul className="grid grid-cols-4 gap-24 list-none p-0 m-0">
          {filteredProducts.map((product: IProduct) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;