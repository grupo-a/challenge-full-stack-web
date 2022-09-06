export interface HttpRequest {
  body?: any
  query?: any
  params?: any
}

export interface HttpResponse {
  statusCode: number
  body: any
}
