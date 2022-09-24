export default (zod) =>
  zod
    .object({
      id: zod.string().uuid(),
      name: zod.string().min(3).max(100).optional(),
      email: zod.string().email().optional()
    })
    .strict()
