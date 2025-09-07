import config from "../config/config";
import { Home } from "../pages/Home";
import { Login } from "../pages/Auth/Login";
import { Register } from "../pages/Auth/Register";
import Checkout from "../pages/Checkout";
import Profile from "../pages/Profile/Profile";
import { ProductDetail } from "../pages/Product/ProductDetail";
import { Cart } from "../pages/Cart/Cart";
import { Shop } from "../pages/Shop/Shop";
import { About } from "../pages/About/About";
import { Blog } from "../pages/Blog/Blog";
import { Contact } from "../pages/Contact/Contact";
import { OAuthSuccess } from "../auth/OAuthSuccess";
import { DefaultLayout } from "../components/layout/DefaultLayout";

// Public routes: no need sign in to access
const publicRoutes = [
  { path: config.routes.home, component: Home, layout: DefaultLayout },
  { path: config.routes.login, component: Login, layout: DefaultLayout },
  { path: config.routes.register, component: Register, layout: DefaultLayout },
  { path: config.routes.profile, component: Profile, layout: DefaultLayout },
  {
    path: config.routes.productDetail,
    component: ProductDetail,
    layout: DefaultLayout,
  },
  { path: config.routes.cart, component: Cart, layout: DefaultLayout },
  { path: config.routes.shop, component: Shop, layout: DefaultLayout },
  { path: config.routes.about, component: About, layout: DefaultLayout },
  { path: config.routes.blog, component: Blog, layout: DefaultLayout },
  { path: config.routes.contact, component: Contact, layout: DefaultLayout },
  { path: config.routes.oauthSuccess, component: OAuthSuccess },

  { path: config.routes.checkout, component: Checkout, layout: null },
];

const standaloneRoutes = [];

// Private routes: need sign in to access
const privateRoutes = [];

export { publicRoutes, privateRoutes, standaloneRoutes };
