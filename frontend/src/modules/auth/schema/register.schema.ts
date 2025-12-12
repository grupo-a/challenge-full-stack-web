import { z } from 'zod';

export const registerSchema = z
    .object({
        email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
        password: z
            .string()
            .min(1, 'Senha é obrigatória')
            .min(6, 'Senha deve ter no mínimo 6 caracteres'),
        confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória')
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'As senhas não coincidem',
        path: ['confirmPassword']
    });

export type RegisterSchemaType = z.infer<typeof registerSchema>;
