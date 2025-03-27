import { AxiosResponse } from "axios";
import HttpService from "./HttpService";
import { AddToCartData, ICart, ICartResponse } from "../types/cart-type";

const cart = (data: ICart): Promise<AxiosResponse<ICartResponse>> => {
    return HttpService.get("/cart", { params: data });
}

const addToCart = (data: AddToCartData): Promise<AxiosResponse> => {
    return HttpService.post("/cart/add", data);
}

export { addToCart, cart };