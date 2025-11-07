import api from "@/apiService";
import { setAccessToken } from "@/redux/authSlice";
import type { RootState } from "@/redux/store";
import { setUser } from "@/redux/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    const init = async () => {
      try {
        if (accessToken) {
          setLoading(false);
          return;
        }

        const { data: refreshData } = await api.get("/auth/refresh");
        dispatch(setAccessToken(refreshData.accessToken));

        const { data: userData } = await api.get("/auth/me");
        dispatch(setUser(userData));
      } catch (error) {
        console.log("Auto Login failed:", error);
        navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [accessToken, dispatch, navigate]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Loading....
      </div>
    );
  }
  return <>{children}</>;
};

export default AuthProvider;
