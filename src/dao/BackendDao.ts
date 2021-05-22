import ILogInResponsible from "../interfaces/ILogInResponsible";
import AuthRequestDto from "../dto/auth/AuthRequestDto";
import AuthResponseDto from "../dto/auth/AuthResponseDto";
import {IBackendDao} from "./IBackendDao";
import {IRegisterResponsible} from "../interfaces/IRegisterResponsible";
import RegisterRequestDto from "../dto/register/RegisterRequestDto";

export default class BackendDao implements IBackendDao {

    private readonly bcrypt;
    private readonly salt;
    private readonly baseUrl;

    constructor() {
        this.bcrypt = require('bcryptjs');
        this.salt = "$2a$10$f0WCVtfflu0hnHkhUgppm.";
        this.baseUrl = "http://192.168.0.110:8080/api/v1/";
    }

    public logIn(email: string, password: string, responsible: ILogInResponsible): void {
        this.bcrypt.hash(password.trim(), this.salt, (err: any, hash: any) => {
            console.log(hash + " " + err);
            const requestDto: AuthRequestDto = new AuthRequestDto(email, hash);
            return this.sendLogInRequest(requestDto, responsible);
        });
    }

    public register(email: string, password: string, name: string, surname: string, response: IRegisterResponsible): void {
        this.bcrypt.hash(password.trim(), this.salt, (err: any, hash: any) => {
            console.log(hash + " " + err);
            const requestDto: RegisterRequestDto = new RegisterRequestDto(email, hash, name, surname);
            return this.sendRegisterRequest(requestDto, response);
        });
    }

    private sendLogInRequest(request: AuthRequestDto, responsible: ILogInResponsible): void {
        let httpRequest: XMLHttpRequest = new XMLHttpRequest();
        let responseDto: AuthResponseDto;
        httpRequest.open("POST", this.baseUrl + "auth/login", true);
        httpRequest.setRequestHeader("Content-Type", "application/json");
        httpRequest.setRequestHeader("Access-Control-Allow-Origin", "*");
        httpRequest.send(JSON.stringify(request))
        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === 4) {
                if (httpRequest.status !== 200) {
                    responsible.onFailed("Неверный логин или пароль");
                } else {
                    responseDto = JSON.parse(httpRequest.response);
                    responsible.onSuccess(responseDto.email, request.password, responseDto.token);
                }
            }
        }
    }


    private sendRegisterRequest(requestDto: RegisterRequestDto, response: IRegisterResponsible) {
        let httpRequest: XMLHttpRequest = new XMLHttpRequest();
        let responseDto: AuthResponseDto;
        httpRequest.open("POST", this.baseUrl + "auth/register", true);
        httpRequest.setRequestHeader("Content-Type", "application/json");
        httpRequest.setRequestHeader("Access-Control-Allow-Origin", "*");
        httpRequest.send(JSON.stringify(requestDto))
        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === 4) {
                if (httpRequest.status !== 200) {
                    response.onFailed("Неверный логин или пароль", httpRequest.status);
                } else {
                    responseDto = JSON.parse(httpRequest.response);
                    response.onSuccess(responseDto.email, requestDto.password);
                }
            }
        }
    }
}