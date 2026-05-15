import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/guards/protected-route";
import AuthLayout from "../components/layout/auth-layout";
import DefaultLayout from "../components/layout/default-layout";
import { ROLES } from "../config/constants";
import { ROUTES } from "../config/routes";
import AboutPage from "../pages/about/about-page";
import LoginPage from "../pages/auth/login-page";
import RegisterPage from "../pages/auth/register-page";
import BlogPage from "../pages/blog/blog-page";
import CartPage from "../pages/cart/cart-page";
import ContactPage from "../pages/contact/contact-page";
import HomePage from "../pages/home-page";
import ProductDetailPage from "../pages/product/product-detail-page";
// import ProductListPage from "../pages/product/ProductListPage";
import AccountPage from "../pages/account/account-page";
import ShopPage from "../pages/shop/shop-page";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: ROUTES.login,
        element: <LoginPage />,
      },
      {
        path: ROUTES.register,
        element: <RegisterPage />,
      },
    ],
  },
  {
    element: <DefaultLayout />,
    children: [
      {
        path: ROUTES.home,
        element: <HomePage />,
      },
      // {
      //   path: ROUTES.products,
      //   element: <ProductListPage />,
      // },
      {
        path: ROUTES.productDetail,
        element: <ProductDetailPage />,
      },
      {
        path: ROUTES.cart,
        element: <CartPage />,
      },
      {
        path: ROUTES.about,
        element: <AboutPage />,
      },
      {
        path: ROUTES.blog,
        element: <BlogPage />,
      },
      {
        path: ROUTES.contact,
        element: <ContactPage />,
      },
      {
        path: ROUTES.shop,
        element: <ShopPage />,
      },
      {
        path: ROUTES.account,
        element: <AccountPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute roles={[ROLES.USER, ROLES.ADMIN]} />,
    children: [
      {
        element: <DefaultLayout />,
        children: [
          {
            // path:
            // element ,
          },
        ],
      },
    ],
  },
]);

export default router;
