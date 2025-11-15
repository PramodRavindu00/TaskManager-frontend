import { Navigate, Outlet } from "react-router-dom";
import Spinner from "./Spinner";
import type { ProtectedRouteProps, UserRole } from "@/utils/constants/types";
import { useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectIsAuthenticating,
  selectLoggedUserRole,
} from "@/utils/redux/selectors";

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const isAuthenticating = useSelector(selectIsAuthenticating);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loggedUserRole = useSelector(selectLoggedUserRole);

  if (isAuthenticating) return <Spinner fullScreen={true} />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (loggedUserRole && !allowedRoles.includes(loggedUserRole as UserRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
