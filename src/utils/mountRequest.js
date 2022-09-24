export default (method) => (req) => {
  const POST = req.body
  const GET = req.query
  const PATCH = { ...req.params, ...req.body }
  const DELETE = req.params
  const MIDDLEWARE_AUTH = req.headers
  const requestPayload = {
    POST,
    GET,
    PATCH,
    DELETE,
    MIDDLEWARE_AUTH
  }

  return requestPayload[method]
}
