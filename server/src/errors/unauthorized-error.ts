import { AppErrorHandler } from './app-error-handler'

class UnauthorizedError extends AppErrorHandler {
    constructor(message?: string) {
        super(message ?? 'Unauthorized', 401)
    }
}

export { UnauthorizedError }
