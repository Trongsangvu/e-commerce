import config from "../config/config";
import { Home } from '../pages/Home';
import { Login } from '../features/auth/components/Login';
import { Register } from '../features/auth/components/Register';
import Checkout from '../pages/Checkout';
import Profile from '../pages/Profile';
import { ProductDetail } from '../features/products/components/ProductDetail';
import { Cart } from '../features/cart/components/Cart';
import { Shop } from '../pages/Shop';
import { About } from '../pages/About';
import { Blog } from "../pages/Blog";
import { Contact } from "../pages/Contact";
import { OAuthSuccess } from "../auth/OAuthSuccess";
import { DefaultLayout } from "../components/layout/DefaultLayout";

// Public routes: no need sign in to access
const publicRoutes = [
    { path: config.routes.home, component: Home, layout: DefaultLayout },
    { path: config.routes.login, component: Login, layout: DefaultLayout },
    { path: config.routes.register, component: Register, layout: DefaultLayout },
    { path: config.routes.profile, component: Profile, layout: DefaultLayout },
    { path: config.routes.productDetail, component: ProductDetail, layout: DefaultLayout },
    { path: config.routes.cart, component: Cart, layout: DefaultLayout },
    { path: config.routes.shop, component: Shop, layout: DefaultLayout },
    { path: config.routes.about, component: About, layout: DefaultLayout },
    { path: config.routes.blog, component: Blog, layout: DefaultLayout },
    { path: config.routes.contact, component: Contact, layout: DefaultLayout },
    { path: config.routes.oauthSuccess, component: OAuthSuccess },
    
    { path: config.routes.checkout, component: Checkout, layout: null },
];

const standaloneRoutes = []

// Private routes: need sign in to access
const privateRoutes = [];

export { publicRoutes, privateRoutes, standaloneRoutes };