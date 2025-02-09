import { Link } from 'react-router-dom';
import config from '../../config/config';
import '../../App.css';
import images from '../../assets/images/images';
import { ContactIcon, MenuToggle, SearchIcon, ShoppingCartIcon, UserIcon } from '../../assets/images/icons/icons';

export const Header: React.FC = () => {
    return (
        <header className=''>
            <div className='flex items-center flex-1 justify-around mt-10 pt-6 pb-6 px-7'>
                <div className='flex items-center justify-between'>
                    <button className='flex items-center'>
                        <ContactIcon />
                        <span className='font-[--font-family]'>Contact Us</span>
                    </button>
                </div>
                <Link to={config.routes.home} className='mr-10'>
                    <img src={images.logo} alt='COZASTORE'/>
                </Link>
                <ul className='flex '>
                    <li>
                        <ShoppingCartIcon />
                    </li>
                    <li className='pl-6'>
                        <UserIcon />
                    </li>
                    <li className='pl-6'>
                        <SearchIcon />
                    </li>
                    <li>
                        <nav className='flex items-center pl-6 gap-2'>
                            <MenuToggle />
                            <span className='uppercase text-xs'>menu</span>
                        </nav>
                    </li>
                </ul>
                
            </div>
        </header>
    )
}
