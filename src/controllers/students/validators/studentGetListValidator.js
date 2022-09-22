import zod from 'zod'

export default zod
  .object({
    limit: zod.string().regex(/^\d+$/).optional(),
    skip: zod.string().regex(/^\d+$/).optional()
  })
  .strict()
