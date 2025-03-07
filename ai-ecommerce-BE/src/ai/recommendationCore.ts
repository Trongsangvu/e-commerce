// import { Products } from '../types/product/product-types';
// import { IFeatureVector, PriceRange, ITFIDFData } from './ai-types';
// import mongoose from 'mongoose';
// export class RecommendationCore {
//     public getPriceRange(price: number): PriceRange {
//         if (price < 100000) return 'very_cheap';
//         if (price < 500000) return 'cheap';
//         if (price < 1000000) return 'medium';
//         if (price < 5000000) return 'expensive';
//         return 'very_expensive';
//     }

//     public calculateProductFeatureVector(product: Products): IFeatureVector {
//         const featureVector: IFeatureVector = {};

//         // 1. Feature from category
//         if(!featureVector.categories) featureVector.categories = {};
//         featureVector.categories[product.category] = 1;

//         // 2. Feature from brand
//         if(!featureVector.brands) featureVector.brands = {};
//         featureVector.brands[product.brand] = 1;

//         // 3. Feature from price range
//         const priceRange = this.getPriceRange(product.price);
//         if (!featureVector.priceRanges) featureVector.priceRanges = {};
//         featureVector.priceRanges[priceRange] = 1;
        
//         if(product.tags && product.tags.length > 0) {
//             if(!featureVector.tags) featureVector.tags = {};
//             product.tags.forEach(tag => {
//                 if(featureVector.tags) featureVector.tags[tag] = 1;
//             });
//         }

//         // if(product.attributes) {
//         //     if(product.attributes.color) {
//         //         if(!featureVector.colors) featureVector.colors = {};
//         //         featureVector.colors[product.attributes.color] = 1
//         //     }
//             // if(product.attributes.size) {
//             //     if(!featureVector.sizes) featureVector.size = {};
//             //     featureVector.size[product.attributes.size] = 1;
//             // }
//         // }

//         return featureVector;
//     }

//     public convertToTFIDFMatrix(products: Products[]): Promise<ITFIDFData> {
//         const allFeatures: Record<string, Set<string>> = {
//             categories: new Set<string>(),
//             brand: new Set<string>(),
//             priceRanges: new Set<string>(),
//             tags: new Set<string>(),
//             color: new Set<string>(),
//             size: new Set<string>() 
//         };

//         products.forEach(product => {
//             const featureVector = this.calculateProductFeatureVector(product);
//             Object.keys(featureVector).forEach(featureType => {
//                 const featureGroup = featureVector[featureType];
//                 if(featureGroup) {
//                     Object.keys(featureGroup).forEach(feature => {
//                         if (allFeatures[featureType]) allFeatures[featureType].add(feature);
//                     });
//                 }
//             }); 
//         });

//         const featureToIndex: Record<string, Record<string, number>> = {};
//         let index = 0;
//         Object.keys(allFeatures).forEach(featureType => {
//             featureToIndex[featureType] = {};
//             [...allFeatures[featureType]].forEach(feature => {
//                 featureToIndex[featureType][feature] = index++;
//             });
//         });

//         const totalFeatures = index;

//         const tfMatix: number[][] = [];
//         const productIds: string[] = [];
//         products.forEach(product => {
//             const tfVector = new Array(totalFeatures).fill(0);
//             const featureVector = this.calculateProductFeatureVector(product);
//             Object.keys(featureVector).forEach(featureType => {
//                 const featureGroup = featureVector[featureType];
//                 if(featureGroup) {
//                     Object.keys(featureGroup).forEach(feature => {
//                         if(featureToIndex[featureType] && featureToIndex[featureType][feature] !== undefined) {
//                             tfVector[featureToIndex[featureType][feature]] = featureGroup[feature];
//                         }
//                     });
//                 }
//             });
//             tfMatix.push(tfVector);
//             productIds.push(product._id.toString());
//         });

//         const tfTensor = tf.tensor2d(tfMatix);
//         const docCountTensor = tfTensor.greater(0).sum(0);
//         const idfTensor = tf.log(tfMatix.scalar(products.length).div(docCountTensor.add(1)));
//         const tfidfTensor = tfTensor.mul(idfTensor);
//         const tfidfMatrix = tfidfTensor.arraySync() as number[][];

//         tf.dispose([tfTensor, docCountTensor, idfTensor, tfidfTensor]);

//         return { tfidfMatrix, productIds, featureToIndex, totalFeatures }
//     }
// }