import { CartState } from "../redux/cart/cart-slice";

export const updateTotals = (state: CartState) => {
  state.totalQuantity = state.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  state.totalAmount = state.items.reduce(
    (total, item) => total + item.quantity * item.productId.price,
    0,
  );
};
