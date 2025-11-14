type UserRole = "Admin" | "User";
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
