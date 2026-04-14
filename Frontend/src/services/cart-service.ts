import { AxiosError, AxiosResponse } from "axios";
import { CartData, ICartResponse } from "../types/cart-type";
import httpService from "./http-service";

const getCart = async (): Promise<AxiosResponse<ICartResponse>> => {
  try {
    const response = await httpService.get<ICartResponse>("/carts", {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    if (error instanceof AxiosError && error?.response?.status === 403) {
      console.error("Authentication required");
    }
    console.error("Error fetching cart: ", error);
    throw error;
  }
};

const addToCart = async (data: CartData): Promise<AxiosResponse> => {
  try {
    const response = httpService.post(
      "/carts/add",
      { productId: data.productId, quantity: data.quantity },
      { withCredentials: true },
    );
    console.log("Sending cart data:", {
      productId: data.productId,
      quantity: data.quantity,
    });
    return response;
  } catch (error) {
    console.error("Error add to cart: ", error);
    throw error;
  }
};

const updateCart = async (data: CartData): Promise<AxiosResponse> => {
  try {
    const response = await httpService.put(
      `/carts/update/${data.productId}`,
      { quantity: data.quantity },
      {
        withCredentials: true,
      },
    );
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error updating cart:", {
        status: error.response?.status,
        url: error.config?.url,
        data: error.response?.data,
      });
    }
    throw error;
  }
};

export { addToCart, getCart, updateCart };
