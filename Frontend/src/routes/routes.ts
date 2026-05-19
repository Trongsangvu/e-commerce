import { OAuthSuccess } from "../auth/oauth-success";
import DefaultLayout from "../components/layout/default-layout";
import { routes } from "../config/routes";
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
const publicroutes = [
  { path: routes.home, component: HomePage, layout: DefaultLayout },
  { path: routes.login, component: LoginPage, layout: DefaultLayout },
  {
    path: routes.register,
    component: RegisterPage,
    layout: DefaultLayout,
  },
  {
    path: routes.account,
    component: AccountPage,
    layout: DefaultLayout,
  },
  {
    path: routes.productDetail,
    component: ProductDetailPage,
    layout: DefaultLayout,
  },
  { path: routes.cart, component: CartPage, layout: DefaultLayout },
  { path: routes.shop, component: ShopPage, layout: DefaultLayout },
  { path: routes.about, component: AboutPage, layout: DefaultLayout },
  { path: routes.blog, component: BlogPage, layout: DefaultLayout },
  {
    path: routes.contact,
    component: ContactPage,
    layout: DefaultLayout,
  },
  { path: routes.oauthSuccess, component: OAuthSuccess },

  { path: routes.checkout, component: CheckoutPage, layout: null },
];

const standaloneroutes = [];

// Private routes: need sign in to access
const privateroutes = [];

export { privateroutes, publicroutes, standaloneroutes };

