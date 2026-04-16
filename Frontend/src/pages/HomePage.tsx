import { useCallback, useEffect, useRef, useState } from "react";
import images from "../assets/images/images";
import { Banner } from "../components/home/Banner";
import { Container } from "../components/home/Container";
import ProductList from "../components/product/ProductList";

const HomePage = () => {
  const [isFixed, setIsFixed] = useState(true);
  const bannerRef = useRef<HTMLDivElement>(null);

  // Handle scroll
  const handleScroll = useCallback(() => {
    if (!bannerRef.current) return;

    const scrollY = window.scrollY;
    const bannerHeight = 450;
    const threshold = bannerHeight - 100;

    setIsFixed(scrollY < threshold);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow">
        <div className="w-full">
          <div ref={bannerRef} className="relative">
            <img src={images.slider} />
            <div
              className={`transition-[transform] duration-300 ease-in-out text-center w-full   
                ${
                  isFixed
                    ? "fixed top-[90%] left-1/2 -translate-x-1/2 -translate-y-1/2"
                    : "absolute bottom-40 left-1/2 -translate-x-1/2"
                }`}
            >
              <span className="capitalize text-32 tracking-3 font-(--font-family) leading-10 text-white">
                Spring Summer {new Date().getFullYear()}
              </span>
              <div className="flex gap-15 justify-center pt-20">
                <a className="border-none uppercase bg-white p-15 rounded-xs text-black text-sm font-montserrat font-semibold tracking-2 hover:cursor-pointer">
                  For Her
                </a>
                <a className="border-none uppercase bg-white p-15 rounded-xs text-black text-sm font-montserrat font-semibold tracking-2 hover:cursor-pointer">
                  For Him
                </a>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="container mx-auto px-4 max-w-1600">
            <div className="flex justify-center">
              <Banner />
            </div>
          </div>
          <div className="container px-173 max-w-1600 h-auto">
            <Container />
            <ProductList />
            <div className="flex justify-center mb-89">
              <a
                href="#"
                className="flex justify-center items-center font font-[Poppins-medium] uppercase h-46 min-w-179 text-15 text-[#222] bg-[#e6e6e6] rounded-3xl"
              >
                load more
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
