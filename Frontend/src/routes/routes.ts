import { OAuthSuccess } from "../auth/OAuthSuccess";
import { DefaultLayout } from "../components/layout/DefaultLayout";
import config from "../config/config";
import About from "../pages/AboutPage";
import Blog from "../pages/BlogPage";
import Cart from "../pages/CartPage";
import Checkout from "../pages/CheckoutPage";
import Contact from "../pages/ContactPage";
import Home from "../pages/HomePage";
import Login from "../pages/LoginPage";
import ProductDetail from "../pages/ProductDetailPage";
import Profile from "../pages/ProfilePage";
import Register from "../pages/RegisterPage";
import Shop from "../pages/ShopPage";

// Public routes: no need sign in to access
const publicRoutes = [
  { path: config.ROUTES.home, component: Home, layout: DefaultLayout },
  { path: config.ROUTES.login, component: Login, layout: DefaultLayout },
  { path: config.ROUTES.register, component: Register, layout: DefaultLayout },
  { path: config.ROUTES.profile, component: Profile, layout: DefaultLayout },
  {
    path: config.ROUTES.productDetail,
    component: ProductDetail,
    layout: DefaultLayout,
  },
  { path: config.ROUTES.cart, component: Cart, layout: DefaultLayout },
  { path: config.ROUTES.shop, component: Shop, layout: DefaultLayout },
  { path: config.ROUTES.about, component: About, layout: DefaultLayout },
  { path: config.ROUTES.blog, component: Blog, layout: DefaultLayout },
  { path: config.ROUTES.contact, component: Contact, layout: DefaultLayout },
  { path: config.ROUTES.oauthSuccess, component: OAuthSuccess },

  { path: config.ROUTES.checkout, component: Checkout, layout: null },
];

const standaloneRoutes = [];

// Private routes: need sign in to access
const privateRoutes = [];

export { privateRoutes, publicRoutes, standaloneRoutes };
