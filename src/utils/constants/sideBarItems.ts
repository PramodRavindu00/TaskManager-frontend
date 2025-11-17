import { FaDiagramProject, FaTableColumns } from "react-icons/fa6";
import type { SidebarItem } from "./types";
import { FaTachometerAlt, FaTasks, FaUser } from "react-icons/fa";

export const userSideBarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: FaTachometerAlt,
  },
  {
    title: "Work Board",
    path: "/board",
    icon: FaTableColumns,
  },
  {
    title: "Task",
    path: "/tasks",
    icon: FaTasks,
    children: [
      { title: "Add Task", path: "/tasks/new" },
      { title: "All Tasks", path: "/tasks/new" },
    ],
  },
  {
    title: "Project",
    path: "/board",
    icon: FaDiagramProject,
  },
];
export const adminSideBarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: FaTachometerAlt,
  },
  {
    title: "Work Board",
    path: "/board",
    icon: FaTableColumns,
  },
  {
    title: "Task",
    path: "/tasks",
    icon: FaTasks,
  },
  {
    title: "Project",
    path: "/board",
    icon: FaDiagramProject,
  },
];
export const commonSideBarItems: SidebarItem[] = [
  {
    title: "Profile",
    path: "/profile",
    icon: FaUser,
  },
];
