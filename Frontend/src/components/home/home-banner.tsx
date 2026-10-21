import { Link } from "react-router-dom";
import images from "../../assets/images/images";
import { bannerItems } from "../../config/constants";
import { routes } from "../../config/routes";
import LANGUAGE from "../../utils/language-util";

const HomeBanner = () => (
  <section className="bg-[#fefcf8] px-48 py-96">
    <div className="max-w-1200 mx-auto">
      <div className="flex items-end justify-between mb-48">
        <div>
          <p className="text-[0.72rem] tracking-[0.2em] uppercase text-[#b5854a] mb-8">
            Explore
          </p>
          <h2
            className="font-light leading-[1.1] text-[#0f0e0c]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 3vw, 3rem)" }}
          >
            Shop by Category
          </h2>
        </div>
        <Link
          to={routes.products}
          className="text-[0.78rem] tracking-widest uppercase text-[#8a8278] no-underline border-b border-[#c2b9a8] pb-0.5 hover:text-[#0f0e0c] hover:border-[#0f0e0c] transition-colors duration-200"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-16">
        {bannerItems.map(({ imgKey, label, bg }) => (
          <div key={imgKey} className="w-389 h-247 relative overflow-hidden">
            <Link
              to={routes.products}
              className={`block group no-underline ${bg}`}
              style={{ aspectRatio: "3/4" }}
            >
              <img
                src={images[imgKey]}
                alt={String(label)}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/65 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-[#0f0e0c]/0 group-hover:bg-[#0f0e0c]/25 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-28">
                <p className="text-[0.68rem] tracking-[0.2em] uppercase text-white/55 mb-6">
                  {LANGUAGE.GENERAL.SPRING} {new Date().getFullYear()}
                </p>
                <h3
                  className="text-[#fefcf8] capitalize leading-tight"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.65rem", fontWeight: 400 }}
                >
                  {String(label)}
                </h3>
              </div>

              <div className="absolute bottom-8 right-7 opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75">
                <span className="text-[0.68rem] tracking-[0.18em] uppercase text-[#fefcf8] border border-white/35 px-3.5 py-5 backdrop-blur-sm">
                  {LANGUAGE.GENERAL.SHOP_NOW}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 h-2 bg-[#b5854a] w-0 group-hover:w-full transition-all duration-500 ease-out" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HomeBanner;