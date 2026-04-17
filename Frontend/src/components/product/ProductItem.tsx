import { IProduct } from "../../types/search-type";

interface ProductItemProps {
  product: IProduct;
}

const ProductItem = ({ product }: ProductItemProps) => {
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

export default ProductItem;
