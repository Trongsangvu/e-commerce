import React from 'react';
import { Product } from '../../model/Search';

interface ProductItemProps {
    product: Product;
}

export const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
    return (
        <>
            <a href="#">
                <img className='h-[150px] w-[130px] ' src={product.imageUrl} alt={product.name} />
            </a>
        </>
    );
}