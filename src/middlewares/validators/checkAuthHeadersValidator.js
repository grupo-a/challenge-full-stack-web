import zod from 'zod'

export default zod.object({
  authorization: zod.string().regex(/^Bearer \S+$/)
})
