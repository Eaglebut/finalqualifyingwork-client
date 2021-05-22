import ILogInResponsible from "../interfaces/ILogInResponsible";
import {IRegisterResponsible} from "../interfaces/IRegisterResponsible";

export interface IBackendDao {
    logIn(email: string, password: string, responsible: ILogInResponsible): void;

    //logOut() : void;
    register(email: string, password: string, name: string, surname: string, response: IRegisterResponsible): void;

}
