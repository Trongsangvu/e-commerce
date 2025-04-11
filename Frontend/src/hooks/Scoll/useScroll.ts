import { useEffect, useState } from "react"

export const useScroll = () => {
    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        const handelScroll = () => {
            const offset = window.scrollY;
            setScroll(offset > 50);
        };

        window.addEventListener('scroll', handelScroll);
        return () => window.removeEventListener('scroll', handelScroll);
    }, []);  

    return scroll;
}