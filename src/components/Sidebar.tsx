import api from "@/utils/axios/apiUtil";
import { clearAuth } from "@/utils/redux/authSlice";
import { selectLoggedUserRole } from "@/utils/redux/selectors";
import { clearUser } from "@/utils/redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  adminSideBarItems,
  commonSideBarItems,
  userSideBarItems,
} from "@/utils/helpers/sideBarItems";

const Sidebar = () => {
  const loggedUserRole = useSelector(selectLoggedUserRole);
  const items =
    loggedUserRole === "Admin"
      ? [...adminSideBarItems, ...commonSideBarItems]
      : [...userSideBarItems, ...commonSideBarItems];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogOut = async () => {
    try {
      await api.post("/auth/logout");
      dispatch(clearUser());
      dispatch(clearAuth());
      navigate("/login", { replace: true });
    } catch {
      toast.error("Something Went Wrong");
    }
  };
  return (
    <aside className="h-screen hidden sm:flex md:w-1/7 sm:flex-col items-start justify-start p-5 bg-amber-200">
      <ul>
        {items.map((item) => (
          <li key={item.title}>
            {/* <item.icon /> */}
            {item.title}
            {item.children && (
              <ul>
                {item.children.map((sub) => (
                  <li key={sub.title}>
                    {/* <sub.icon /> */}
                    {sub.title}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
        <button className="link" onClick={handleLogOut}>
          Log Out
        </button>
      </ul>
    </aside>
  );
};

export default Sidebar;
