import api from "@/utils/axios/apiUtil";
import { setAccessToken, setIsAuthenticating } from "@/utils/redux/authSlice";
import {
  selectIsAuthenticated,
  selectIsAuthenticating,
} from "@/utils/redux/selectors";
import { setUser } from "@/utils/redux/userSlice";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { publicRoutes } from "@/utils/constants/constants";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticating = useSelector(selectIsAuthenticating);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const initialized = useRef(false);
  useEffect(() => {
    const currentPath = location.pathname.replace(/\/+$/, "");
    const isPublic = publicRoutes.includes(currentPath);

    if (
      (!isAuthenticated && isPublic) ||
      isAuthenticated ||
      initialized.current
    ) {
      dispatch(setIsAuthenticating(false));
      return;
    }

    const checkAuth = async () => {
      try {
        const { data: refreshData } = await api.get("/auth/refresh");
        dispatch(setAccessToken(refreshData?.accessToken));

        const { data: user } = await api.get("/auth/loggedUser");
        dispatch(setUser(user));
      } catch {
        navigate("/login", { replace: true });
      } finally {
        dispatch(setIsAuthenticating(false));
        initialized.current = true;
      }
    };

    checkAuth();
  }, [dispatch, navigate, isAuthenticated, location.pathname]);

  if (isAuthenticating) return <Spinner fullScreen={true} />;

  return <>{children}</>;
};

export default AuthWrapper;
