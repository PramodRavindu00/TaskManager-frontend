import api from "@/utils/axios/apiUtil";
import { setAccessToken, setIsAuthenticating } from "@/utils/redux/authSlice";
import {
  selectIsAuthenticated,
  selectIsAuthenticating,
} from "@/utils/redux/selectors";
import { setUser } from "@/utils/redux/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const Init = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAuthenticating = useSelector(selectIsAuthenticating);
  useEffect(() => {
    if (isAuthenticated) {
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
        navigate("/login");
      } finally {
        dispatch(setIsAuthenticating(false));
      }
    };

    checkAuth();
  }, [dispatch, navigate, isAuthenticated, location.pathname]);

  if (isAuthenticating) return <Spinner fullScreen={true} />;

  return <>{children}</>;
};

export default Init;
