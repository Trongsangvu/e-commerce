import logo from './logo/logo.svg';
import banner from './banner/HP_Hero-FullBleed-Desktop_Gucci-SS25-Jan25-1-9-0474-11-F_001_Default.avif';
import angleRight from './icon/angle-right.svg';

interface Images {
    logo: string,
    banner: string,
    angleRight: string
}

const images: Images = {
    logo,
    banner,
    angleRight
} as const

export default images;