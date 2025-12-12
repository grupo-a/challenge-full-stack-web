export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export interface ValidationError {
    field: string;
    message: string;
}

export interface ApiError {
    message: string;
    statusCode: number;
    errors?: ValidationError[] | Record<string, string[]>;
}

export interface PaginationParams {
    page?: number;
    limit?: number;
}
