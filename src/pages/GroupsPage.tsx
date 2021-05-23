import React from "react";
import {useHistory} from "react-router-dom";
import CookieUtil from "../util/CookieUtil";

export const GroupsPage: React.FC = () => {

    const cookieUtil = new CookieUtil();

    function checkCookie(history: any) {
        if (cookieUtil.getCookie("token") === "") {
            history.replace("/logIn");
        }
    }

    const history = useHistory();
    checkCookie(history);

    return <div>
        <h1>GroupPage</h1>
    </div>
}

export default GroupsPage;