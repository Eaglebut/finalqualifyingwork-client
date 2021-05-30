import {IHttpResponsible} from "./IHttpResponsible";
import PostGroupDto from "../dto/group/PostGroupDto";
import {CreateTaskDto} from "../dto/task/CreateTaskDto";
import EditTaskDto from "../dto/task/EditTaskDto";

export interface IBackendDao {

    hashPassword(password: string): string

    logIn(email: string, password: string, responsible: IHttpResponsible, hashPass: boolean): void;

    register(email: string, password: string, name: string, surname: string, responsible: IHttpResponsible): void;

    getUser(token: string, response: IHttpResponsible): void;

    getUsersGroups(token: string, response: IHttpResponsible): void;

    createGroup(token: string, dto: PostGroupDto, response: IHttpResponsible): void;

    getGroup(token: string, groupId: number, response: IHttpResponsible): void;

    createTask(token: string, groupId: number, taskGroupId: number, dto: CreateTaskDto, response: IHttpResponsible): void;

    editTask(token: string, taskId: number, groupId: number, taskGroupId: number, dto: EditTaskDto, response: IHttpResponsible): void;

    deleteTask(token: string, taskId: number, groupId: number, taskGroupId: number, response: IHttpResponsible): void
}
