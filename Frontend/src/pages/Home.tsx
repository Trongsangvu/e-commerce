import { useState, useEffect, useRef, useCallback } from 'react';
import { Banner } from '../features/home/Banner';
import Container  from '../features/home/Container';
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
            <div className='w-full'>
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
            
            <div className='container mx-auto px-4 max-w-[1600px]'>
                <div className='flex justify-center'>
                    <Banner />
                </div>
            </div>
            <div className='container px-[173px] max-w-[1600px] h-[1000px]'>
                <Container />
            </div>
        </>
    )
}
