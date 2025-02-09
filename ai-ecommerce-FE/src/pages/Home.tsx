import { useState, useEffect } from 'react';
import images from '../assets/images/images';
import '../App.css';

export const Home:React.FC = () => {
    const [isFixed, setIsFixed] = useState(true);
    // const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const startStick = 300;
            const stopStick = 900;

            if(scrollY < startStick) {
                setIsFixed(true);
                // setIsFollowing(false);
            } else if(scrollY >= startStick && scrollY < stopStick) {
                setIsFixed(true);
                // setIsFollowing(false);
            } else {
                setIsFixed(false);
                // setIsFollowing(true);
            }
        }
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [])

    return (
        <div className='h-[2000px]'>
            <div className='relative'> 
                <img src={images.banner} />
            </div>
            <div className="sticky top-0 z-10 flex justify-center">
                <div className={`
                        ${isFixed ? "fixed top-[70%] left-1/2 transform -translate-x-1/2" : "absolute top-[900px]"}
                            transition-all duration-300 ease-in-out text-center w-full
                    `}
                >
                    <span className="capitalize text-[32px] tracking-[3px] font-(--font-family) leading-10 text-white">
                        Spring Summer 2025
                    </span>
                    <div className="flex gap-5 justify-center pt-6">
                        <a className="uppercase bg-white px-5 py-3 rounded-sm text-black text-sm font-semibold tracking-[2px]">
                        For Her
                        </a>
                        <a className="uppercase bg-white px-5 py-3 rounded-sm text-black text-sm font-semibold tracking-[2px]">
                        For Him
                        </a>
                    </div>
                </div>
            </div>

        </div>
    )
}