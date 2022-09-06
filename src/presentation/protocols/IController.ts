import { HttpRequest, HttpResponse } from './IHttp'

export interface IController {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
