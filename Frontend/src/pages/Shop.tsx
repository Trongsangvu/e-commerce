import images from "../assets/images/images";
import { Container } from "../components/home/Container";
import { Footer } from "../components/navigation/Footer";
import Header from "../components/navigation/Header";
import ProductList from "../components/product/ProductList";

const Shop = () => {
  return (
    <div>
      <div>
        <Header />
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
      <Footer />
    </div>
  );
};

export default Shop;
