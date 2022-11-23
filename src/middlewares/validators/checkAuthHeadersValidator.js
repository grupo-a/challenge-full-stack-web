export default (zod) =>
  zod.object({
    authorization: zod.string().regex(/^Bearer \S+$/)
  })
