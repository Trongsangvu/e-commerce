export interface ISearch {
    name: string;
    // imageUrl: string;
    // category: string;
}

export interface Product {
    _id: string;
    name: string;
    price: string;
    currency: string;
    description: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
    category: string;
}

export type ISearchResponse = Product[];
