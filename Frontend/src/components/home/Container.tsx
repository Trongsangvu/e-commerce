import { useSelector } from "react-redux";
import images from "../../assets/images/images";
import { categories } from "../../config/menu";
import { useAppDispatch } from "../../hooks/use-redux";
import { setCategory } from "../../redux/product/filter-product-slice";
import { RootStore } from "../../redux/store";
import LANGUAGE from "../../utils/language.util";

interface ContainerProps {
  showTitle?: boolean;
}

const Container = ({ showTitle = true }: ContainerProps) => {
  const dispatch = useAppDispatch();
  const selectCategory = useSelector(
    (state: RootStore) => state.category.selectedCategory,
  );

  const renderCategory = () => {
    return categories.map((item, index) => (
      <div key={item.id} className="relative">
        <button
          onClick={() => dispatch(setCategory(item.id))}
          className={`pb-5
             ${index === 0 ? "mr-4.25" : "mx-4.25"} text-base leading-[1.2] cursor-pointer font-[Poppins-regular] capitalize
             ${selectCategory === item.id ? "text-[#333]" : "text-[#888]"}`}
        >
          <span className="relative inline-block font-[Poppins-regular] pb-3">
            {item.label}
            <span
              className={`absolute -bottom-1 left-0 h-1 bg-[#797979] transition-all duration-300 ease-in-out
                ${selectCategory === item.id ? "w-full" : "w-0"}`}
            ></span>
          </span>
        </button>
      </div>
    ));
  };

  return (
    <main className="w-full">
      <div className="flex flex-col pb-52">
        {showTitle && (
          <div className="pb-10">
            <h3 className="uppercase text-4xl text-[#333] font-[Poppins-bold]">
              {LANGUAGE.PRODUCT.OVERVIEW}
            </h3>
          </div>
        )}
        <div className="flex flex-col md:flex-row justify-between items-center ">
          <div className="flex flex-wrap mb-6 md:mb-0">{renderCategory()}</div>

          <div>
            <div className="flex gap-8">
              <div className="group flex items-center hover:bg-[#717fe0] hover:border-[#717fe0] transition-colors duration-300 cursor-pointer rounded-sm py-7 px-3.75 border border-[#e6e6e6]">
                <img
                  className="w-12 h-15 transition-colors filter group-hover:brightness-0 group-hover:invert"
                  src={images.filterIcon}
                />
                <p className="capitalize pl-6 text-[#888] text-[15px] font-[Poppins-regular] group-hover:text-white">
                  {LANGUAGE.PRODUCT.FILTER}
                </p>
              </div>
              <div className="group flex items-center hover:bg-[#717fe0] hover:border-[#717fe0] cursor-pointer rounded-sm py-7 px-3.75 border border-[#e6e6e6]">
                <img
                  className="w-17 h-20 transition-colors filter group-hover:brightness-0 group-hover:invert"
                  src={images.searchIcon}
                />
                <p className="capitalize pl-6 text-[#888] text-[15px] font-[Poppins-regular] group-hover:text-white">
                  {LANGUAGE.PRODUCT.SEARCH}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Container;
