import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import images from "../../assets/images/images";
import Button from "../../components/common/Button";
import ProductDetailSkeleton from "../../components/product/product-detail-skeleton";
import { MENU_SIZE } from "../../config/menu";
import { useFetch } from "../../hooks/use-fetch";
import { useAppDispatch } from "../../hooks/use-redux";
import { addToCartAction } from "../../redux/cart/cart-thunk";
import { byId } from "../../services/product-service";
import ProductSuggestPage from "./product-suggest-page";

const ProductDetailPage = () => {
  const dispatch = useAppDispatch();
  const [isActive, setIsActive] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams<{ id: string; }>();

  const {
    data: product,
    isLoading,
  } = useFetch({
    queryKey: ["product", id],
    queryFn: () => byId(id!),
    enabled: !!id,
    onError: () => {
      toast.error("Failed to load products");
    }
  });

  const handleActive = (size: string) => {
    setIsActive(size);
  };

  const handleAddQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const addProductToCart = () => {
    if (!id) return;
    dispatch(
      addToCartAction({
        productId: id,
        quantity,
      }),
    );
    toast.success("Add product to cart successfully!");
  };

  return (
    <div className="min-h-1200 mb-150">
      <div className="relative">
        <img src={images.detailBanner} alt="bannerBlog" />
      </div>
      <div className="bg-[#ffffffd9] mb-20">
        <div className="mt-100">
          {isLoading ? (
            <ProductDetailSkeleton />
          ) : (
            <>
              <div className="flex flex-row gap-50 mx-auto max-w-1200 justify-start">
                <div className="w-auto flex flex-row pr-25 gap-50">
                  <img
                    className="w-340 h-420"
                    src={product?.image_url}
                    alt={product?.name}
                  />
                </div>
                <div className="w-470">
                  <h3 className="font-[GucciSansPro-book] text-4xl">
                    {product?.name}
                  </h3>
                  <p className="font-[GucciSansPro-light] my-10">
                    {product?.description}
                  </p>
                  <span className="font-[GucciSansPro-bold]">
                    {product?.formattedPrice}
                  </span>
                  <div className="flex items-center gap-10 mt-10">
                    <span className="font-[GucciSansPro-bold]">Size:</span>
                    <ul className="flex">
                      {MENU_SIZE.map((item) => (
                        <li
                          key={item.id}
                          className={`border font-[GucciSansPro-light] text-sm w-80 text-center py-10 px-10 cursor-pointer mr-10 rounded-sm
                        ${isActive === item.size
                              ? "text-[#6774d5] border-[#6774d5]"
                              : "text-[#ccc] border-[#ccc]"
                            }`}
                          onClick={() => handleActive(item.size)}
                        >
                          {item.size}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-10 items-start mt-20">
                    <div className="flex items-center gap-10 mb-20">
                      <div className="flex items-center">
                        <Button
                          className="w-45 h-44 cursor-pointer border border-[#ccc] rounded-l-sm"
                          onClick={handleDecreaseQuantity}
                        >
                          -
                        </Button>
                        <input
                          className="pl-10 bg-[#f7f7f7] w-50 h-44 text-center border-t border-b outline-none border-[#ccc]"
                          type="number"
                          value={quantity}
                          readOnly
                        />
                        <Button
                          className="w-45 h-44 cursor-pointer border border-[#ccc] rounded-r-sm"
                          onClick={handleAddQuantity}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Button
                        className="cursor-pointer h-44 uppercase font-[GucciSansPro-bold] border border-[#ccc] rounded-sm py-10 px-20 rounded-23"
                        onClick={addProductToCart}
                      >
                        Add to cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <ProductSuggestPage />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;