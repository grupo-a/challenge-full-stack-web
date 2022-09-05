import { ServerError } from '../errors/ServerError'
import { HttpResponse } from '../protocols/IHttp'

export const ok = (data: any): HttpResponse => {
  return {
    statusCode: 200,
    body: data,
  }
}

export const created = (data: any): HttpResponse => {
  return {
    statusCode: 201,
    body: data,
  }
}

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error,
  }
}

export const serverError = (): HttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError(),
  }
}
