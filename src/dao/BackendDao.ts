import AuthRequestDto from "../dto/auth/AuthRequestDto";
import {IBackendDao} from "../interfaces/IBackendDao";
import RegisterRequestDto from "../dto/register/RegisterRequestDto";
import {IHttpResponsible} from "../interfaces/IHttpResponsible";
import PostGroupDto from "../dto/group/PostGroupDto";


export default class BackendDao implements IBackendDao {

    private readonly bcrypt;
    private readonly salt;
    private readonly baseUrl;

    constructor() {
        this.bcrypt = require('bcryptjs');
        this.salt = "$2a$10$f0WCVtfflu0hnHkhUgppm.";
        this.baseUrl = "http://192.168.0.110:8080/api/v1/";
    }

    public hashPassword(password: string): string {
        return this.bcrypt.hashSync(password, this.salt);
    }

    public logIn(email: string, password: string, responsible: IHttpResponsible, hashPass: boolean): void {
        if (hashPass) {
            this.bcrypt.hash(password.trim(), this.salt, (err: any, hash: any) => {
                console.log(hash + " " + err);
                const requestDto: AuthRequestDto = new AuthRequestDto(email, hash);
                return this.sendRequest("POST", "auth/login", requestDto, responsible, null);
            });
        } else {
            const requestDto: AuthRequestDto = new AuthRequestDto(email, password);
            return this.sendRequest("POST", "auth/login", requestDto, responsible, null);
        }

    }

    public register(email: string, password: string, name: string, surname: string, responsible: IHttpResponsible): void {
        this.bcrypt.hash(password.trim(), this.salt, (err: any, hash: any) => {
            console.log(hash + " " + err);
            const requestDto: RegisterRequestDto = new RegisterRequestDto(email, hash, name, surname);
            return this.sendRequest("POST", "auth/login", requestDto, responsible, null);
        });
    }

    public getUser(token: string, response: IHttpResponsible): void {
        this.sendRequest("GET", "user", null, response, token);
    }

    getUsersGroups(token: string, response: IHttpResponsible): void {
        this.sendRequest("GET", "group", null, response, token);
    }

    createGroup(token: string, dto: PostGroupDto, response: IHttpResponsible): void {
        this.sendRequest("POST", "group", dto, response, token);
    }

    private sendRequest(method: string, path: string, requestDto: any, response: IHttpResponsible, token: string | null) {
        let httpRequest: XMLHttpRequest = new XMLHttpRequest();
        httpRequest.open(method, this.baseUrl + path, true);
        httpRequest.setRequestHeader("Content-Type", "application/json");
        httpRequest.setRequestHeader("Access-Control-Allow-Origin", "*");
        if (token !== null)
            httpRequest.setRequestHeader("Authorization", token);
        httpRequest.send(JSON.stringify(requestDto))
        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === 4) {
                console.log("method : " + method
                    + " token: " + token
                    + " path: " + path
                    + " requestDto: " + requestDto
                    + " response: " + httpRequest.response);
                response.onResponse(httpRequest.status, httpRequest.response);
            }
        }
    }

}