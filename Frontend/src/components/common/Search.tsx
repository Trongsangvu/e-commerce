import { useRef, useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { ProductItem } from '../ui/ProductItem';
import { useQuery } from '@tanstack/react-query';
import { searchProducts } from '../../services/searchService';

interface SearchProps {
    isSearchVisible: boolean;
    setIsSearchVisible: (value: boolean) => void;
}

export const Search: React.FC<SearchProps> = ({ isSearchVisible, setIsSearchVisible }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [debounceTerm, setDebounceTerm] = useState("");

    // Debounced function to dispatch the search item
    const debouncedSetSearchItem = useRef(
        debounce((query: string) => {
                setDebounceTerm(query.trim());
        }, 300)
    ).current;

    useEffect(() => {
        return () => {
            debouncedSetSearchItem.cancel();
        };
    }, [debouncedSetSearchItem]);

    // Query Data
    const { data: products = [], isLoading, error } = useQuery({
        queryKey: ['search', debounceTerm],
        queryFn:  () => searchProducts({ name: debounceTerm }),
        enabled: !!debounceTerm
    })

    // Handle Input when typing
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        debouncedSetSearchItem(value);
    }

    // SHow/Hide Search bar
    const toggleSearchVisible = () => {
        setIsSearchVisible(!isSearchVisible);
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
                        className={`absolute left-0 bottom-2 h-1.5 bg-black transition-all duration-300
                            ${isHovered ? 'w-full' : 'w-0'}    
                        `}
                    ></span>
                </button>
            </div>

            <div className="p-4">
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500">Error fetching products</p>
                ) : products.length === 0 ? (
                    <p className='text-center font font-semibold'>No products found</p>
                ) : (
                    products.map((product) => <ProductItem product={product} key={product._id} />)
                )}
            </div>
        </div>
    )
}

