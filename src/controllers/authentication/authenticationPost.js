export default (deps) => async (req, res) => {
  const {
    responseOk,
    errorHandler,
    logger,
    databaseCall,
    validator,
    mountRequest,
    compareHash,
    createToken
  } = deps
  try {
    const payload = mountRequest(req)
    validator(payload)
    const user = await databaseCall(payload.email)
    await compareHash(payload.password, user.password)

    const oneHourInMs = Math.floor(Date.now() / 1000) + 60 * 60
    const payloadToken = {
      email: user.email,
      id: user.id,
      type: 'manager',
      exp: oneHourInMs * 24
    }

    const jwtSecret = process.env.JWT_SECRET
    const jwtToken = createToken(payloadToken, jwtSecret)
    responseOk(res, { token: jwtToken, payload: payloadToken })
  } catch (e) {
    logger(e)
    return errorHandler(e, res)
  }
}
