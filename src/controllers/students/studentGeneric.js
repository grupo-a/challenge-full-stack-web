export default (Deps) => {
  const { responseOk, errorHandler, logger, databaseCall, validator, mountRequest } = Deps
  return async (req, res) => {
    try {
      const payload = mountRequest(req)
      validator(payload)
      const response = await databaseCall(payload)
      return responseOk(res, response)
    } catch (e) {
      logger(e)
      return errorHandler(e, res)
    }
  }
}
