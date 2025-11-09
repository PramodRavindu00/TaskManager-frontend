import { useAuth } from "@/hooks/useAuth";
// import Spinner from "./Spinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles: string | string[];
}

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const {  isAuthenticated, loggedUserRole } = useAuth();

//   if (isChecking) {
//     return <Spinner fullScreen={true} />;
//   }

  if (!isAuthenticated) {
    window.location.href = "/login";
    return null;
  }

  if (roles) {
    const hasRequiredRole = Array.isArray(roles)
      ? roles.includes(loggedUserRole || "")
      : loggedUserRole === roles;

    if (!hasRequiredRole) {
      window.location.href = "/unAuthorized";
      return null;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
