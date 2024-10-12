export interface ResponseApi<T> {
    data: T,
    success: boolean,
    message: string
}

export interface ResponseLoginApi {
    token: {
        data: string
        success: boolean,
        message: string
    }

}