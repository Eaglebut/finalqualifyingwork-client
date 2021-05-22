import ILogInResponsible from "./ILogInResponsible";

export default interface ILogIn {
    logIn(email: string, password: string, responsible: ILogInResponsible): void;
}