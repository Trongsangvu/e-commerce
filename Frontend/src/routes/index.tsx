import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/guards/protected-route";
import AuthLayout from "../components/layout/auth-layout";
import DefaultLayout from "../components/layout/default-layout";
import { roles } from "../config/constants";
import { routes } from "../config/routes";
import AboutPage from "../pages/about/about-page";
import AccountPage from "../pages/account/account-page";
import LoginPage from "../pages/auth/login-page";
import RegisterPage from "../pages/auth/register-page";
import BlogPage from "../pages/blog/blog-page";
import CartPage from "../pages/cart/cart-page";
import ContactPage from "../pages/contact/contact-page";
import HomePage from "../pages/home-page";
import ProductDetailPage from "../pages/product/product-detail-page";
import ProductListPage from "../pages/product/product-list-page";
import ShopPage from "../pages/shop/shop-page";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: routes.login,
        element: <LoginPage />,
      },
      {
        path: routes.register,
        element: <RegisterPage />,
      },
    ],
  },
  {
    element: <DefaultLayout />,
    children: [
      {
        path: routes.home,
        element: <HomePage />,
      },
      {
        path: routes.products,
        element: <ProductListPage />,
      },
      {
        path: routes.productDetail,
        element: <ProductDetailPage />,
      },
      {
        path: routes.cart,
        element: <CartPage />,
      },
      {
        path: routes.about,
        element: <AboutPage />,
      },
      {
        path: routes.blog,
        element: <BlogPage />,
      },
      {
        path: routes.contact,
        element: <ContactPage />,
      },
      {
        path: routes.shop,
        element: <ShopPage />,
      },
      {
        path: routes.account,
        element: <AccountPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute roles={[roles.user, roles.admin]} />,
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
