import { z } from "zod";

export const categoryValidation = z.object({
  name: z
    .string()
    .min(1, "Name field is required"),

  slug: z
  .string()
  .min(1,"Slug name is required")
});



export const courseValidation = z.object({
  category: z.string().min(1, "Category is required"),

  title: z.string().min(3, "Title must be at least 3 characters"),

  slug: z.string().optional(),

  briefDefinition: z.string().min(10, "Brief definition too short"),

  prerequisite: z.string().optional(),

  keyAreas: z.string().min(1,"this field is required"),
  outcomes: z.string().min(1, "this field is required"),
  jobRoles: z.string().min(1, "this field is required"),
  industries: z.string().min(1,"this field is required"),

  duration: z.string().optional(),

  cost: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : null)),

  paid: z.boolean(),

  thumbnail: z.instanceof(File).optional().nullable(),

  level: z.enum(["beginner", "intermediate", "advanced"]),
});

export const contactValidation = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});



export type ContactValidation = z.infer<typeof contactValidation>;

export type CategoryValidation = z.infer<typeof categoryValidation>;
export type CourseValidation = z.infer<typeof courseValidation>;
