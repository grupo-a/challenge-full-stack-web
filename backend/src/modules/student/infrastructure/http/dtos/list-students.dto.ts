import { z } from "zod";
import { paginationSchema } from "@/common/infrastructure/http/dtos/pagination.dto";

export const listStudentsSchema = paginationSchema.extend({
  search: z.string().optional(),
});

export type ListStudentsDTO = z.infer<typeof listStudentsSchema>;
