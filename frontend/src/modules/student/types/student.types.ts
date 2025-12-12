export interface Student {
    id: string;
    name: string;
    email: string;
    ra: string;
    cpf: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface StudentFilters {
    page?: number;
    limit?: number;
    search?: string;
}
