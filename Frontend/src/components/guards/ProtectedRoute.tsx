import { Navigate, Outlet } from "react-router-dom";
import routes from "../../config/routes";
import { useAppSelector } from "../../hooks/use-redux";
import { RootStore } from "../../redux/store";

interface Props {
  roles?: string[];
}

const ProtectedRoute = ({ roles }: Props) => {
  const { user, isLoadingUser } = useAppSelector((state: RootStore) => state.user);

  if (isLoadingUser) return null;

  if (!user) {
    return <Navigate to={routes.login} />;
  }

  if (roles && !roles.includes(user.role)) {
    return <div>Not Permission</div>;
  }

  return <Outlet />;
};

export default ProtectedRoute;
