import { IHttpResponse, IHttpRequest } from '@/presentation/protocols/http'

export interface IController {
  handle: (httpRequest: IHttpRequest) => Promise<IHttpResponse>
}
