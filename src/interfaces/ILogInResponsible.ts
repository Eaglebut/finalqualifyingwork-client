
export default interface ILogInResponsible {
    onSuccess(email: string, password: string, token: string): void;
    onFailed(message: string): void;
}