import { useState } from 'react';  
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import config from '../../config/config';
import images from '../../assets/images/images';
import { ContactIcon, MenuToggle, SearchIcon, ShoppingCartIcon, UserIcon } from '../../assets/images/icons/icons';
import { Sidebar } from './Sidebar';
import { Search } from '../common/Search';
import { AppDispatch } from '../../redux/store';
import { sideBarShow } from '../../redux/sideBar/sideBarSlice';

export const Header: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const handleShow = () => {
        dispatch(sideBarShow())
    }

    const handleSearch = () => {
        setIsSearchVisible(!isSearchVisible);
    }

    return (
        <>
            <header className='relative'>
                <div className='fixed gap-[100px] mt-0 top-0 right-0 left-0 height-72 z-1 shadow-xs bg-white flex items-center flex-1 justify-around pt-20 pb-20 px-7'>
                    <div className='flex items-center justify-between'>
                        <button className='flex items-center'>
                            <ContactIcon />
                            <span className='font-montserrat font-semibold'>Contact Us</span>
                        </button>
                    </div>
                    <Link to={config.routes.home} className='mr-10'>
                        <img src={images.logo} alt='COZASTORE'/>
                    </Link>
                    <ul className='flex '>
                        <li>
                            <button className='hover:opacity-80 hover:cursor-pointer transition-opacity'>
                                <ShoppingCartIcon />    
                            </button>
                        </li>
                        <li className='pl-15'>
                            <Link to={config.routes.login}>
                                <button className='hover:opacity-80 hover:cursor-pointer transition-opacity'>
                                    <UserIcon />
                                </button>
                            </Link>
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

