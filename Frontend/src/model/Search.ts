export interface ISearch {
    name: string;
    imageUrl: string;
    category: string;
}

export interface ISearchResponse {
    products: {
        name: string;
        imageUrl: string;
        category: string;
    }
}