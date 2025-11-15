import type { UserRole } from "../constants/types";

export const getDefaultRouteForRole = (role: UserRole) => {
  switch (role) {
    case "Admin":
      return "/admin/dashboard";
    case "User":
      return "/dashboard";
    default:
      return "/login";
  }
};
