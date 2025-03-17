import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  { AppDispatch, RootStore }  from '../../redux/store';
import { setSearchQuery, clearSearchResult } from '../../redux/search/searchSlice';
import { debounce } from 'lodash';
import { ProductItem } from '../ui/ProductItem';
import { search } from '../../redux/search/searchAction';

interface SearchProps {
    isSearchVisible: boolean;
    setIsSearchVisible: (value: boolean) => void;
}

export const Search: React.FC<SearchProps> = ({ isSearchVisible, setIsSearchVisible }) => {
    const dispatch: AppDispatch = useDispatch();
    const searchQuery = useSelector((state: RootStore) => state.search.searchQuery);
    const products = useSelector((state: RootStore) => state.search.products || []);
    const [isHovered, setIsHovered] = useState(false);
    const [inputValue, setInputValue] = useState(searchQuery);

    // Debounced function to dispatch the search item
    const debouncedSetSearchItem = useRef(
        debounce((query: string) => {
            dispatch(setSearchQuery(query));
            if(query.trim().length > 0) {
                dispatch(search({ name: query }));
            }
        }, 300)
    ).current;

    useEffect(() => {
        return () => {
            debouncedSetSearchItem.cancel();
        };
    }, [debouncedSetSearchItem]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        debouncedSetSearchItem(value);
        if(value.trim() === "") {
            dispatch(clearSearchResult());
        } else {
            dispatch(search({ name: value }));
        }

        console.log(e.target.value);
    }

    const toggleSearchVisible = () => {
        setIsSearchVisible(!isSearchVisible)
    }

    return (
        <div className="fixed w-[500px] top-[10%] left-[51%] border rounded-sm bg-white border-gray-300 shadow-md transition-all duration-300 ease-in-out z-50">
            <div className="flex  mx-auto px-[16px] pt-[16px] pb-8">
                <form action="">
                    <div className="border-0 border-b-2 border-b-amber-400">
                        <input 
                            onChange={handleInputChange}
                            value={inputValue}
                            type="text" 
                            placeholder="Search..."
                            className="w-[400px] p-2 outline-none"
                        />
                    </div>
                </form>
                <button 
                    onClick={toggleSearchVisible}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className={`relative cursor-pointer font-normal text-lg inline-block underline-offset-4 ml-[11px]
                        ${isHovered ? 'none' : 'underline'}    
                    `}
                    >
                    <span>Cancel</span>
                    <span 
                        className={`absolute left-0 bottom-2 h-2 bg-black transition-all duration-300
                            ${isHovered ? 'w-full' : 'w-0'}    
                        `}
                    ></span>
                </button>
            </div>
            <div>
                {Array.isArray(products) && products.length > 0 ? (
                    products.map((product) => <ProductItem product={product} key={product._id}/>)
                ): ( <p>No products found</p> )
                }
            </div>
        </div>
    )
}

