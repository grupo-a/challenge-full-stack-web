import { AppErrorHandler } from './app-error-handler'

class NotFoundError extends AppErrorHandler {
    constructor(message?: string) {
        super(message ?? 'Not Found', 404)
    }
}

export { NotFoundError }
