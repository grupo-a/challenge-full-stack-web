import type { ApiError } from '../types/common.types';

interface ValidationError {
    field: string;
    message: string;
}

export function formatApiValidationErrors(
    error: unknown
): Record<string, string[]> | null {
    const apiError = error as ApiError;

    if (apiError.statusCode === 422 && apiError.errors) {
        const formattedErrors: Record<string, string[]> = {};

        if (Array.isArray(apiError.errors)) {
            (apiError.errors as ValidationError[]).forEach(
                ({ field, message }) => {
                    if (!formattedErrors[field]) {
                        formattedErrors[field] = [];
                    }
                    formattedErrors[field].push(message);
                }
            );

            return formattedErrors;
        }

        return formattedErrors;
    }

    return null;
}
