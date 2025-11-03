import { z } from "zod";

export const signUpSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First name is required")
      .regex(/^[A-Za-z]+$/, "First name must contain letters only"),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .regex(/^[A-Za-z]+$/, "Last name must contain letters only"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(16, "Password cannot have more than 16 characters"),
    confirmPassword: z
      .string()
      .min(1, "Password must be confirmed")
      .min(6, "Password must be at least 6 characters")
      .max(16, "Password cannot have more than 16 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
