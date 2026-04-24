import { debounce } from "lodash";
import { useEffect, useRef, useState } from "react";
import { SearchProductIcon } from "../../assets/images/icons/icons";
import { useFetch } from "../../hooks/use-fetch";
import { list } from "../../services/product-service";
import { IProduct } from "../../types/search-type";
import Button from "../common/Button";
import ProductItem from "../product/ProductItem";
import DotsLoading from "../common/DotsLoading";

interface SearchProps {
  isSearchVisible: boolean;
  setIsSearchVisible: (value: boolean) => void;
}

const Search = ({ isSearchVisible, setIsSearchVisible }: SearchProps) => {
  const [inputValue, setInputValue] = useState("");
  const [debounceTerm, setDebounceTerm] = useState("");

  // Query Data
  const {
    data: products = [],
    isLoading,
    error,
  } = useFetch({
    queryKey: ["product", debounceTerm],
    queryFn: () => list({ search: debounceTerm }),
    enabled: !!debounceTerm,
  });

  // Debounced function to dispatch the search item
  const debouncedSetSearchItem = useRef(
    debounce((query: string) => {
      setDebounceTerm(query.trim());
    }, 400),
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
    <div className="fixed w-900 top-[9%] left-[25%] border rounded-sm bg-white border-gray-300 shadow-md transition-all duration-300 ease-in-out z-50">
      <div className="flex gap-10 justify-between mx-auto mb-15 px-16 pt-16 pb-18">
        <form action="">
          <div className="border border-gray-300 w-full rounded-sm p-5">
            <input
              onChange={handleInputChange}
              value={inputValue}
              type="text"
              placeholder="Search for: clothing"
              className="p-2 max-w-700 w-700 outline-none font-medium"
            />
          </div>
        </form>
        <Button
          onClick={toggleSearchVisible}
          className="relative cursor-pointer font-medium text-lg inline-block underline-offset-4 ml-11"
        >
          <span>Cancel</span>
        </Button>
      </div>

      <div className="px-16 pb-16">
        {isLoading ? (
          <DotsLoading />
        ) : error ? (
          <p className="text-red-500">Error fetching products</p>
        ) : products.length === 0 ? (
          <DotsLoading />
        ) : (
          <div className="flex gap-30">
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
            <ul className="grid grid-cols-4 gap-10 p-0 m-0 list-none">
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
