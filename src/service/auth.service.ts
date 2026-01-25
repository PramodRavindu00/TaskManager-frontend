import api from "@/utils/axios/apiUtil";
import type { LoginFormData } from "@/utils/formValidations/loginSchema";
import type { SignUpFormData } from "@/utils/formValidations/signUpSchema";

export const authService = {
  signup: async (payload: SignUpFormData) => {
    return await api.post("/auth/signup", payload, { public: true });
  },

  login: async (payload: LoginFormData) => {
    return await api.post("/auth/login", payload, { public: true });
  },

  refresh: async () => {
      return await api.get("/auth/refresh", { public: true });
  },

  getLoggedUser: async () => {
    return await api.get("/auth/loggedUser");
  },

  logout: async () => {
    return await api.post("/auth/logout");
  },
};