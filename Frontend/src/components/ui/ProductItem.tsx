import React from 'react';
import { Product } from '../../model/Search';

interface ProductItemProps {
    product: Product;
}

export const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
    return (
        <div className='bg-red-600'>
            <h2>{product.name}</h2>
            <img src={product.imageUrl} alt={product.name} />
            {/* <p>{product.category}</p> */}
        </div>
    )
}