import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import images from "../../assets/images/images";
import Button from "../../components/common/Button";
import ProductDetailSkeleton from "../../components/product/product-detail-skeleton";
import { accordionDetail, perksDetail } from "../../config/constants";
import { menuSize } from "../../config/menu";
import { useFetch } from "../../hooks/use-fetch";
import { useAppDispatch } from "../../hooks/use-redux";
import { addToCartAction } from "../../redux/cart/cart-thunk";
import { byId } from "../../services/product-service";
import ProductSuggestPage from "./product-suggest-page";

const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" } as const;

const ProductDetailPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string; }>();

  const [isActive, setIsActive] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [wishlist, setWishlist] = useState(false);
  const [cartFlash, setCartFlash] = useState(false);
  const [openAcc, setOpenAcc] = useState<string | null>(null);

  const { data: product, isLoading } = useFetch({
    queryKey: ["product", id],
    queryFn: () => byId(id!),
    enabled: !!id,
    onError: () => toast.error("Failed to load products"),
  });

  const handleActive = (size: string) => setIsActive(size);
  const handleAddQuantity = () => setQuantity(p => p + 1);
  const handleDecreaseQuantity = () => setQuantity(p => Math.max(1, p - 1));

  const addProductToCart = () => {
    if (!id) return;
    dispatch(addToCartAction({ productId: id, quantity }));
    toast.success("Add product to cart successfully!");
    setCartFlash(true);
    setTimeout(() => setCartFlash(false), 2000);
  };

  const toggleAcc = (key: string) =>
    setOpenAcc(prev => (prev === key ? null : key));

  const thumbs = product
    ? [product.image_url, product.image_url, product.image_url]
    : [];

  return (
    <div className="min-h-screen bg-[#fefcf8] text-[#0f0e0c]">

      <div
        className="relative w-full overflow-hidden bg-[#0f0e0c] pt-72"
        style={{ height: "42vh", minHeight: 220 }}
      >
        <img
          src={images.detailBanner}
          alt="bannerBlog"
          className="absolute inset-0 w-full h-full object-cover opacity-55"
          style={{ objectPosition: "center 25%" }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/55" />
      </div>

      <div className="bg-[#fefcf8]">
        {isLoading ? (
          <div className="max-w-1200 mx-auto px-12 py-20">
            <ProductDetailSkeleton />
          </div>
        ) : (
          <>
            <div className="max-w-1200 mx-auto px-12 py-64 grid grid-cols-2 gap-20 items-start">

              <div className="flex gap-4 sticky top-24">

                <div className="flex flex-col gap-12">
                  {thumbs.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`w-72 shrink-0 overflow-hidden border transition-all duration-200 cursor-pointer bg-[#e8e1d5] p-0 ${activeImg === i
                        ? "border-[#b5854a]"
                        : "border-transparent hover:border-[#c2b9a8]"
                        }`}
                      style={{ aspectRatio: "3/4" }}
                    >
                      <img
                        src={src}
                        alt={`View ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>

                <div
                  className="flex-1 overflow-hidden bg-[#e8e1d5] relative group"
                  style={{ aspectRatio: "3/4" }}
                >
                  <img
                    src={thumbs[activeImg] ?? product?.image_url}
                    alt={product?.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {product?.category && (
                    <div className="absolute top-16 left-16 bg-[#0f0e0c] text-[#fefcf8] text-[0.62rem] tracking-[0.14em] uppercase px-3 py-1">
                      {product.category}
                    </div>
                  )}

                  <button
                    onClick={() => setWishlist(v => !v)}
                    className={`absolute top-16 right-16 w-40 h-40 flex items-center justify-center border rounded-full transition-all duration-200 cursor-pointer ${wishlist
                      ? "bg-[#0f0e0c] border-[#0f0e0c] text-[#fefcf8]"
                      : "bg-white/90 border-white/60 text-[#0f0e0c] hover:border-[#0f0e0c]"
                      }`}
                    aria-label="Wishlist"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24"
                      fill={wishlist ? "currentColor" : "none"}
                      stroke="currentColor" strokeWidth="1.5"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-24 pt-8">
                <div className="flex items-center gap-3">
                  <span className="block w-24 h-px bg-[#b5854a]" />
                  <span className="text-[0.68rem] tracking-[0.2em] uppercase text-[#b5854a]">
                    {product?.category ?? "New Arrival"}
                  </span>
                </div>

                <h1
                  className="text-[#0f0e0c] font-light leading-[1.05]"
                  style={{ ...serif, fontSize: "clamp(2rem, 3vw, 3rem)" }}
                >
                  {product?.name}
                </h1>

                <div className="flex items-baseline gap-16">
                  <span
                    className="text-[#0f0e0c]"
                    style={{ fontSize: "1.6rem", fontWeight: 400 }}
                  >
                    {product?.formattedPrice}
                  </span>
                </div>

                <div className="h-px bg-[#e8e1d5]" />

                <p className="text-[0.88rem] leading-[1.9] text-[#8a8278]">
                  {product?.description}
                </p>

                <div>
                  <div className="flex items-center justify-between mb-12">
                    <span className="text-[0.72rem] tracking-[0.14em] uppercase text-[#0f0e0c]">
                      Size
                      {isActive && (
                        <span className="ml-8 text-[#b5854a]">— {isActive}</span>
                      )}
                    </span>
                    <button className="text-[0.68rem] tracking-widest uppercase text-[#8a8278] border-b border-[#c2b9a8] pb-2 bg-transparent cursor-pointer hover:text-[#b5854a] hover:border-[#b5854a] transition-colors font-inherit">
                      Size Guide
                    </button>
                  </div>
                  <ul className="flex flex-wrap gap-8">
                    {menuSize.map(item => (
                      <li
                        key={item.id}
                        onClick={() => handleActive(item.size)}
                        className={`w-48 h-48 flex items-center justify-center text-[0.75rem] tracking-[0.08em] uppercase border transition-all duration-200 cursor-pointer select-none ${isActive === item.size
                          ? "bg-[#0f0e0c] text-[#fefcf8] border-[#0f0e0c]"
                          : "bg-transparent text-[#0f0e0c] border-[#e8e1d5] hover:border-[#0f0e0c]"
                          }`}
                      >
                        {item.size}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-12 items-stretch">
                  <div className="flex border border-[#e8e1d5]">
                    <Button
                      className="w-44 flex items-center justify-center text-[#0f0e0c] bg-transparent border-none cursor-pointer text-lg hover:bg-[#f5f2ec] transition-colors font-light"
                      onClick={handleDecreaseQuantity}
                    >
                      −
                    </Button>
                    <span className="w-48 text-center flex items-center justify-center text-[0.85rem] font-medium border-x border-[#e8e1d5] bg-[#f7f7f7] outline-none">{quantity}</span>
                    <Button
                      className="w-44 flex items-center justify-center text-[#0f0e0c] bg-transparent border-none cursor-pointer text-lg hover:bg-[#f5f2ec] transition-colors font-light"
                      onClick={handleAddQuantity}
                    >
                      +
                    </Button>
                  </div>

                  <Button
                    className={`flex-1 py-14 text-[0.78rem] tracking-[0.18em] uppercase border-none cursor-pointer font-inherit transition-all duration-300 ${cartFlash
                      ? "bg-[#b5854a] text-[#fefcf8]"
                      : "bg-[#0f0e0c] text-[#fefcf8] hover:bg-[#b5854a]"
                      }`}
                    onClick={addProductToCart}
                  >
                    {cartFlash ? "Added to Bag ✓" : "Add to Cart"}
                  </Button>

                  <button
                    onClick={() => setWishlist(v => !v)}
                    className={`w-48 flex items-center justify-center border cursor-pointer transition-all duration-200 ${wishlist
                      ? "border-[#b5854a] text-[#b5854a]"
                      : "border-[#e8e1d5] text-[#8a8278] hover:border-[#0f0e0c] hover:text-[#0f0e0c]"
                      }`}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24"
                      fill={wishlist ? "currentColor" : "none"}
                      stroke="currentColor" strokeWidth="1.5"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </div>

                <div className="h-px bg-[#e8e1d5]" />

                <div className="flex flex-col gap-12">
                  {perksDetail.map(({ icon, text }) => (
                    <div key={text} className="flex items-center gap-12">
                      <span className="w-20 h-20 border border-[#e8e1d5] flex items-center justify-center text-[#b5854a] text-[10px] shrink-0">
                        {icon}
                      </span>
                      <span className="text-[0.78rem] text-[#8a8278]">{text}</span>
                    </div>
                  ))}
                </div>

                {accordionDetail.map(({ key, title, content }) => (
                  <div key={key} className="border-t border-[#e8e1d5] pt-16">
                    <button
                      onClick={() => toggleAcc(key)}
                      className="w-full flex items-center justify-between bg-transparent border-none cursor-pointer text-[0.78rem] tracking-[0.12em] uppercase text-[#0f0e0c] font-inherit p-0"
                    >
                      {title}
                      <span
                        className="text-[#b5854a] text-xl transition-transform duration-300"
                        style={{ transform: openAcc === key ? "rotate(45deg)" : "rotate(0)" }}
                      >
                        +
                      </span>
                    </button>
                    {openAcc === key && (
                      <div className="mt-16 flex flex-col gap-6">
                        {content.map(line => (
                          <p key={line} className="text-[0.82rem] leading-[1.9] text-[#8a8278]">
                            • {line}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <div className="border-t border-[#e8e1d5]" />
              </div>
            </div>

            <ProductSuggestPage />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;