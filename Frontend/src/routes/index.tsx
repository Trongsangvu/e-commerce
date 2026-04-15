import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/guards/ProtectedRoute";
import AuthLayout from "../components/layout/AuthLayout";
import { DefaultLayout } from "../components/layout/DefaultLayout";
import { ROLES } from "../config/constants";
import routes from "../config/routes";
import Login from "../pages/LoginPage";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [{ path: routes.login, element: <Login /> }],
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
          }
        ],
      },
    ],
  },
]);

export default router;
