export interface IHttpResponsible {
    onResponse(code: number, response: any): void
}
