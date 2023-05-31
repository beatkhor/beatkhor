export interface CustomResponse<T> {
    code: number;
    ok: boolean;
    result: T;
}

export interface PaginatedResponse<T> {
    result: T;
    ok: boolean;
    code: number;
    page: number;
    total: number;
    page_size: number;
}