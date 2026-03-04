import { clearAuth, setAuthSuccess } from "@/utils/redux/authSlice";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";
import { selectAuthLoading } from "@/utils/redux/selectors";
import { authService } from "@/service/auth.service";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const isAuthLoading = useSelector(selectAuthLoading);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Try to refresh token - returns data directly
        const refreshResponse = await authService.refresh();
        const token = refreshResponse?.data?.accessToken;

        if (token) {
          // Fetch user data - returns user object directly (not wrapped in data)
          const userResponse = await authService.getLoggedUser();
          const user = userResponse?.data;
          dispatch(setAuthSuccess({ accessToken: token, user }));
        } else {
          dispatch(clearAuth());
        }
      } catch {
        dispatch(clearAuth());
      }
    };

    initializeAuth();
  }, [dispatch]);

  if (isAuthLoading) {
    return <Spinner fullScreen={true} />;
  }

  return <>{children}</>;
};

export default AuthWrapper;
