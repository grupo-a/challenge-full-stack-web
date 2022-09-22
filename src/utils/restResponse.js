//import errorHandler from './errorHandler'

export const responseOk = (res, data) => {
  res.status(200).send(data)
}

export const responseCreated = (res, data) => {
  res.status(201).send(data)
}
export const noContent = (res) => {
  res.status(204).send()
}
export const notFound = (res, customError) => {
  res.status(404).send({ message: customError ? customError : 'notFound' })
}
export const responseUnauthorized = (res, customError) => {
  res.status(401).send({ message: customError ? customError : 'Unauthorized' })
}
export const responseForbidden = (res, customError) => {
  res.status(403).send({ message: customError ? customError : 'Forbidden' })
}

export const responseBadRequest = (res, customError) => {
  res.status(400).send({ message: customError ? customError : 'Bad request' })
}

export const responseInternalServerError = (res, customError) => {
  res
    .status(500)
    .send({ message: customError ? customError : 'Internal error' })
}
