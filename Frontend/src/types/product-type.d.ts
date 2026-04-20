export interface IProducts {
  name: string;
  price: number;
  currency: "USD";
}

export interface IProduct {
  _id: string;
  name: string;
  price: string;
  formattedPrice: string;
  currency: string;
  description: string;
  image_url: string;
  category: string;
}

export type IProductListResponse = IProduct[];
export type IProductDetailResponse = IProduct;
