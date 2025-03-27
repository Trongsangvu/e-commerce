export interface ICartItem {
    productId: string;
    quantity: number;
    name: string;
    price: number;
    imageUrl: string;
}

export interface AddToCartData {
    productId: string;
    quantity: number;
}

export interface ICart {
    items: ICartItem[];
    totalQuantity: number;
    totalAmount: number;
}

export interface ICartResponse {
    cart: ICart;
}