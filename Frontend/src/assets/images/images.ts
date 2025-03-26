import logo from './logo/logo-01.png';
import filterIcon from './icons/bars-filter-svgrepo-com.svg';
import slider from './banner/HP_Hero-FullBleed-Desktop_Gucci-SS25-Jan25-1-9-0474-11-F_001_Default.avif';
import angleRight from './icon/angle-right.svg';
import banner1 from './banner/banner-01.jpg';
import banner2 from './banner/banner-02.jpg';
import banner3 from './banner/banner-03.jpg';
import bannerAbout from './banner/about.jpg';
import bannerAboutStory from './banner/about-01.jpg';
import bannerAboutStory1 from './banner/about-02.jpg';
import bannerBlog from './banner/bg-02.jpg';
import bannerBlog1 from './banner/blog-04.jpg';
import bannerBlog2 from './banner/blog-05.jpg';
import bannerBlog3 from './banner/blog-06.jpg';
import searchIcon from './icon/search-svgrepo-com.svg';
import heartIcon from './icons/heart-svgrepo-com.svg';
import pencilIcon from './icons/pencil-edit-svgrepo-com.svg';
import arrowRight from './icons/right-arrow-svgrepo-com.svg';

interface Images {
    logo: string,
    slider: string,
    angleRight: string,
    banner1: string,
    banner2: string,
    banner3: string,
    filterIcon: string,
    searchIcon: string,
    heartIcon: string,
    pencilIcon: string,
    bannerAbout: string,
    bannerAboutStory: string,
    bannerAboutStory1: string,
    bannerBlog: string,
    bannerBlog1: string,
    bannerBlog2: string,
    bannerBlog3: string,
    arrowRight: string,
}

const images: Images = {
    logo,
    slider,
    angleRight,
    banner1,
    banner2,
    banner3,
    filterIcon,
    searchIcon,
    heartIcon,
    pencilIcon,
    bannerAbout,
    bannerAboutStory,
    bannerAboutStory1,
    bannerBlog,
    bannerBlog1,
    bannerBlog2,
    bannerBlog3,
    arrowRight,
} as const

export default images;