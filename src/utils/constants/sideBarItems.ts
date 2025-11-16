import type { SidebarItem } from "./types";
import { FaUser } from "react-icons/fa";

export const userSideBarItems: SidebarItem[] = [];
export const adminSideBarItems: SidebarItem[] = [];
export const commonSideBarItems: SidebarItem[] = [
  {
    title: "Profile",
    path: "/profile",
    icon: FaUser,
  },
];
