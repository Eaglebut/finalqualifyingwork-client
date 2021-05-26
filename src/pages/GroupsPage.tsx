import React from "react";
import {useHistory} from "react-router-dom";
import {MainAppBar} from "../elements/MainAppBar";
import {IBackendable} from "../interfaces/IBackendable";
import {getCookie} from "../util/CookieUtil";
import {GroupElement} from "../elements/GroupElement";

export const GroupsPage: React.FC<IBackendable> = (props) => {


    function checkCookie(history: any) {
        if (getCookie("token") === "") {
            history.replace("/logIn");
        }
    }

    const history = useHistory();
    checkCookie(history);

    return (<div>
        <MainAppBar backend={props.backend}/>
        <GroupElement backend={props.backend}/>
    </div>);
}

export default GroupsPage;