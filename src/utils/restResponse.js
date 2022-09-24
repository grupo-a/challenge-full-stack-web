export const responseOk = (res, data) => {
  res.status(200).send(data)
}

export const notFound = (error, res) => {
  res.status(404).send(error)
}

export const responseUnauthorized = (error, res) => {
  res.status(401).send(error)
}

export const responseForbidden = (error, res) => {
  res.status(403).send(error)
}

export const responseBadRequest = (error, res) => {
  res.status(400).send(error)
}

export const responseInternalServerError = (error, res) => {
  res.status(500).send(error)
}
