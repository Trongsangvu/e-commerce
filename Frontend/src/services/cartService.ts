import { AxiosResponse } from "axios";
import HttpService from "./HttpService";
import { CartData, ICartResponse } from "../types/cart-type";

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

const addToCart = (data: CartData): Promise<AxiosResponse> => {
    return HttpService.post("/carts/add", { data });
}

const updateCart = async (data: CartData): Promise<AxiosResponse> => {
    const token = localStorage.getItem("token");
    try {
        const response = await HttpService.put(
            `/carts/update/${data.productId}`, { quantity: data.quantity },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )   
        return response;
    }
    catch(error) {
        console.error('Error updating cart: ', error);
        throw error;
    }
}

export { addToCart, getCart, updateCart };