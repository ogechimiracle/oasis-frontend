import { z } from "zod";

export const loginValidation = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .min(1, "Email field is required"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});





export const registerValidation = z
  .object({
    email: z
      .string()
      .email("Invalid email format"),
      

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(15, "Password cannot exceed 15 characters"),

    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormValidation = z.infer<typeof registerValidation>;
export type LoginFormValidation = z.infer<typeof loginValidation>;