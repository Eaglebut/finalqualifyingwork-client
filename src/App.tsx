import React from 'react';
import LogInPage from "./pages/LogInPage";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import ILogInResponsible from "./interfaces/ILogInResponsible";
import AuthRequestDto from "./dto/auth/AuthRequestDto";
import AuthResponseDto from "./dto/auth/AuthResponseDto";
import GroupsPage from "./pages/GroupsPage";


function App() {

    const bcrypt = require('bcryptjs');
    const salt = "$2a$10$f0WCVtfflu0hnHkhUgppm.";

    const url = "http://192.168.0.110:8080/api/v1/auth/login";


    function tryLogIn(email: string, password: string, responsible: ILogInResponsible): void {
        bcrypt.hash(password, salt, function (err: any, hash: any) {
            console.log(hash + " " + err);
            const requestDto: AuthRequestDto = new AuthRequestDto(email, hash);
            return sendLogInRequest(requestDto, responsible);
        });
    }

    function sendLogInRequest(request: AuthRequestDto, responsible: ILogInResponsible): void {
        let httpRequest: XMLHttpRequest = new XMLHttpRequest();
        let responseDto: AuthResponseDto;
        httpRequest.open("POST", url, true);
        httpRequest.setRequestHeader("Content-Type", "application/json");
        httpRequest.setRequestHeader("Access-Control-Allow-Origin", "*");
        httpRequest.send(JSON.stringify(request))
        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === 4) {
                if (httpRequest.status !== 200) {
                    responsible.onFailed("Неверный логин или пароль");
                }
                else {
                    responseDto = JSON.parse(httpRequest.response);
                    responsible.onSuccess(responseDto.email, request.password, responseDto.token);
                }
            }
        }
    }

    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/logIn" exact>
                        <LogInPage logIn={tryLogIn}/>
                    </Route>
                    <Route path="/registration" exact>
                        <RegisterPage/>
                    </Route>
                    <Route path="/" exact>
                    <GroupsPage/>
                </Route>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
