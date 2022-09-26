export class CustomError extends Error {
  constructor(name, field, message) {
    super(message)
    this.name = name
    this.field = field
  }
}

export const errorHandler = (restResponses) => {
  const {
    responseForbidden,
    responseBadRequest,
    notFound,
    responseUnauthorized,
    responseInternalServerError
  } = restResponses
  const QueryFailedError = (e, res) => {
    const path = e.detail.match(/Key \((\w+)\)=/)[1]
    const error = [
      {
        code: e.name,
        path: [path],
        message: e.detail
      }
    ]
    return responseForbidden(error, res)
  }

  const ZodError = (e, res) => {
    const error = e.errors.map((err) => {
      return {
        code: err.code,
        path: err.path.length ? err.path : err.keys,
        message: err.message
      }
    })
    return responseBadRequest(error, res)
  }

  const NotFound = (e, res) => {
    const error = [
      {
        code: e.name,
        path: [e.field],
        message: e.message
      }
    ]
    return notFound(error, res)
  }

  const Forbidden = (e, res) => {
    const error = [
      {
        code: e.name,
        path: [e.field],
        message: e.message
      }
    ]
    return responseForbidden(error, res)
  }

  const Unauthorized = (e, res) => {
    const error = [
      {
        code: e.name,
        path: [e.field || 'token'],
        message: e.message
      }
    ]
    return responseUnauthorized(error, res)
  }

  const NotImplementedError = (e, res) => {
    const error = [
      {
        code: 'NotImplementedError',
        path: [],
        message: e.message
      }
    ]
    return responseInternalServerError(error, res)
  }

  const errors = {
    QueryFailedError,
    ZodError,
    NotFound,
    Forbidden,
    Unauthorized,
    JsonWebTokenError: Unauthorized,
    NotImplementedError
  }

  return (e, res) => (errors[e.name] ? errors[e.name](e, res) : errors.NotImplementedError(e, res))
}
