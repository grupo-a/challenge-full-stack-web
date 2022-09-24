export default (zod) =>
  zod
    .object({
      id: zod.string().uuid()
    })
    .strict()
