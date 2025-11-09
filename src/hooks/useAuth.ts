import api from "@/utils/axios/apiUtil";
import { clearAuth, setAccessToken } from "@/utils/redux/authSlice";
import {
  selectAccessToken,
  selectIsAuthenticated,
  selectLoggedUser,
  selectLoggedUserRole,
} from "@/utils/redux/selectors";
import { clearUser, setUser } from "@/utils/redux/userSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  const accessToken = useSelector(selectAccessToken);
  const loggedUser = useSelector(selectLoggedUser);

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loggedUserRole = useSelector(selectLoggedUserRole);

  const redirectBasedOnRole = (role: string) => {
    if (role === "Admin") {
      navigate("/admin/dashboard", { replace: true });
    } else if (role === "User") {
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/unauthorized", { replace: true });
    }
  };

  const autoLogin = async () => {
    try {
      const { data: refreshData } = await api.get("/auth/refresh", {
        public: true,
      });
      const { data: user } = await api.get("/auth/getLoggedUser");

      dispatch(setAccessToken(refreshData.accessToken));
      dispatch(setUser(user));
      console.log("Auto logged using refresh token");

      redirectBasedOnRole(user?.role);
    } catch (error) {
      console.error("Auto Login failed:", error);
      dispatch(clearAuth());
      dispatch(clearUser());
    } finally {
      setIsChecking(false);
    }
  };

  return {
    accessToken,
    isChecking,
    isAuthenticated,
    loggedUser,
    loggedUserRole,
    autoLogin,
    redirectBasedOnRole,
  };
};
