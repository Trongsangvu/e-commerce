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

  const {
    data: products = [],
    isLoading,
  } = useFetch({
    queryKey: ["products"],
    queryFn: () => list(),
    onError: () => {
      toast.error("Failed to load products");
    }
  });

  const productByCategory = useAppSelector(
    (state: RootStore) => state.category.featureProductByWomen,
  );

  const filterProductsByCty = products.filter(
    (product) => product.category === productByCategory,
  );

  if (isLoading) {
    return <ProductSuggestSkeleton />;
  }

  return (
    <div className="mt-50 pt-50 max-w-1200 mx-auto">
      <h3 className="uppercase font-[GucciSansPro-medium] pb-10">
        you may also like
      </h3>
      <div className="relative">
        <Slider {...settings}>
          {filterProductsByCty.map((product) => (
            <div key={product._id} className="px-2">
              <Link
                to={routes_gen.productDetail(product._id)}
              >
                <div className="group relative overflow-hidden min-h-300">
                  <img
                    className="w-full h-300 cursor-pointer transition-transform duration-500 group-hover:scale-110"
                    src={product.image_url}
                    alt={product.name}
                  />
                </div>

                <p className="font-[GucciSansPro-light] pt-10 pb-6">
                  {product.name}
                </p>

                <p className="font-[GucciSansPro-book]">
                  {product.formattedPrice}
                </p>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductSuggestPage;