import { HttpStatusCode } from "@helpers/httpStatusCode"

class HttpError extends Error {
	status: number
	message: string

	constructor(status: number, message: string) {
		super(message)

		this.status = status
		this.message = message
	}

	static badRequest(message: string) {
		return new HttpError(
			HttpStatusCode.BAD_REQUEST,
			message || "Bad Request",
		)
	}

	static notFound(message: string) {
		return new HttpError(HttpStatusCode.NOT_FOUND, message || "Not Found")
	}

	static forbidden(message: string) {
		return new HttpError(HttpStatusCode.FORBIDDEN, message || "Forbidden")
	}

	static unauthorized(message?: string) {
		return new HttpError(
			HttpStatusCode.UNAUTHORIZED,
			message || "Unauthorized",
		)
	}
}

export default HttpError
