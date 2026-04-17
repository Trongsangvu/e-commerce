import images from "../../assets/images/images";
import Container from "../../components/home/Container";
import ProductList from "../../components/product/ProductList";

const ShopPage = () => {
  return (
    <div>
      <div>
        <div className="relative">
          <img src={images.profileBanner} alt="profile" />
          <div className="absolute top-[75%] left-[48%] font-[GucciSansPro-medium] uppercase text-[50px] text-white">
            shop
          </div>
        </div>
      </div>
      <main className="container px-173 max-w-1600 h-auto mt-100">
        <Container showTitle={false} />
        <div>
          <ProductList />
        </div>
      </main>
    </div>
  );
};

export default ShopPage;
