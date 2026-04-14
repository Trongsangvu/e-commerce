import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import images from "../../assets/images/images";
import config from "../../config/config";
import { RootStore } from "../../redux/store";
import { list } from "../../services/product-service";
import { IProduct } from "../../types/product-type";
import { SkeletonCustom } from "../common/SkeletonCustom";

export const ProductList: React.FC = () => {
  // Query data
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: list,
  });

  const selectedCategory = useSelector(
    (state: RootStore) => state.category.selectedCategory,
  );

  // Filter products by categories
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (product: IProduct) => product.category === selectedCategory,
        );

  if (error) return <p>Error fetching products</p>;

  return (
    <>
      <div>
        {isLoading ? (
          <SkeletonCustom count={6} />
        ) : (
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-6 place-items-center">
            {filteredProducts &&
              filteredProducts.map((product: IProduct) => (
                <Link
                  key={product._id}
                  to={config.routes.productDetail.replace(":id", product._id)}
                >
                  <li className="mb-35 max-w-270 w-full mx-auto">
                    <div className="max-w-270 w-full overflow-hidden relative group">
                      <img
                        className="max-w-270 w-full h-335 cursor-pointer transition-transform duration-500 group-hover:scale-110"
                        src={product.image_url}
                        alt={product.name}
                        loading="lazy"
                      />
                      <button
                        className="absolute cursor-pointer flex justify-center hover:bg-[#222] hover:text-[white] hover:border-[#222] items-center mb-20 -bottom-5 left-1/2 -translate-x-1/2 bg-white rounded-20 min-w-139 h-40 font-[Poppins-regular] text-[#333] text-12 opacity-0 scale-50 transition-all duration-500 ease-out group-hover:bottom-2 group-hover:text-lg group-hover:opacity-100 group-hover:scale-90"
                        onClick={(e) => e.preventDefault()}
                      >
                        Quick view
                      </button>
                    </div>
                    <div className="flex items-start justify-between pt-14 max-w-270">
                      <div className="flex flex-col">
                        <span className="text-[#999] pb-6 font-[Poppins-regular] text-sm">
                          {product.name}
                        </span>
                        <span className="text-[#666] font-[Poppins-regular] text-sm">
                          {product.price}
                        </span>
                      </div>
                      <div className="flex">
                        <button>
                          <img
                            className="w-18 h-16"
                            src={images.heartIcon}
                            alt=""
                          />
                        </button>
                      </div>
                    </div>
                  </li>
                </Link>
              ))}
          </ul>
        )}
      </div>
    </>
  );
};
