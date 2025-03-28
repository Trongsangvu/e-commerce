export interface ICartItem {
    productId: {
        _id: string;
        quantity: number;
        name: string;
        price: number;
        imageUrl: string;
    };
    quantity: number;
    _id: string;
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

export interface ICartResponse extends ICart {
    cart: ICart;
}