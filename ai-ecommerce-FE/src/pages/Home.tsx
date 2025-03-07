import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import config from '../config/config';
import images from '../assets/images/images';

export const Home:React.FC = () => {
    const [isFixed, setIsFixed] = useState(true);
    const bannerRef = useRef<HTMLDivElement>(null);

    const handleScroll = useCallback(() => {
        if (!bannerRef.current) return;

        const scrollY = window.scrollY;
        const bannerHeight = 450;
        const threshold = bannerHeight - 100;

        setIsFixed(scrollY < threshold);
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return (
        <>
            <div className=''>
                <div ref={bannerRef}  className='relative top-72'> 
                    <img src={images.slider} />
                    <div className={`transition-[transform] duration-300 ease-in-out text-center w-full   
                        ${isFixed ? "fixed top-[90%] left-1/2 -translate-x-1/2 -translate-y-1/2" : "absolute bottom-[40px] left-1/2 -translate-x-1/2"}`}
                    >
                        <span className="capitalize text-[32px] tracking-[3px] font-(--font-family) leading-10 text-white">
                            Spring Summer 2025
                        </span>
                        <div className="flex gap-15 justify-center pt-20">
                            <a className="border-none uppercase bg-white p-15 rounded-xs text-black text-sm font-montserrat font-semibold tracking-[2px] hover:cursor-pointer">
                            For Her
                            </a>
                            <a className="border-none uppercase bg-white p-15 rounded-xs text-black text-sm font-montserrat font-semibold tracking-[2px] hover:cursor-pointer">
                            For Him
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className='pt-150'>
                <div className='container'>
                    <div className='flex flex-wrap justify-center'>
                        <div className='px-15 pb-30'>
                            <div className='w-[428px] h-[289px] m-0 border border-[#e6e6e6] cursor-pointer'>
                                <Link to={config.routes.products}>
                                    <img className='' src={images.banner1} alt="banner1" />
                                </Link>
                                <div className='flex flex-col relative py-34 px-38 bottom-[260px]'>
                                    <span className='capitalize text-[28px] font-bold font-[Poppins]'>women</span>
                                    <span className='font-normal font-[Poppins] text-sm text-[#555]'>Spring 2025</span>
                                </div>
                            </div>
                        </div>
                        <div className='px-15 pb-30'>
                            <div className='w-[428px] h-[289px] border border-[#e6e6e6] cursor-pointer'>
                                    <Link to={config.routes.products}>
                                        <img className='' src={images.banner2} alt="banner1" />
                                    </Link>
                                    <div className='flex flex-col relative py-34 px-38 bottom-[260px]'>
                                        <span className='capitalize text-[28px] font-bold font-[Poppins]'>men</span>
                                        <span className='font-normal font-[Poppins] text-sm text-[#555]'>Spring 2025</span>
                                    </div>
                                </div>
                            </div>
                        <div className='px-15 pb-30'>
                            <div className='w-[428px] h-[289px] border border-[#e6e6e6] cursor-pointer'>
                                    <Link to={config.routes.products}>
                                        <img className='' src={images.banner3} alt="banner1" />
                                    </Link>
                                    <div className='flex flex-col relative py-34 px-38 bottom-[260px]'>
                                        <span className='capitalize text-[28px] font-bold font-[Poppins]'>Accessories</span>
                                        <span className='font-normal font-[Poppins] text-sm text-[#555]'>Spring 2025</span>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}
