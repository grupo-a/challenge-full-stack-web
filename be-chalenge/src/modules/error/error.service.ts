import { Response } from "express";
import { HTTP_STATUS } from "../../enum/http-status.enum";
import { ErrorResponse } from "../../response/error-response";

export class ErrorService {
    static handle(res: Response, error: any) {
        if (error instanceof ErrorResponse) {
            return res.status(error.status).send(error);
        }

        const generic = new ErrorResponse(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);

        return res.status(generic.status).send(generic);
    }
}