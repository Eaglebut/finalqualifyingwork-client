import {IBackendDao} from "../dao/IBackendDao";

export interface IBackendable {
    backend: IBackendDao;
}