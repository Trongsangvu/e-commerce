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
                            <div className='w-[369px] h-[247px] m-0 border border-[#e6e6e6] cursor-pointer'>
                                <Link to={config.routes.products}>
                                    <img className='' src={images.banner1} alt="banner1" />
                                </Link>
                                <div className='flex flex-col relative py-34 px-38 bottom-[260px]'>
                                    <span className='capitalize text-[28px] font-bold font-[Poppins]'>
                                        women
                                    </span>
                                    <span className='font-normal font-[Poppins] text-sm text-[#555]'>
                                        Spring 2025
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='px-15 pb-30'>
                            <div className='w-[369px] h-[247px] border border-[#e6e6e6] cursor-pointer'>
                                    <Link to={config.routes.products}>
                                        <img className='' src={images.banner2} alt="banner1" />
                                    </Link>
                                    <div className='flex flex-col relative py-34 px-38 bottom-[260px]'>
                                        <span className='capitalize text-[28px] font-bold font-[Poppins]'>
                                            men
                                        </span>
                                        <span className='font-normal font-[Poppins] text-sm text-[#555]'>
                                            Spring 2025
                                        </span>
                                    </div>
                                </div>
                            </div>
                        <div className='px-15 pb-30'>
                            <div className='w-[369px] h-[247px] border border-[#e6e6e6] cursor-pointer'>
                                <Link to={config.routes.products}>
                                    <img className='' src={images.banner3} alt="banner1" />
                                </Link>
                                <div className='flex flex-col relative py-34 px-38 bottom-[260px]'>
                                    <span className='capitalize text-[28px] font-bold font-[Poppins]'>
                                        Accessories
                                    </span>
                                    <span className='font-normal font-[Poppins] text-sm text-[#555]'>
                                        Spring 2025
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}