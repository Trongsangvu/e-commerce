
export interface IProducts {
    name: string;
    price: number;
    currency: "USD";
}   

export interface Product {
    _id: string;
    name: string;
    price: string;
    currency: string;
    description: string;
    imageUrl: string;
    category: string;
}

export type IProductResponse = Product[];