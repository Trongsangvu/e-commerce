import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { NextArrow, PrevArrow } from "../../components/common/custom-arrow";
import Slider from "../../components/common/slick-slider";
import ProductSuggestSkeleton from "../../components/product/product-suggest-skeleton";
import { routes_gen } from "../../config/routes";
import { useFetch } from "../../hooks/use-fetch";
import { useAppSelector } from "../../hooks/use-redux";
import { RootStore } from "../../redux/store";
import { list } from "../../services/product-service";

const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" } as const;

const ProductSuggestPage = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    centerPadding: "10px",
  };

  const { data: products = [], isLoading } = useFetch({
    queryKey: ["products"],
    queryFn: () => list(),
    onError: () => toast.error("Failed to load products"),
  });

  const productByCategory = useAppSelector(
    (state: RootStore) => state.category.featureProductByWomen,
  );

  const filterProductsByCty = products.filter(
    product => product.category === productByCategory,
  );

  if (isLoading) return <ProductSuggestSkeleton />;

  return (
    <section className="bg-[#f5f2ec] px-12 py-80">
      <div className="max-w-1200 mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[0.72rem] tracking-[0.2em] uppercase text-[#b5854a] mb-2">
              You May Also Like
            </p>
            <h2
              className="text-[#0f0e0c] font-light leading-[1.1]"
              style={{ ...serif, fontSize: "clamp(1.8rem, 2.5vw, 2.5rem)" }}
            >
              Related Pieces
            </h2>
          </div>
        </div>

        <div className="relative">
          <Slider {...settings}>
            {filterProductsByCty.map(product => (
              <div key={product._id} className="px-2">
                <Link
                  to={routes_gen.productDetail(product._id)}
                  className="no-underline block group"
                >
                  <div
                    className="relative overflow-hidden bg-[#e8e1d5] mb-3"
                    style={{ aspectRatio: "3/4" }}
                  >
                    <img
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      src={product.image_url}
                      alt={product.name}
                    />
                    <div className="absolute bottom-0 left-0 h-0.5 bg-[#b5854a] w-0 group-hover:w-full transition-all duration-500 ease-out" />
                  </div>

                  <p className="text-[0.62rem] tracking-[0.14em] uppercase text-[#b5854a] mb-0.5">
                    {product.category}
                  </p>
                  <h3
                    className="text-[#0f0e0c] leading-snug mb-1 group-hover:text-[#b5854a] transition-colors duration-200"
                    style={{ ...serif, fontSize: "0.95rem", fontWeight: 400 }}
                  >
                    {product.name}
                  </h3>
                  <p className="text-[0.82rem] font-medium text-[#0f0e0c]">
                    {product.formattedPrice}
                  </p>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default ProductSuggestPage;