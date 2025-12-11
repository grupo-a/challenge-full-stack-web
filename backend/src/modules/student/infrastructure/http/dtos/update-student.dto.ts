import { z } from "zod";

export const updateStudentSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long").optional(),
  email: z.string().email("Invalid email format").optional(),
});

export type UpdateStudentDTO = z.infer<typeof updateStudentSchema>;
