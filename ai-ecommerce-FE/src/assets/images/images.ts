import logo from './logo/logo.svg';
import banner from './banner/HP_Hero-FullBleed-Desktop_Gucci-SS25-Jan25-1-9-0474-11-F_001_Default.avif';

interface Images {
    logo: string,
    banner: string
}

const images: Images = {
    logo,
    banner
} as const

export default images;