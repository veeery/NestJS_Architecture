export interface AuthSuccess<T> {
    data: T;
    token: string;
    refreshToken?: string;
}
export interface SuccessResponse<T> {
    data: T;
    message?: string;
}
