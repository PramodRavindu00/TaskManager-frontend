import api from "@/utils/axios/apiUtil";
import type { ProjectFormData } from "@/utils/formValidations/projectSchema";

export const projectService = {
  create: async (payload: ProjectFormData) => {
    return await api.post("/project", payload);
  },
};