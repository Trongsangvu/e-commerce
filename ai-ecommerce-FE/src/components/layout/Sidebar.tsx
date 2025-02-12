import { MENU_ITEMS, MENU_ITEMS_2 } from '../../config/menu';
import { CloseIcon } from '../../assets/images/icons/icons';
import { useSidebar } from '../../hooks/useSidebar';


export const Sidebar: React.FC = () => {
    const { isOpen, handleClose } = useSidebar();

    return (
        <div>
            <div className={`fixed z-0 inset-0 pointer-events-none bg-black/50 transition-opacity duration-300 
            ${isOpen ? 'opacity-100 visible' : 'opacity-0 visible'}`}
            ></div>
            <div className='absolute top-0 right-0 pl-80 pr-80 pb-80 pt-70 bg-red-500 min-w-596 min-h-1131'>
                <div>
                    <div className='flex items-center justify-end'>
                        <div 
                            className='fixed z-10 top-10 right-10 flex items-center justify-center w-48 h-48 rounded-full cursor-pointer before:absolute before:w-full before:h-full before:bg-black before:rounded-full before:transition-transform before:duration-500 hover:before:scale-90'
                            onClick={handleClose}
                        >
                            <CloseIcon className='relative text-white text-5xl' />
                        </div>
                    </div>
                    <ul>
                        {MENU_ITEMS.map((item, index) => (
                            <li className='font-montserrat pb-24' key={index}>{item.title}</li>
                        ))}

                        {MENU_ITEMS_2.map((item, index) => (
                            <li className='font-montserrat pb-24' key={index}>{item.title}</li>
                        ))}
                    </ul>
                </div>
            </div> 
        </div>
    )
}