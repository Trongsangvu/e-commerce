import { features } from 'process';
import { Products } from '../types/product/product-types';
import { IFeatureVector, PriceRange } from './ai-types';

export class contentBasedRecommendationService {
     public getPriceRange(price: number): PriceRange {
        if (price < 100000) return 'very_cheap';
        if (price < 500000) return 'cheap';
        if (price < 1000000) return 'medium';
        if (price < 5000000) return 'expensive';
        return 'extra_expensive';
     }
    public calculateProductFeatureVector(product: Products): IFeatureVector {
        const featureVector: IFeatureVector = {};

        // 1. Feature from category
        if(!featureVector.categories) featureVector.categories = {};
        featureVector.categories[product.category] = 1;

        // 2. Feature from brand
        // if(!featureVector.brands) featureVector.brands = {};
        // featureVector.brands[]

        // 3. Feature from price range
        const priceRange = this.getPriceRange(product.price);
        if (!featureVector.priceRanges) featureVector.priceRanges = {};
        featureVector.priceRanges[priceRange] = 1;
        
        if(product.tags && product.tags.length > 0) {
            if(!featureVector.tags) featureVector.tags = {};
            product.tags.forEach(tag => {
                if(featureVector.tags) featureVector.tags[tag] = 1;
            });
        }

        // if(product.attributes.size) {
        //     if(!featureVector.sizes) featureVector.size = {};
        //     featureVector.size[product.attributes.size] = 1;
        // }

        return featureVector;
    }

}