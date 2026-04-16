import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import images from "../../assets/images/images";
import Button from "../../components/common/Button";
import config from "../../config/config";
import { updateCartAction } from "../../redux/actions/cart-action";
import {
  addQuantity,
  decreaseQuantity,
  setCartItems,
} from "../../redux/slices/cart-slice";
import { AppDispatch } from "../../redux/store";
import { getCart } from "../../services/cart-service";
import { ICartItem } from "../../types/cart-type";
import LANGUAGE from "../../utils/language.util";

const CartPage = () => {
  const [selectedValue, setSelectedValue] = useState("option1");

  const dispatch = useDispatch<AppDispatch>();

  // Query data
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  useEffect(() => {
    if (data?.items) {
      const formattedItems: ICartItem[] = data.items;
      dispatch(setCartItems(formattedItems));
    }
  }, [data, dispatch]);

  if (isLoading) return <h3>Loading...</h3>;
  if (error) return <h3>Error: {error.message}</h3>;

  // Cart items
  const cartItems = data?.items ?? [];
  console.log("Cart Items:", cartItems);

  // Handle update cart
  const handleUpdateCart = async (
    index: number,
    type: "increase" | "decrease",
  ) => {
    const item = cartItems[index];
    if (!item) return;

    if (type === "decrease" && item.quantity <= 1) return;

    const newQuantity =
      type === "increase" ? item.quantity + 1 : item.quantity - 1;

    try {
      dispatch(
        type === "increase"
          ? addQuantity({ index })
          : decreaseQuantity({ index }),
      );
      await dispatch(
        updateCartAction({
          productId: item.productId._id,
          quantity: newQuantity,
        }),
      ).unwrap();

      await refetch();
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  return (
    <div>
      <div className="pb-85">
        <div className="relative">
          <div className="">
            <img src={images.profileBanner} alt="profile" />
          </div>
          <div className="flex justify-center absolute top-[70%] left-[38%]">
            <span className="uppercase font-[GucciSansPro-light] text-5xl text-white">
              {LANGUAGE.CART.SHOPPING_BAG}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-start max-w-680 mt-30 mb-20">
          <Link to={config.ROUTES.home}>
            <span className="pl-150 font-[Poppins-regular] text-sm text-[#555]">
              {LANGUAGE.GENERAL.HOME}
            </span>
          </Link>
          <span>
            <img className="w-20 h-30" src={images.angleRight} alt="" />
          </span>
          <span className="font-[Poppins-regular] text-sm text-[#999]">
            {LANGUAGE.CART.SHOPPING_CART}
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr]">
          <div className="pl-150">
            <table className="min-w-680">
              <thead className="border border-[#ccc]">
                <tr>
                  <th className="py-15 pl-50 font-[Poppins-bold] text-start uppercase text-sm text-[#555]">
                    {LANGUAGE.PRODUCT.PRODUCT}
                  </th>
                  <th className="py-15 w-173"></th>
                  <th className="py-15 font-[Poppins-bold] text-start uppercase text-sm text-[#555]">
                    {LANGUAGE.PRODUCT.PRICE}
                  </th>
                  <th className="py-15 font-[Poppins-bold] text-center uppercase text-sm text-[#555]">
                    {LANGUAGE.PRODUCT.QUANTITY}
                  </th>
                  <th className="py-15 pl-50 pr-50 text-center font-[Poppins-bold] uppercase text-sm text-[#555]">
                    {LANGUAGE.PRODUCT.TOTAL}
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cart: ICartItem, index: number) => {
                  let priceString = String(cart.productId?.price);
                  priceString = priceString.replace(/[^0-9.]/g, ""); // Ensure price is a number
                  const price = parseFloat(priceString) || 0; // Convert to number
                  const quantity = cart.quantity || 0;
                  const total = (price * cart.quantity).toFixed(2);
                  return (
                    <tr className="border border-[#ccc] h-185" key={index}>
                      <td className="pl-50 w-133">
                        <img
                          className="w-80 h-100 cursor-pointer"
                          src={cart.productId.imageUrl}
                          alt={cart.productId.name}
                        />
                      </td>
                      <td className="font-[Poppins-regular] text-[#555] pl-10 w-222">
                        {cart.productId.name}
                      </td>
                      <td className="font-[Poppins-regular] text-[#555] w-145">
                        {cart.productId.price}
                      </td>
                      <td className="font-[Poppins-regular] text-[#555] w-120">
                        <div className="flex">
                          <Button
                            className="w-45 h-44 cursor-pointer border border-[#ccc]"
                            onClick={() => handleUpdateCart(index, "decrease")}
                          >
                            -
                          </Button>
                          <input
                            className="bg-[#f7f7f7] w-50 h-44 text-center pl-10 border-t border-b outline-none border-[#ccc]"
                            type="number"
                            value={quantity}
                            readOnly
                          />
                          <Button
                            className="w-45 h-44 cursor-pointer border border-[#ccc]"
                            onClick={() => handleUpdateCart(index, "increase")}
                          >
                            +
                          </Button>
                        </div>
                      </td>
                      <td className="font-[Poppins-regular] text-center text-[#555] w-172">
                        ${total}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="border border-[#e6e6e6] mr-40 w-470 h-620">
            <div className="px-40 py-30 h-auto">
              <h3 className="uppercase font-[Poppins-bold] pb-30">
                cart totals
              </h3>
              <div>
                <div className="pb-13 border-b border-dashed border-[#d9d9d9]">
                  <span className="font-[Poppins-regular] text-[#333]">
                    Total:{" "}
                  </span>
                  <span className="font-[Poppins-regular] ml-45">
                    $
                    {cartItems
                      .reduce((total: number, item: ICartItem) => {
                        const price =
                          parseFloat(
                            String(item.productId?.price).replace(
                              /[^0-9.]/g,
                              "",
                            ),
                          ) || 0;
                        return total + price * item.quantity;
                      }, 0)
                      .toFixed(2)}
                  </span>
                </div>
                <div className="flex flex-row gap-20 pt-15 pb-30 border-b border-dashed border-[#d9d9d9]">
                  <div className="w-[1/3]">
                    <span className="font-[Poppins-regular]">Shipping:</span>
                  </div>
                  <div className="w-2/3">
                    <p className="font-[Poppins-regular] text-[#888]">
                      There are no shipping methods available. Please double
                      check your address, or contact us if you need any help.
                    </p>
                    <div className="pt-20">
                      <span className="font-[Poppins-regular] uppercase text-[#555]">
                        calculate shipping
                      </span>
                      <div className="relative">
                        <select
                          value={selectedValue}
                          onChange={(e) => setSelectedValue(e.target.value)}
                          name="time"
                          className="mt-20 mb-20 appearance-none font-[Poppins-regular] text-[#555] w-190 h-47 pl-20 py-10 border border-gray-300 bg-white rounded-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                          <option
                            value="option1"
                            className="font-[Poppins-regular] text-[#555]"
                            disabled
                          >
                            Select a country...
                          </option>
                          <option
                            value="option2"
                            className="font-[Poppins-regular] text-[#555]"
                          >
                            Vietnam
                          </option>
                          <option
                            value="option3"
                            className="font-[Poppins-regular] text-[#555]"
                          >
                            US
                          </option>
                          <option
                            value="option4"
                            className="font-[Poppins-regular] text-[#555]"
                          >
                            Australia
                          </option>
                        </select>
                        <span className="absolute inset-y-0 right-90 flex items-center px-2 pointer-events-none">
                          <img
                            className="w-15 h-15"
                            src={images.angleDown}
                            alt="angleDown"
                          />
                        </span>
                      </div>
                      <div className="pb-20">
                        <div className="mt-20 inline-block border border-[#e6e6e6] rounded-22 px-30 py-15 bg-[#f3f3f3]">
                          <button className="font-[Poppins-medium] inline-block cursor-pointer uppercase text-[#333]">
                            update totals
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-20">
                  <button className="text-white cursor-pointer bg-[#222] rounded-22 py-15 px-30 uppercase">
                    proceed to checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
