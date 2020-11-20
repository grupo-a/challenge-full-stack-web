export class SuccessResponse<T> {
    
    data: T;
    status: number;

    constructor(data: T, status: number){
        this.data = data;
        this.status = status;
    }
}