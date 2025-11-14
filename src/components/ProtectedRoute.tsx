import {
  selectIsAuthenticated,
  selectLoggedUserRole,
} from "@/utils/redux/selectors";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loggedUserRole = useSelector(selectLoggedUserRole);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (!allowedRoles.includes(loggedUserRole!))
    return <Navigate to="/unauthorized" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
