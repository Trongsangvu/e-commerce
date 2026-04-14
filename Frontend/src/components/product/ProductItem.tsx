import React from "react";
import { IProduct } from "../../model/Search";

interface ProductItemProps {
  product: IProduct;
}

export const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <>
      <a href="#">
        <img
          className="h-150 w-130 "
          src={product.imageUrl}
          alt={product.name}
        />
      </a>
    </>
  );
};
