import { MessageObject } from "../types/message-object.type";

export class ErrorResponse {

    error: MessageObject; 
    status: number;

    constructor(message: string, status: number) {
        this.error = {message};
        this.status = status;
    }
}