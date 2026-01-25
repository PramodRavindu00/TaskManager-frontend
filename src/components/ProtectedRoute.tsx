// ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import Spinner from "./Spinner";
import type { ProtectedRouteProps, UserRole } from "@/utils/constants/types";
import { useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectIsAuthenticating,
  selectLoggedUserRole,
  selectAuthInitialized,
} from "@/utils/redux/selectors";

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const isAuthenticating = useSelector(selectIsAuthenticating);
  const authInitialized = useSelector(selectAuthInitialized);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loggedUserRole = useSelector(selectLoggedUserRole);

  // Show spinner only while initializing
  if (!authInitialized || isAuthenticating) {
    return <Spinner fullScreen={true} />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check role authorization
  if (loggedUserRole && !allowedRoles.includes(loggedUserRole as UserRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;