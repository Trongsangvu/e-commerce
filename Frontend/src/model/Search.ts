export interface ISearch {
  name: string;
}

export interface IProduct {
  _id: string;
  name: string;
  price: string;
  currency: string;
  description: string;
  imageUrl: string;
  category: string;
}

export type ISearchResponse = IProduct[];
