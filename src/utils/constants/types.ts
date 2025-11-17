import type { IconType } from "react-icons";

export type UserRole = "Admin" | "User";
export interface ProtectedRouteProps {
  allowedRoles: UserRole[];
}

export interface AuthState {
  accessToken: string | null;
  isAuthenticating: boolean;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}
export interface UserState {
  data: User | null;
}

export interface SidebarItem {
  title: string;
  path?: string;
  icon?: IconType;
  children?: SidebarItem[];
}

export type Theme = "light" | "dark";
