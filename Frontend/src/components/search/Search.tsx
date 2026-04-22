import { debounce } from "lodash";
import { useEffect, useRef, useState } from "react";
import { SearchProductIcon } from "../../assets/images/icons/icons";
import { useFetch } from "../../hooks/use-fetch";
import { searchProducts } from "../../services/search-service";
import { IProduct } from "../../types/search-type";
import Button from "../common/Button";
import ProductItem from "../product/ProductItem";

interface SearchProps {
  isSearchVisible: boolean;
  setIsSearchVisible: (value: boolean) => void;
}

const Search = ({ isSearchVisible, setIsSearchVisible }: SearchProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [debounceTerm, setDebounceTerm] = useState("");

  // Query Data
  const {
    data: products = [],
    isLoading,
    error,
  } = useFetch({
    queryKey: ["search", debounceTerm],
    queryFn: () => searchProducts({ name: debounceTerm }),
    enabled: !!debounceTerm,
  });

  // Debounced function to dispatch the search item
  const debouncedSetSearchItem = useRef(
    debounce((query: string) => {
      setDebounceTerm(query.trim());
    }, 300),
  ).current;

  useEffect(() => {
    return () => {
      debouncedSetSearchItem.cancel();
    };
  }, [debouncedSetSearchItem]);

  // Handle Input when typing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSetSearchItem(value);
  };

  // SHow/Hide Search bar
  const toggleSearchVisible = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <div className="fixed w-745 h-430 top-[9%] left-[40%] border rounded-sm bg-white border-gray-300 shadow-md transition-all duration-300 ease-in-out z-50">
      <div className="flex justify-between mx-auto mb-15 px-16 pt-16 pb-18">
        <form action="">
          <div className="border-0 border-b-2 border-b-amber-400">
            <input
              onChange={handleInputChange}
              value={inputValue}
              type="text"
              placeholder="Search..."
              className="w-645  p-2 outline-none"
            />
          </div>
        </form>
        <Button
          onClick={toggleSearchVisible}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`relative cursor-pointer font-normal text-lg inline-block underline-offset-4 ml-11 ${isHovered ? "none" : "underline"}`}
        >
          <span>Cancel</span>
          <span
            className={`absolute left-0 bottom-2 h-1.5 bg-black transition-all duration-300 ${isHovered ? "w-full" : "w-0"}`}
          ></span>
        </Button>
      </div>

      <div className="px-16 pb-16">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">Error fetching products</p>
        ) : products.length === 0 ? (
          <p className="text-center font font-semibold">No products found</p>
        ) : (
          <div className="flex justify-between">
            <ul className="list-none p-0 m-0">
              {products.map((product: IProduct) => (
                <li
                  key={product._id}
                  className="cursor-pointer text-sm mb-18 font-medium list-none underline underline-offset-5"
                >
                  <a href="#" className="flex items-center gap-5">
                    <span>
                      <SearchProductIcon />
                    </span>
                    <span>{product.name}</span>
                  </a>
                </li>
              ))}
            </ul>
            <ul className="grid grid-cols-3 gap-10 p-0 m-0 list-none">
              {products.map((product: IProduct) => (
                <li key={product._id} className="mb-16 ml-16 cursor-pointer">
                  <ProductItem product={product} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
