import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  { RootStore }  from '../../redux/store';
import { setSearchItem } from '../../redux/search/searchSlice';
import { debounce } from 'lodash';


interface SearchProps {
    isSearchVisible: boolean;
    setIsSearchVisible: (value: boolean) => void;
}

export const Search: React.FC<SearchProps> = ({ isSearchVisible, setIsSearchVisible }) => {
    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useDispatch();
    const searchItem = useSelector((state: RootStore) => state.search.searchItem);
    const [inputValue, setInputValue] = useState(searchItem);

    // Debounced function to dispatch the search item
    const debouncedSetSearchItem = useRef(
        debounce((term: string) => {
            dispatch(setSearchItem(term));
        }, 300), // debounce delay as needed 
    );

    useEffect(() => {
        debouncedSetSearchItem.current = debounce((term: string) => {
            dispatch(setSearchItem(term));
        }, 300)
        
        return () => {
            debouncedSetSearchItem.current.cancel();
        }
    }, [dispatch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        debouncedSetSearchItem.current(e.target.value);
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
        </div>
    )
}

