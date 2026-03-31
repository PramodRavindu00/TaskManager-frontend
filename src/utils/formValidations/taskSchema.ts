import { z } from "zod";
import { TaskType } from "../constants/constants";

export const taskSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    type: z.enum(TaskType, "Task Type is required"),
    projectId: z.string().optional(),
    assignedTo: z.string().optional(),
    dueDate: z.date().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.type === TaskType.Project &&
      (!data.projectId || data.projectId.trim() === "")
    ) {
      ctx.addIssue({
        path: ["projectId"],
        message: "Project Id is required for a project task",
        code: "custom",
      });
    }
  });

export type TaskFormData = z.infer<typeof taskSchema>;
