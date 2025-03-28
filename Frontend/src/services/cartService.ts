import { AxiosResponse } from "axios";
import HttpService from "./HttpService";
import { AddToCartData, ICartResponse } from "../types/cart-type";

const getCart = async (): Promise<AxiosResponse<ICartResponse>> => {
    const token = localStorage.getItem("token");
    try {
        const response = await HttpService.get<ICartResponse>("/carts", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch(error) {
        console.error('Error fetching cart: ', error);
        throw error;
    }
}

const addToCart = (data: AddToCartData): Promise<AxiosResponse> => {
    return HttpService.post("/carts/add", { data });
}

export { addToCart, getCart };