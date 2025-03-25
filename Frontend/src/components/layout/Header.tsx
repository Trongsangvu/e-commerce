import { useEffect, useState } from 'react';  
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import config from '../../config/config';
import { MENU_PROFILE, MENU_HEADER } from '../../config/menu';
import { MenuProfile } from '../common/MenuProfile';
import images from '../../assets/images/images';
import { MenuToggle, SearchIcon, ShoppingCartIcon, UserIcon } from '../../assets/images/icons/icons';
import { Sidebar } from './Sidebar';
import { Search } from '../common/Search';
import { AppDispatch } from '../../redux/store';
import { sideBarShow } from '../../redux/sideBar/sideBarSlice';

export const Header: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const [activeTab, setActiveTab] = useState('home');

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
        setIsShow(!isShow);
    }

    // Handle hide menu profile when transition page
    useEffect(() => {
        setIsShow(false);
    }, [location.pathname]);

    return (
        <>
            <header className='relative'>
                <div className='fixed gap-[100px] mt-0 top-0 right-0 left-0 height-72 z-1 shadow-xs bg-white flex items-center flex-1 justify-around pt-20 pb-20 px-7'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center mr-40'>
                            <Link to={config.routes.home}>
                                <img src={images.logo} alt='COZASTORE'/>
                            </Link>
                        </div>
                        <ul className='flex gap-4'>
                            {MENU_HEADER.map((item) => (
                                <li 
                                    className={`px-10 mx-10 cursor-pointer font-[GucciSansPro-medium] hover:text-[#6774d5]
                                        ${activeTab === item.id ? 'text-[#6774d5]' : 'text-[#333]'}`
                                    } key={item.id}
                                    onClick={() => setActiveTab(item.id || 'home')}
                                >
                                    <Link to={item.path || '#'}>
                                        {item.title}
                                    </Link>
                                </li>

                            ))}
                        </ul>
                    </div>
                    <ul className='flex'>
                        <li>
                            <button className='hover:opacity-80 hover:cursor-pointer transition-opacity'>
                                <ShoppingCartIcon />    
                            </button>
                        </li>
                        <li className='pl-15'>
                            <button 
                                className='hover:opacity-80 hover:cursor-pointer transition-opacity'
                                onClick={handleShowMenuProfile}
                            >
                                <UserIcon />
                            </button>
                            {isShow && (
                                <div className='absolute right-1/9 rounded-sm bg-white shadow-xl'>
                                    <ul className='px-16 py-32'>
                                        {MENU_PROFILE.map((item, index) => (
                                            <MenuProfile item={item} key={index} index={index}/>
                                        ))}
                                    </ul>
                                    <div className='border-t mb-2'></div>
                                </div>
                            )}
                        </li>
                        <li className='pl-15'>
                            <button className='hover:opacity-80 hover:cursor-pointer transition-opacity'
                                onClick={handleSearch}
                            >
                                <SearchIcon />
                            </button>
                        </li>
                        {isSearchVisible && <Search isSearchVisible={isSearchVisible} setIsSearchVisible={setIsSearchVisible}/>}
                        <li>
                            <nav 
                                className='flex items-center pl-15 gap-2 hover:cursor-pointer relative'
                                onClick={handleShow}
                            >
                                <MenuToggle />
                                <span className='font-montserrat font-bold uppercase text-xs'>menu</span>
                            </nav>
                        </li>
                    </ul>
                </div>
            </header>
            <Sidebar />
        </>
    )
}

