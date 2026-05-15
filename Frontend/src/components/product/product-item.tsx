import { IProduct } from "../../types/search-type";

interface ProductItemProps {
  product: IProduct;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <a href="#" className="relative">
      <img
        className="h-full w-140 rounded-sm"
        src={product.image_url}
        alt={product.name}
      />
      <span className="absolute top-5 left-5 with-auto bg-white bg-opacity-50 text-black text-center py-1 px-6 text-xs rounded-sm">
        new
      </span>
    </a>
  );
};

export default ProductItem;
