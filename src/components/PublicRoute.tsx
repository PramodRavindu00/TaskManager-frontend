import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectAuthLoading,
  selectAuthenticated,
  selectLoggedUserRole,
} from "@/utils/redux/selectors";
import { getDefaultRouteForRole } from "@/utils/helpers/getDefaultRouteForRole";
import Spinner from "./Spinner";

const PublicRoute = () => {
  const isAuthLoading = useSelector(selectAuthLoading);
  const isAuthenticated = useSelector(selectAuthenticated);
  const loggedUserRole = useSelector(selectLoggedUserRole);

  if (isAuthLoading) return <Spinner fullScreen={true} />;

  if (isAuthenticated && loggedUserRole) {
    return <Navigate to={getDefaultRouteForRole(loggedUserRole)} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
