import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import images from "../../assets/images/images";
import { MENU_SIZE } from "../../config/menu";
import { addToCartAction } from "../../redux/actions/cart-action";
import { AppDispatch, RootStore } from "../../redux/store";
import { byId } from "../../services/product-service";
import SuggestProducts from "../product/SuggestProductsPage";

const ProductDetailPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isActive, setIsActive] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams<{ id: string }>();

  const updateQuantity = useSelector((state: RootStore) => {
    const cartItem = state.cart.items.find((item) => {
      return item.productId._id === id;
    });
    return cartItem?.quantity || quantity;
  });

  // Query data
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => byId(id!),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching products</p>;

  // Handle active
  const handleActive = (size: string) => {
    setIsActive(size);
  };

  // Handle add quantity
  const handleAddQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  // Handle decrease quantity
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  // Handle add product to cart
  const addProductToCart = () => {
    if (!id) return;
    dispatch(
      addToCartAction({
        productId: id!,
        quantity: updateQuantity,
      }),
    );
    alert("Add product to cart successfully!");
  };

  return (
    <div>
      <div className="relative">
        <img src={images.detailBanner} alt="bannerBlog" />
      </div>
      <div className="bg-[#ffffffd9] mb-20">
        <div className="mx-100 mt-100">
          <div className="flex flex-row gap-50">
            <div className="w-auto flex flex-row px-25 gap-50">
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
              <span className="font-[GucciSansPro-bold]">{product?.price}</span>
              <div className="mb-10">
                <span className="font-[GucciSansPro-bold]">Size:</span>
                <ul className="flex mt-10">
                  {MENU_SIZE.map((item) => (
                    <li
                      className={`border border-[#ccc] font-[GucciSansPro-light] text-sm w-80 text-center py-10 px-10 cursor-pointer mr-10 rounded-sm
                                  ${
                                    isActive === item.size
                                      ? "text-[#6774d5] border-[#6774d5]"
                                      : "text-[#ccc] border-[#ccc]"
                                  }`}
                      onClick={() => handleActive(item.size)}
                      key={item.id}
                    >
                      Size {item.size}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-center flex-col items-center mt-20">
                <div className="mb-10 flex">
                  <button
                    className="w-45 h-44 cursor-pointer border border-[#ccc]"
                    onClick={handleDecreaseQuantity}
                  >
                    -
                  </button>
                  <input
                    className="pl-10 bg-[#f7f7f7] w-50 h-44 text-center border-t border-b outline-none border-[#ccc]"
                    type="number"
                    value={quantity}
                    readOnly
                  />
                  <button
                    className="w-45 h-44 cursor-pointer border border-[#ccc]"
                    onClick={handleAddQuantity}
                  >
                    +
                  </button>
                </div>
                <div>
                  <button
                    className="cursor-pointer uppercase font-[GucciSansPro-bold] bg-[#6774d5] text-white py-10 px-20 rounded-23"
                    onClick={addProductToCart}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <SuggestProducts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
