import { z } from "zod";

export const createcreateStudentSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email format"),
  cpf: z.string().min(11, "CPF must have at least 11 digits"),
});

export type CreateStudentDTO = z.infer<typeof createcreateStudentSchema>;
