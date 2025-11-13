import api from "@/utils/axios/apiUtil";
import { clearAuth, setAccessToken } from "@/utils/redux/authSlice";
import {
  selectIsAuthenticated,
  selectLoggedUser,
  selectLoggedUserRole,
} from "@/utils/redux/selectors";
import { clearUser, setUser } from "@/utils/redux/userSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const loggedUser = useSelector(selectLoggedUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loggedUserRole = useSelector(selectLoggedUserRole);

  const skipLogin = async (redirectBasedOnUserRole: (role: string) => void) => {
    try {
      const { data: refreshData } = await api.get("/auth/refresh", {
        public: true, //no access token sending in header. but refresh cookie is automatically sended
      });
      const { data: user } = await api.get("/auth/getLoggedUser"); // get user data from the new access token generated from the refreshToken

      dispatch(setAccessToken(refreshData.accessToken));
      dispatch(setUser(user));
      console.log("Refreshed Auth Data");
      redirectBasedOnUserRole(loggedUserRole);
    } catch (error) {
      console.error("Auth Data Refreshing failed :", error);
      dispatch(clearAuth());
      dispatch(clearUser());
    } finally {
      setIsCheckingAuth(false);
    }
  };

  return {
    isCheckingAuth,
    isAuthenticated,
    loggedUser,
    loggedUserRole,
    skipLogin,
  };
};
