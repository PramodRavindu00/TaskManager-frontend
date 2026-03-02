import { getDefaultRouteForRole } from "@/utils/helpers/getDefaultRouteForRole";
import {
  selectAuthLoading,
  selectAuthenticated,
  selectLoggedUserRole,
} from "@/utils/redux/selectors";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RootRedirect = () => {
  const isAuthenticated = useSelector(selectAuthenticated);
  const loggedUserRole = useSelector(selectLoggedUserRole);
  const isAuthLoading = useSelector(selectAuthLoading);

  const defaultRoute =
    !isAuthLoading && isAuthenticated && loggedUserRole
      ? getDefaultRouteForRole(loggedUserRole)
      : "/login";
  return <Navigate to={defaultRoute} replace />;
};

export default RootRedirect;
