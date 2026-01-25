import api from "@/utils/axios/apiUtil";
import type { LoginFormData } from "@/utils/formValidations/loginSchema";
import type { SignUpFormData } from "@/utils/formValidations/signUpSchema";

export const authService = {
  refresh: async () => {
    const { data } = await api.get("/auth/refresh");
    return data;
  },

  getLoggedUser: async () => {
    const { data } = await api.get("/auth/loggedUser");
    return data;
  },

  login: async (payload: LoginFormData) => {
    const { data } = await api.post("/auth/login", payload);
    return data;
  },

  signup: async (payload: SignUpFormData) => {
    const { data } = await api.post("/auth/signup", payload);
    return data;
  },

  logout: async () => {
    await api.post("/auth/logout");
  },
};
