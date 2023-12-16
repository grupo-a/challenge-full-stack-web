import { AppErrorHandler } from './app-error-handler'

class BadRequestError extends AppErrorHandler {
    constructor(message?: string) {
        super(message ?? 'Bad Request', 400)
    }
}

export { BadRequestError }
