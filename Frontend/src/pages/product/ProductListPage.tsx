import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootStore } from "../../redux/store";
import { list } from "../../services/product-service";

const ProductListPage = () => {
  // Query data
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: list,
  });

  const productByCategory = useSelector(
    (state: RootStore) => state.category.featureProductByMen,
  );

  // Filter products by selected category
  const filterProductsByCty = products.filter(
    (product) => product.category === productByCategory,
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching products</p>;

  return (
    <div>
      <h3 className="font-[Poppins-bold] text-3xl mt-20 text-[#333]">
        Feature Products
      </h3>
      <ul>
        {filterProductsByCty.map((product, index) => (
          <li key={index} className="flex gap-5 mt-30 mb-30 items-center">
            <div className="w-90 h-110">
              <a href="#">
                <img src={product?.image_url} alt="" />
              </a>
            </div>
            <div className="flex flex-col pl-20">
              <span className="font-[Poppins-regular] text-sm text-[#555] pb-20">
                {product?.name}
              </span>
              <span className="font-[Poppins-regular] text-[#888]">
                {product?.price}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductListPage;
