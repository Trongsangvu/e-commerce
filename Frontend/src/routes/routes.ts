import { OAuthSuccess } from "../auth/OAuthSuccess";
import DefaultLayout from "../components/layout/DefaultLayout";
import { ROUTES } from "../config/routes";
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
  { path: ROUTES.home, component: HomePage, layout: DefaultLayout },
  { path: ROUTES.login, component: LoginPage, layout: DefaultLayout },
  {
    path: ROUTES.register,
    component: RegisterPage,
    layout: DefaultLayout,
  },
  {
    path: ROUTES.account,
    component: AccountPage,
    layout: DefaultLayout,
  },
  {
    path: ROUTES.productDetail,
    component: ProductDetailPage,
    layout: DefaultLayout,
  },
  { path: ROUTES.cart, component: CartPage, layout: DefaultLayout },
  { path: ROUTES.shop, component: ShopPage, layout: DefaultLayout },
  { path: ROUTES.about, component: AboutPage, layout: DefaultLayout },
  { path: ROUTES.blog, component: BlogPage, layout: DefaultLayout },
  {
    path: ROUTES.contact,
    component: ContactPage,
    layout: DefaultLayout,
  },
  { path: ROUTES.oauthSuccess, component: OAuthSuccess },

  { path: ROUTES.checkout, component: CheckoutPage, layout: null },
];

const standaloneRoutes = [];

// Private routes: need sign in to access
const privateRoutes = [];

export { privateRoutes, publicRoutes, standaloneRoutes };

