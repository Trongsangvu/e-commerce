import { useSelector } from "react-redux";
import images from "../../assets/images/images";
import { categories } from "../../config/menu";
import { useAppDispatch } from "../../hooks/use-redux";
import { setCategory } from "../../redux/product/filter-product-slice";
import { RootStore } from "../../redux/store";
import LANGUAGE from "../../utils/language-util";

interface ContainerProps {
  showTitle?: boolean;
}

const HomeContainer = ({ showTitle = true }: ContainerProps) => {
  const dispatch = useAppDispatch();
  const selectCategory = useSelector(
    (state: RootStore) => state.category.selectedCategory,
  );

  return (
    <div className="w-full pb-24">
      {showTitle && (
        <div className="flex items-end justify-between mb-40">
          <div>
            <p className="text-[0.72rem] tracking-[0.2em] uppercase text-[#b5854a] mb-8">
              Handpicked
            </p>
            <h2
              className="font-light leading-[1.1] text-[#0f0e0c]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 3vw, 3rem)" }}
            >
              Featured Pieces
            </h2>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-15">
        <div className="flex flex-wrap items-center gap-0">
          {categories.map((item, index) => {
            const active = selectCategory === item.id;
            return (
              <button
                key={item.id}
                onClick={() => dispatch(setCategory(item.id))}
                className={`
                  relative pb-6 bg-transparent border-none cursor-pointer font-inherit
                  text-[0.78rem] tracking-widest capitalize transition-colors duration-200
                  ${index !== 0 ? "ml-32" : ""}
                  ${active ? "text-[#0f0e0c]" : "text-[#8a8278] hover:text-[#0f0e0c]"}
                `}
              >
                {item.label}
                <span
                  className={`
                    absolute bottom-0 left-0 h-px bg-[#b5854a]
                    transition-all duration-300 ease-in-out
                    ${active ? "w-full" : "w-0"}
                  `}
                />
              </button>
            );
          })}
        </div>

        <div className="flex gap-12">
          {[
            { icon: images.filterIcon, label: String(LANGUAGE.PRODUCT.FILTER) },
            { icon: images.searchIcon, label: String(LANGUAGE.PRODUCT.SEARCH) },
          ].map(({ icon, label }) => (
            <button
              key={label}
              className="group flex items-center gap-8 px-16 py-8 border border-[#e8e1d5] bg-transparent text-[#8a8278] text-[0.72rem] tracking-[0.12em] uppercase cursor-pointer font-inherit hover:border-[#0f0e0c] hover:text-[#0f0e0c] transition-all duration-200"
            >
              <img
                src={icon}
                alt=""
                className="w-14 h-16 opacity-50 group-hover:opacity-100 transition-opacity"
              />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-24 border-b border-[#e8e1d5]" />
    </div>
  );
};

export default HomeContainer;