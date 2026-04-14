import cartEndpoints from "../api/cart.api";
import { CartData, ICartResponse } from "../types/cart-type";
import httpService from "./http-service";

export const getCart = async (): Promise<ICartResponse> => {
  const res = await httpService.get<ICartResponse>(cartEndpoints.getCart);
  return res.data;
};

export const addToCart = async (data: CartData): Promise<ICartResponse> => {
  const res = await httpService.post<ICartResponse, CartData>(
    cartEndpoints.addToCart,
    {
      productId: data.productId,
      quantity: data.quantity,
    },
  );

  return res.data;
};

export const updateCart = async (data: CartData): Promise<ICartResponse> => {
  const res = await httpService.put<ICartResponse, { quantity: number }>(
    cartEndpoints.byId(data.productId),
    data,
  );

  return res.data;
};
