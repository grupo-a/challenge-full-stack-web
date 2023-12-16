class AppErrorHandler extends Error {
    public readonly statusCode: number
    constructor(message: string, statusCode: number) {
        super(message)
        this.name = 'AppErrorHandler'
        this.statusCode = statusCode
    }
}

export { AppErrorHandler }
