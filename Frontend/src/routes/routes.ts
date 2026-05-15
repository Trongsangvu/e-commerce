import { OAuthSuccess } from "../auth/oauth-success";
import DefaultLayout from "../components/layout/default-layout";
import { ROUTES } from "../config/routes";
import AboutPage from "../pages/about/about-page";
import AccountPage from "../pages/account/account-page";
import LoginPage from "../pages/auth/login-page";
import RegisterPage from "../pages/auth/register-page";
import BlogPage from "../pages/blog/blog-page";
import CartPage from "../pages/cart/cart-page";
import CheckoutPage from "../pages/checkout/checkout-page";
import ContactPage from "../pages/contact/contact-page";
import HomePage from "../pages/home-page";
import ProductDetailPage from "../pages/product/product-detail-page";
import ShopPage from "../pages/shop/shop-page";

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

