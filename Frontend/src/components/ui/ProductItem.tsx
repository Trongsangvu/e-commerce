import React from 'react';
import { Product } from '../../model/Search';

interface ProductItemProps {
    product: Product;
}

export const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
    return (
        <div className='flex items-center justify-between bg-red-600 h-[140px] px-7 mb-7'>
            <h2>{product.name}</h2>
            <div>
                <img className='h-[130px] w-[106px]' src={product.imageUrl} alt={product.name} />
            </div>
        </div>
    );
}