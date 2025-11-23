import api from "@/utils/axios/apiUtil";
import { clearAuth } from "@/utils/redux/authSlice";
import {
  selectLoggedUser,
  selectLoggedUserRole,
} from "@/utils/redux/selectors";
import { clearUser } from "@/utils/redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  adminSideBarItems,
  userSideBarItems,
} from "@/utils/constants/sideBarItems";
import { FaPersonWalkingArrowRight } from "react-icons/fa6";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import SideBarItem from "./SidebarItem";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const loggedUser = useSelector(selectLoggedUser);
  const loggedUserRole = useSelector(selectLoggedUserRole);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items =
    loggedUserRole === "Admin" ? [...adminSideBarItems] : [...userSideBarItems];

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
    <>
      <FaBars
        className=" md:hidden top-5 left-5  cursor-pointer fixed lg:relative"
        onClick={() => setOpen(true)}
      />
      <nav
        className={`
          text-sm
          h-screen fixed top-0 left-0  z-50 flex flex-col py-5 transition-transform duration-700 ease-in-out
          md:translate-x-0 md:relative
          ${open ? "translate-x-0" : "-translate-x-full"}
          w-full
          sm:w-52
         bg-secondary
          border-r
         border-main
        `}
      >
        <div className="flex justify-between  px-5 pb-5 items-center">
          <h2 className="text-4xl">Taskium</h2>
          <button
            className="cursor-pointer md:hidden"
            onClick={() => setOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        <ul className="flex flex-col px-2 grow overflow-y-auto scrollbar">
          {items.map((item, index) => (
            <SideBarItem
              item={item}
              key={index}
              onItemClick={() => setOpen(false)}
            />
          ))}
        </ul>
        <div className="px-2 flex flex-col items-center justify-center gap-2">
          <div className="w-full flex flex-row items-center justify-start gap-2">
            <Link
              to="/profile"
              className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-semibold capitalize"
            >
              {`${loggedUser?.firstName.charAt(
                0
              )} ${loggedUser?.lastName.charAt(0)}`}
            </Link>
            <div className="flex flex-col items-start justify-center gap-1">
              <p className="capitalize">
                {`${loggedUser?.firstName} ${loggedUser?.lastName}`}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogOut}
            className="flex flex-row items-center gap-x-3 cursor-pointer py-2 px-4 rounded-lg"
          >
            <FaPersonWalkingArrowRight />
            Log Out
          </button>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
