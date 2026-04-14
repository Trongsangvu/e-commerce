import { OAuthSuccess } from "../auth/OAuthSuccess";
import { DefaultLayout } from "../components/layout/DefaultLayout";
import config from "../config/config";
import { About } from "../pages/About";
import { Blog } from "../pages/Blog";
import { Cart } from "../pages/Cart";
import Checkout from "../pages/Checkout";
import { Contact } from "../pages/Contact";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { ProductDetail } from "../pages/ProductDetail";
import Profile from "../pages/Profile";
import { Register } from "../pages/Register";
import { Shop } from "../pages/Shop";

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

export { privateRoutes, publicRoutes, standaloneRoutes };

