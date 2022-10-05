export enum ERRORS_DESCRIPTION {
  ALREADY_EXIST = 'Already exist',
  INTERNAL_SERVER_ERROR = 'Internal server error',
  NOT_FOUND = 'Not found',
  PAYLOAD_INVALID = 'Payload invalid',
  UNAUTHORIZED = 'Unauthorized',
}

export enum ERRORS_STATUS {
  PAYLOAD_INVALID = 400,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  ALREADY_EXIST = 409,
  INTERNAL_SERVER_ERROR = 500,
}
