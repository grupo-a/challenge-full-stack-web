export default (zod) =>
  zod
    .object({
      limit: zod.string().regex(/^\d+$/).optional(),
      skip: zod.string().regex(/^\d+$/).optional()
    })
    .strict()
