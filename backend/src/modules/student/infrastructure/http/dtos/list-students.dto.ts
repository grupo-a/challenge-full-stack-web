import { z } from "zod";
import { paginationSchema } from "@/common/infrastructure/http/dtos/pagination.dto";

export const listStudentsSchema = paginationSchema.extend({
  name: z.string().optional(),
  email: z.string().optional(),
  ra: z.coerce.number().int().positive().optional(),
});

export type ListStudentsDTO = z.infer<typeof listStudentsSchema>;
