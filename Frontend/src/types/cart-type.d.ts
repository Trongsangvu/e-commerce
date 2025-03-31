export interface ICartItem {
    productId: {
        _id: string;
        name: string;
        price: number;
        imageUrl: string;
    };
    quantity: number;
    _id: string;
}

export interface CartData {
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