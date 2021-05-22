export interface IRegisterResponsible {
    onSuccess(email: string, password: string): void;

    onFailed(message: string, code: number): void;
}