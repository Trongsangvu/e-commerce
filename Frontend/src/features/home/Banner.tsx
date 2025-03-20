import { Link } from 'react-router-dom';
import config from '../../config/config';
import images from '../../assets/images/images';

export const Banner:React.FC = () => {
    return (
        <nav>
            <div className='pt-150 pb-50'>
                <div className='container max-w[1200px] mx-auto px-4'>
                    <div className='flex flex-wrap justify-center'>
                        <div className='px-15 pb-30'>
                            <div className='w-[369px] h-[247px] m-0 border border-[#e6e6e6] cursor-pointer relative group overflow-hidden'>
                                <Link to={config.routes.products}>
                                    <div className="absolute inset-0 bg-[rgba(103,117,214,0.8)] opacity-0 group-hover:opacity-90 transition-all duration-400 ease-in-out"></div>
                                    <img className='h-[245.5px]' src={images.banner1} alt="banner1" />
                                </Link>
                                <div className='flex flex-col relative py-34 px-38 bottom-[260px]'>
                                    <span className='capitalize text-[28px] text-[#333] group-hover:text-white font-bold font font-[Poppins-bold]'>
                                        women
                                    </span>
                                    <span className='group-hover:text-white font-normal font font-[Poppins-regular] text-sm text-[#555]'>
                                        Spring 2025
                                    </span>
                                </div>
                                <span className="absolute bottom-[-20px] left-[25%] -translate-x-1/2 top-[70%] text-xs font-[Poppins-medium] text-white uppercase opacity-0 scale-50 transition-all duration-500 ease-out group-hover:bottom-2 group-hover:text-lg group-hover:opacity-100 group-hover:scale-100">
                                    Shop now
                                </span>

                                <span className="absolute bottom-0 left-[25%] -translate-x-1/2 top-[80%] h-[1px] w-[100px] bg-white origin-center scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"></span>
                            </div>
                        </div>
                        <div className='px-15 pb-30'>
                            <div className='w-[369px] h-[247px] border border-[#e6e6e6] cursor-pointer relative group overflow-hidden'>
                                    <Link to={config.routes.products}>
                                        <div className="absolute inset-0 bg-[rgba(103,117,214,0.8)] opacity-0 group-hover:opacity-90 transition-all duration-400 ease-in-out"></div>
                                        <img className='h-[245.5px]' src={images.banner2} alt="banner1" />
                                    </Link>
                                    <div className='flex flex-col relative py-34 px-38 bottom-[260px]'>
                                        <span className='capitalize group-hover:text-white text-[28px] text-[#333] font-bold font font-[Poppins-bold]'>
                                            men
                                        </span>
                                        <span className='group-hover:text-white font-normal font font-[Poppins-regular] text-sm text-[#555]'>
                                            Spring 2025
                                        </span>
                                    </div>
                                    <span className="absolute bottom-[-20px] left-[25%] -translate-x-1/2 top-[70%] text-xs font-[Poppins-medium] text-white uppercase opacity-0 scale-50 transition-all duration-500 ease-out group-hover:bottom-2 group-hover:text-lg group-hover:opacity-100 group-hover:scale-100">
                                    Shop now
                                </span>

                                <span className="absolute bottom-0 left-[25%] -translate-x-1/2 top-[80%] h-[1px] w-[100px] bg-white origin-center scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"></span>
                                </div>
                            </div>
                        <div className='px-15 pb-30'>
                            <div className='w-[369px] h-[247px] border border-[#e6e6e6] cursor-pointer relative group overflow-hidden'>
                                <Link to={config.routes.products}>
                                    <div className="absolute inset-0 bg-[rgba(103,117,214,0.8)] opacity-0 group-hover:opacity-90 transition-all duration-400 ease-in-out"></div>
                                    <img className='h-[245.5px]' src={images.banner3} alt="banner1" />
                                </Link>
                                <div className='flex flex-col relative py-34 px-38 bottom-[260px]'>
                                    <span className='group-hover:text-white capitalize text-[28px] text-[#333] font-bold font font-[Poppins-bold]'>
                                        Accessories
                                    </span>
                                    <span className='group-hover:text-white font-normal font font-[Poppins-regular] text-sm text-[#555]'>
                                        Spring 2025
                                    </span>
                                </div>
                                <span className="absolute bottom-[-20px] left-[25%] -translate-x-1/2 top-[70%] text-xs font-[Poppins-medium] text-white uppercase opacity-0 scale-50 transition-all duration-500 ease-out group-hover:bottom-2 group-hover:text-lg group-hover:opacity-100 group-hover:scale-100">
                                    Shop now
                                </span>

                                <span className="absolute bottom-0 left-[25%] -translate-x-1/2 top-[80%] h-[1px] w-[100px] bg-white origin-center scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}