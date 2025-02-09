import { Link } from 'react-router-dom';
import config from '../../config/config';
import '../../App.css';
import images from '../../assets/images/images';
import { ContactIcon, SearchIcon, ShoppingCartIcon, UserIcon } from '../../assets/images/icons/icons';




export const Header: React.FC = () => {
    return (
        <header className=''>
            <div className='flex items-center flex-1 justify-around mt-10 pt-6 pb-6 px-7'>
                <div className='flex items-center justify-between'>
                    <button className='flex items-center'>
                        <ContactIcon />
                        <span className='font-[--font-family]'>Contact Us</span>
                    </button>

                    {/* <div>
                        <span>Home</span>
                        <span>Shop</span>
                        <span>Features</span>
                        <span>Blog</span>
                        <span>About</span>
                        <span>Contact</span>
                        </div> */}
                </div>
                <Link to={config.routes.home} className='mr-10'>
                    <img src={images.logo} alt='COZASTORE'/>
                </Link>

                <ul className='flex'>
                    <li>
                        <ShoppingCartIcon />
                    </li>
                    <li className='pl-6'>
                        <UserIcon />
                    </li>
                    <li className='pl-6'>
                        <SearchIcon />
                    </li>

                </ul>
                
            </div>
        </header>
    )
}
