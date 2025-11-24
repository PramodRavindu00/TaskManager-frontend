import { FaDiagramProject, FaTableColumns } from "react-icons/fa6";
import type { SidebarItem } from "./types";
import { FaTachometerAlt, FaTasks } from "react-icons/fa";

export const userSideBarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: FaTachometerAlt,
  },
  {
    title: "Work Board",
    icon: FaTableColumns,
    children: [
      { title: "Personal", path: "/work-board/personal" },
      { title: "Project", path: "/work-board/projects" },
    ],
  },
  {
    title: "Tasks",
    path: "/tasks",
    icon: FaTasks,
  },
  {
    title: "Projects",
    path: "/projects",
    icon: FaDiagramProject,
  },
];
export const adminSideBarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: FaTachometerAlt,
  },
];
