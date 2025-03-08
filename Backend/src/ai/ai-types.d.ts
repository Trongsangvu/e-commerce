import { Products } from "../types/product/product-types";
export interface IFeatureVector{
    categories?: Record<string, number>;
    brands?: Record<string, number>;
    priceRanges?: Record<string, number>;
    tags?: Record<string, number>;
    color?: Record<string, number>;
    size?: Record<string, number>;
    [key: string]: Record<string, number> | undefined;
}

export interface IProductAttributes {
    color?: string;
    size?: string;
    weight?: number;
    [key: string]: any;
}

export interface ITFIDFData {
    tfidfMatrix: number[][];
    productIds: string[];
    featureToIndex: Record<string, Record<string, number>>;
    totalFeatures: number;
}

export interface IProductScore {
    productId: string;
    simiarity: number;
}

export interface IRecommendationResult {
    type: "content-based" | "popular";
    recommendations: Products[];
}

export type PriceRange = 'very_cheap' | 'cheap' | 'medium' | 'expensive' | 'very_expensive';