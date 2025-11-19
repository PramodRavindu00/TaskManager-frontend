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
} from "@/utils/constants/sideBarItems";
import { FaPersonWalkingArrowRight } from "react-icons/fa6";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import SideBarItem from "./SidebarItem";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const loggedUserRole = useSelector(selectLoggedUserRole);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items =
    loggedUserRole === "Admin"
      ? [...adminSideBarItems, ...commonSideBarItems]
      : [...userSideBarItems, ...commonSideBarItems];

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
        className=" lg:hidden top-5 left-5  cursor-pointer fixed lg:relative"
        onClick={() => setOpen(true)}
      />
      <nav
        className={`
          h-screen fixed top-0 left-0  z-50 flex flex-col py-5 transition-transform duration-700 ease-in-out
          lg:translate-x-0 lg:relative
          ${open ? "translate-x-0" : "-translate-x-full"}
          w-full
          sm:w-1/3
          lg:w-52
         bg-secondary
          border-r
         border-main
        `}
      >
        <div className="flex justify-between  px-5 pb-5 items-center">
          <h2 className="text-4xl">Taskium</h2>
          <button
            className="cursor-pointer lg:hidden"
            onClick={() => setOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        <ul className="flex flex-col gap-y-1 px-5">
          {items.map((item) => (
            <SideBarItem item={item} />
          ))}
          <button
            onClick={handleLogOut}
            className="w-full flex flex-row items-center gap-x-3 cursor-pointer p-2 rounded"
          >
            <FaPersonWalkingArrowRight />
            Log Out
          </button>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
