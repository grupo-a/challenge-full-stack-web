export class ServerError extends Error {
  constructor (stack = '') {
    super('Internal Server Error')
    this.name = 'ServerError'
    this.stack = stack
  }
}
