import { OAuthSuccess } from "../auth/OAuthSuccess";
import DefaultLayout from "../components/layout/DefaultLayout";
import config from "../config/config";
import AboutPage from "../pages/about/AboutPage";
import AccountPage from "../pages/account/AccountPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import BlogPage from "../pages/blog/BlogPage";
import CartPage from "../pages/cart/CartPage";
import CheckoutPage from "../pages/checkout/CheckoutPage";
import ContactPage from "../pages/contact/ContactPage";
import HomePage from "../pages/HomePage";
import ProductDetailPage from "../pages/product/ProductDetailPage";
import ShopPage from "../pages/shop/ShopPage";

// Public routes: no need sign in to access
const publicRoutes = [
  { path: config.ROUTES.home, component: HomePage, layout: DefaultLayout },
  { path: config.ROUTES.login, component: LoginPage, layout: DefaultLayout },
  {
    path: config.ROUTES.register,
    component: RegisterPage,
    layout: DefaultLayout,
  },
  {
    path: config.ROUTES.account,
    component: AccountPage,
    layout: DefaultLayout,
  },
  {
    path: config.ROUTES.productDetail,
    component: ProductDetailPage,
    layout: DefaultLayout,
  },
  { path: config.ROUTES.cart, component: CartPage, layout: DefaultLayout },
  { path: config.ROUTES.shop, component: ShopPage, layout: DefaultLayout },
  { path: config.ROUTES.about, component: AboutPage, layout: DefaultLayout },
  { path: config.ROUTES.blog, component: BlogPage, layout: DefaultLayout },
  {
    path: config.ROUTES.contact,
    component: ContactPage,
    layout: DefaultLayout,
  },
  { path: config.ROUTES.oauthSuccess, component: OAuthSuccess },

  { path: config.ROUTES.checkout, component: CheckoutPage, layout: null },
];

const standaloneRoutes = [];

// Private routes: need sign in to access
const privateRoutes = [];

export { privateRoutes, publicRoutes, standaloneRoutes };
