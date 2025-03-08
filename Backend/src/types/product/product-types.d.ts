
export interface Products extends Document {
    name: string;
    price: number;
    category: "men" | "women";
    currency: "USD";
    description?: string;
    imageUrl?: string;
    tags?: string[];
    brand: string;
}