import { useAuth } from "@/hooks/useAuth";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles: string | string[];
}

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const { isAuthenticated, loggedUserRole, isCheckingAuth } = useAuth();
  const navigate = useNavigate();

  if (isCheckingAuth) {
    return <Spinner fullScreen={true} />;
  }

  if (!isAuthenticated) {
    navigate("/login", { replace: true });
    return null;
  }

  if (roles) {
    const hasRequiredRole = Array.isArray(roles)
      ? roles.includes(loggedUserRole || "")
      : loggedUserRole === roles;

    if (!hasRequiredRole) {
      navigate("/unAuthorized", { replace: true });
      return null;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
