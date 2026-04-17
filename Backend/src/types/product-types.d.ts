export interface IProduct {
  name: string;
  price: number;
  category: "men" | "women";
  currency: "USD";
  description?: string;
  image_url?: string;
  tags?: string[];
  brand: string;
}
