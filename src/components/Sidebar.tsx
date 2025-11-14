import api from "@/utils/axios/apiUtil";
import { clearAuth } from "@/utils/redux/authSlice";
import { clearUser } from "@/utils/redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogOut = async () => {
    try {
      await api.post("/auth/logout");
      dispatch(clearUser());
      dispatch(clearAuth());
      navigate("/login", { replace: true });
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong");
    }
  };
  return (
    <aside className="h-screen hidden sm:flex md:w-1/7 sm:flex-col items-start justify-start p-5">
      <button className="rounded border px-2" onClick={handleLogOut}>
        Log Out
      </button>
    </aside>
  );
};

export default Sidebar;
