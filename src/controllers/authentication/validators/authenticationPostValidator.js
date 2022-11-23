export default (zod) =>
  zod
    .object({
      email: zod.string().email(),
      password: zod.string()
    })
    .strict()
