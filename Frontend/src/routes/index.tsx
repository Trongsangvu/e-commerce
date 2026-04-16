import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/guards/ProtectedRoute";
import AuthLayout from "../components/layout/AuthLayout";
import DefaultLayout from "../components/layout/DefaultLayout";
import { ROLES } from "../config/constants";
import { ROUTES } from "../config/routes";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import HomePage from "../pages/HomePage";
import ProductDetailPage from "../pages/product/ProductDetailPage";
import ProductListPage from "../pages/product/ProductListPage";
import CartPage from "../pages/cart/CartPage";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: ROUTES.login,
        element: <LoginPage />,
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
      {
        path: ROUTES.register,
        element: <RegisterPage />,
      },
      {
        path: ROUTES.products,
        element: <ProductListPage />,
      },
      {
        path: ROUTES.productDetail,
        element: <ProductDetailPage />,
      },
      {
        path: ROUTES.cart,
        element: <CartPage />,
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
