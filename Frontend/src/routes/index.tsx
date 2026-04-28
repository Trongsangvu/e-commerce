import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/guards/ProtectedRoute";
import AuthLayout from "../components/layout/AuthLayout";
import DefaultLayout from "../components/layout/DefaultLayout";
import { ROLES } from "../config/constants";
import { ROUTES } from "../config/routes";
import AboutPage from "../pages/about/AboutPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import BlogPage from "../pages/blog/BlogPage";
import CartPage from "../pages/cart/CartPage";
import ContactPage from "../pages/contact/ContactPage";
import HomePage from "../pages/HomePage";
import ProductDetailPage from "../pages/product/ProductDetailPage";
// import ProductListPage from "../pages/product/ProductListPage";
import ShopPage from "../pages/shop/ShopPage";

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
