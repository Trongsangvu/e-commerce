import { addToCart, updateCart } from "../../services/cart-service";
import { CartData, ICartResponse } from "../../types/cart-type";
import { createAppThunk } from "../../utils/create-app-thunk-util";

export const addToCartAction = createAppThunk<ICartResponse, CartData>(
  "cart/addToCart",
  async (data) => {
    return await addToCart(data);
  },
);

export const updateCartAction = createAppThunk<ICartResponse, CartData>(
  "cart/updateCart",
  async (data) => {
    return await updateCart(data);
  },
);
