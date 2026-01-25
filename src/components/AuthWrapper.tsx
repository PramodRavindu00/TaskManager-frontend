// AuthWrapper.tsx
import api from "@/utils/axios/apiUtil";
import { 
  setAccessToken, 
  setIsAuthenticating, 
  setAuthInitialized 
} from "@/utils/redux/authSlice";
import {
  selectAuthInitialized,
  selectIsAuthenticating,
} from "@/utils/redux/selectors";
import { setUser } from "@/utils/redux/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { publicRoutes } from "@/utils/constants/constants";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  
  const isAuthenticating = useSelector(selectIsAuthenticating);
  const authInitialized = useSelector(selectAuthInitialized);

  useEffect(() => {
    // Skip if auth is already initialized
    if (authInitialized) return;

    const currentPath = location.pathname.replace(/\/+$/, "");
    const isPublic = publicRoutes.includes(currentPath);

    // Initialize auth
    const initializeAuth = async () => {
      dispatch(setIsAuthenticating(true));
      
      try {
        // Try to refresh token
        const { data: refreshData } = await api.get("/auth/refresh");
        
        if (refreshData?.accessToken) {
          dispatch(setAccessToken(refreshData.accessToken));
          
          // Fetch user data if token exists
          const { data: user } = await api.get("/auth/loggedUser");
          dispatch(setUser(user));
        } else {
          dispatch(setAccessToken(null));
        }
      } catch (error) {
        // Clear auth on any error
        console.error(error)
        dispatch(setAccessToken(null));
        
        // Only redirect to login if not on a public route
        if (!isPublic) {
          navigate("/login", { replace: true });
        }
      } finally {
        // Mark auth as initialized
        dispatch(setIsAuthenticating(false));
        dispatch(setAuthInitialized(true));
      }
    };

    initializeAuth();
  }, [dispatch, navigate, authInitialized, location.pathname]);

  // Don't render children until auth is initialized
  if (!authInitialized || isAuthenticating) {
    return <Spinner fullScreen={true} />;
  }

  return <>{children}</>;
};

export default AuthWrapper;