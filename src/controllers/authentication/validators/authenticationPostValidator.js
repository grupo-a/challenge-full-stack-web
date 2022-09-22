import zod from 'zod'

export default zod.object(
  {
    email: zod.string().email(),
    password: zod.string()
  },
  {
    message: 'Invalid email or password'
  }
)
