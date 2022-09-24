import zod from 'zod'
import { isValidCPF } from '../../../utils/validations.js'

export default zod
  .object({
    name: zod.string().min(3).max(100),
    email: zod.string().email(),
    ra: zod.string().min(3).max(100),
    cpf: zod
      .string()
      .length(11)
      .refine(isValidCPF, (value) => ({
        message: `Invalid CPF: ${value}`
      }))
  })
  .strict()
