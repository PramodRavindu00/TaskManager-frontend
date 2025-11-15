import type { SidebarItems } from "../constants/types";
import {
  FaList,
  FaPlus,
  FaProjectDiagram,
  FaTasks,
  FaUsers,
} from "react-icons/fa";

export const userSideBarItems: SidebarItems[] = [];
export const adminSideBarItems: SidebarItems[] = [];
export const commonSideBarItems: SidebarItems[] = [
  {
    title: "Project",
    icon: FaProjectDiagram,
    children: [
      {
        title: "Add Project",
        path: "/projects/add",
        icon: FaPlus,
      },
      {
        title: "All Projects",
        path: "/projects/all",
        icon: FaList,
      },
    ],
  },
  {
    title: "Tasks",
    path: "/tasks",
    icon: FaTasks,
  },
  {
    title: "Team",
    path: "/team",
    icon: FaUsers,
  },
];
