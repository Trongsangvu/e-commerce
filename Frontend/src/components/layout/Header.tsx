import { useCallback, useEffect, useRef, useState } from 'react';  
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import config from '../../config/config';
import { MENU_PROFILE, MENU_HEADER } from '../../config/menu';
import { MenuProfile } from '../common/MenuProfile';
import { logout } from '../../redux/auth/authSlice';
import { MenuToggle, SearchIcon, ShoppingCartIcon, UserIcon } from '../../assets/images/icons/icons';
import { Sidebar } from './Sidebar';
import { Search } from '../../features/search/components/Search';
import { AppDispatch, RootStore } from '../../redux/store';
import { sideBarShow } from '../../redux/sideBar/sideBarSlice';
import { ShoppingBag } from '../../features/cart/components/ShoppingBag';
import { useScroll } from '../../hooks/Scoll/useScroll';
import { useQuery } from '@tanstack/react-query';
import { getCart } from '../../services/cart/cartService';

export const Header: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [isShowMenu, setIsShowMenu] = useState(false);
    const [isShowBag, setIsShowBag] = useState(false);
    const [delayedShowBag, setDelayedShowBag] = useState(false);

    const scroll = useScroll();
    
    const location = useLocation();
    const isLoginPage = location.pathname === config.routes.login;
    const isRegisterPage = location.pathname === config.routes.register;

    const navigate = useNavigate();
    const menuRef = useRef<HTMLDivElement>(null);

    // Authentication when login
    const isAuthenticated = useSelector((state: RootStore) => state.auth.isAuthenticated);


    // Handle show sidebar
    const handleShow = () => {
        dispatch(sideBarShow());
    }

    // Handle show search bar
    const handleSearch = () => {
        setIsSearchVisible(!isSearchVisible);
    }

    // Handle show menu profile
    const handleShowMenuProfile = () => {
        setIsShowMenu(!isShowMenu);
    }

    // Handle logout
    const handleLogout = async () => {
        dispatch(logout());
        navigate('/login');
    }

    // Handle hide menu profile when transition page
    useEffect(() => {
        setIsShowMenu(false);
    }, [location.pathname]);

    // Handle show shopping bag
    const handleShowShoppingBag = useCallback(() => {
        if (!isShowBag) {
            setIsShowBag(true);
            setTimeout(() => {
               setDelayedShowBag(true); 
            }, 300);
        } else {
            setDelayedShowBag(false);
            setTimeout(() => {
                setIsShowBag(false);
            }, 300);
        }
    }, [isShowBag]);

    // Get cart items
    const { data } = useQuery({
        queryKey: ['shopping-bag'],
        queryFn: getCart,
        enabled: isAuthenticated,
    });

    // count cart items
    const cartItemsCount = data?.data?.items?.length ?? 0;

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsShowMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

    return (
        <>
            <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out 
                    ${isLoginPage || isRegisterPage || scroll ? 'bg-white shadow-md' : 'bg-transparent'}`}
            >
                <div className='height-72 z-1 shadow-xs flex items-center flex-1 justify-around pt-20 pb-20 px-7'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center mr-40'>
                            <Link to={config.routes.home}>
                            <h3 className={`text-2xl font-[GucciSansPro-medium] uppercase transition-colors duration-300 ${
                                isLoginPage || isRegisterPage || scroll ? 'text-black' : 'text-white'}`}>
                                    cozastore
                            </h3>
                            </Link>
                        </div>
                        <ul className='flex gap-4'>
                            {MENU_HEADER.map((item) => (
                                <li className={`px-10 mx-10 cursor-pointer font-[GucciSansPro-book] hover:text-[#6774d5] transition-colors duration-300 ${
                                    location.pathname === item.path
                                      ? 'text-[#6774d5]'
                                      : isLoginPage || isRegisterPage || scroll ? 'text-black' : 'text-white'
                                  }`} key={item.id}
                                >
                                    <Link to={item.path || '#'}>
                                        {item.title}
                                    </Link>
                                </li>

                            ))}
                        </ul>
                    </div>
                    <ul className='flex'>
                        <li className=''>
                            <button 
                                className='hover:opacity-80 hover:cursor-pointer transition-opacity'    
                                onClick={handleShowShoppingBag}
                            >
                                <ShoppingCartIcon fillColor={`${isLoginPage || isRegisterPage || scroll ? 'black' : 'white'}`} />    
                                {cartItemsCount > 0 && (
                                    <span className='absolute top-26 right-[20.7%] text-[10px] text-[#fff]'>
                                        {cartItemsCount}
                                    </span>
                                )}
                            </button>
                            {delayedShowBag && (
                                <div className='absolute left-[50%]'>
                                    <ShoppingBag handleShowBag={handleShowShoppingBag} isVisible={delayedShowBag}/>
                                </div>
                            )}
                        </li>
                        <li className='pl-15'>
                            <button 
                                className='hover:opacity-80 hover:cursor-pointer transition-opacity'
                                onClick={handleShowMenuProfile}
                            >
                                <UserIcon strokeColor={`${isLoginPage || isRegisterPage || scroll ? 'black' : 'white'}`} />
                            </button>
                            {isShowMenu && (
                                <div 
                                    className='absolute right-1/9 h-auto rounded-sm bg-white shadow-xl'
                                    ref={menuRef}
                                >
                                    <ul className='px-16 pt-32'>
                                        {MENU_PROFILE.map((item, index) => {
                                            if(isAuthenticated && item.id === 'sign in') return null;
                                            if(!isAuthenticated && (item.id === 'my account' || item.id === 'sign out')) return null;
                                            return (
                                                <MenuProfile 
                                                    item={item} 
                                                    key={index} 
                                                    index={index}
                                                    onLogout={item.id === 'sign out' ? handleLogout : undefined}
                                                />
                                            )
                                        })}
                                    </ul>
                                </div>
                            )}
                        </li>
                        <li className='pl-15'>
                            <button className='hover:opacity-80 hover:cursor-pointer transition-opacity'
                                onClick={handleSearch}
                            >
                                <SearchIcon fillColor={`${isLoginPage || isRegisterPage || scroll ? 'black' : 'white'}`} />
                            </button>
                        </li>
                        {isSearchVisible && <Search isSearchVisible={isSearchVisible} setIsSearchVisible={setIsSearchVisible}/>}
                        <li>
                            <nav 
                                className='flex items-center pl-15 gap-2 hover:cursor-pointer relative'
                                onClick={handleShow}
                            >
                                <MenuToggle fillColor={`${isLoginPage || isRegisterPage || scroll ? 'black' : 'white'}`} />
                                <span className={`font-[GucciSansPro-book] uppercase text-xs transition-colors duration-300 
                                        ${isLoginPage || isRegisterPage || scroll ? 'text-black' : 'text-white'}`}
                                >menu</span>
                            </nav>
                        </li>
                    </ul>
                </div>
            </header>
            <Sidebar />
        </>
    )
}

