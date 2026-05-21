import ProductList from "../product/product-list";
import HomeContainer from "./home-container";

const HomeProductSection = () => {
  return (
    <section className="bg-[#f5f2ec] px-48 py-96">
      <div className="max-w-1200 mx-auto">
        <HomeContainer />
        <ProductList />

        <div className="flex justify-center mt-48 mb-20">
          <a
            href="#"
            className="flex items-center justify-center h-44 min-w-180 px-10 text-[0.78rem] tracking-[0.12em] uppercase text-[#0f0e0c] border border-[#0f0e0c] no-underline hover:bg-[#0f0e0c] hover:text-[#fefcf8] transition-colors duration-300"
          >
            Load More
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomeProductSection;