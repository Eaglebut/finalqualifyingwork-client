import {IHttpResponsible} from "../interfaces/IHttpResponsible";

export interface IBackendDao {

    hashPassword(password: string): string

    logIn(email: string, password: string, responsible: IHttpResponsible, hashPass: boolean): void;

    register(email: string, password: string, name: string, surname: string, responsible: IHttpResponsible): void;


}
