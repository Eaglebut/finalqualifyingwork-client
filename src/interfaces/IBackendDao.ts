import {IHttpResponsible} from "./IHttpResponsible";

export interface IBackendDao {

    hashPassword(password: string): string

    logIn(email: string, password: string, responsible: IHttpResponsible, hashPass: boolean): void;

    register(email: string, password: string, name: string, surname: string, responsible: IHttpResponsible): void;

    getUser(token: string, response: IHttpResponsible): void;

    getUsersGroups(token: string, response: IHttpResponsible): void;
}
