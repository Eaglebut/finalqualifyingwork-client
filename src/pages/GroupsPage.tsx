import React from "react";
import {useHistory} from "react-router-dom";
import {MainAppBar} from "../elements/appbar/MainAppBar";
import {IBackendable} from "../interfaces/IBackendable";
import {getCookie} from "../util/CookieUtil";
import {GroupList} from "../elements/group_list_page/GroupList";

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
        <GroupList backend={props.backend}/>
    </div>);
}

export default GroupsPage;