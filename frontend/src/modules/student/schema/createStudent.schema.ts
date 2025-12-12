import { z } from 'zod';

export const createStudentSchema = z.object({
    name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
    email: z.string().email('Email inválido'),
    cpf: z.string()
});

export type createStudentSchemaType = z.infer<typeof createStudentSchema>;
