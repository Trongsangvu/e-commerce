import { Link } from "react-router-dom";
import images from "../../assets/images/images";
import { routes } from "../../config/routes";
import LANGUAGE from "../../utils/language-util";
import Button from "../common/Button";
import { useState } from "react";
import { IProduct } from "../../types/product-type";

const ProductCard = ({ product }: { product: IProduct; }) => {
  const [hovered, setHovered] = useState(false);

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    // quick view logic here
  };

  return (
    <li>
      <Link
        to={routes.productDetail.replace(":id", product._id)}
        className="block no-underline"
      >
        <div
          className="relative overflow-hidden bg-[#e8e1d5] mb-16 cursor-pointer"
          style={{ aspectRatio: "3/4" }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img
            src={product.image_url}
            alt={product.name}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out ${hovered ? "scale-105" : "scale-100"}`}
          />

          <div className={`absolute inset-0 transition-all duration-500 ${hovered ? "bg-[#0f0e0c]/10" : "bg-transparent"}`} />

          <div
            className={`absolute bottom-0 left-0 right-0 transition-transform duration-300 ease-out ${hovered ? "translate-y-0" : "translate-y-full"}`}
          >
            <Button
              className="w-full py-12 bg-[#fefcf8] text-[#0f0e0c] text-[0.68rem] tracking-[0.18em] uppercase border-none cursor-pointer font-inherit hover:bg-[#6a6968] hover:text-[#fefcf8] transition-colors duration-200"
              onClick={handleQuickView}
            >
              {LANGUAGE.PRODUCT.QUICK_VIEW}
            </Button>
          </div>

          <button
            className={`absolute top-12 right-12 w-32 h-32 bg-white/90 rounded-full backdrop-blur-sm border-none flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-[#6a6968] ${hovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}`}
            onClick={(e) => e.preventDefault()}
            aria-label="Add to wishlist"
          >
            <img src={images.heartIcon} alt="Wishlist" className="w-14 h-12" />
          </button>
        </div>

        <div className="px-0.5">
          <p className="text-[0.68rem] tracking-[0.14em] uppercase text-[#b5854a] mb-4">
            {product.category}
          </p>
          <h3
            className="text-[#0f0e0c] mb-8 leading-snug"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.05rem", fontWeight: 400 }}
          >
            {product.name}
          </h3>
          <p className="text-[0.9rem] font-medium tracking-[0.03em] text-[#0f0e0c]">
            {product.formattedPrice}
          </p>
        </div>
      </Link>
    </li>
  );
};

export default ProductCard;