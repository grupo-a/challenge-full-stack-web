import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
    password: z
        .string()
        .min(1, 'Senha é obrigatória')
        .min(6, 'Senha deve ter no mínimo 6 caracteres')
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
