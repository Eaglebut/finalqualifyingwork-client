import React from "react";
import { useHistory } from "react-router-dom";

export const GroupsPage : React.FC = () => {

    const history = useHistory();
    let token;
    document
        .cookie
        .split(";")
        .map(cookie => {
            if (cookie.includes("token"))
                return cookie.split("=")
                    .map(keyValue => {
                        if (keyValue !== "token"){
                            token = keyValue;
                        }
                        return null;
                    })
            return null;
        });

    console.log(token);
    if (token === undefined){
        history.replace("/logIn");
    }

    return <div>
            <h1>GroupPage</h1>
        </div>
}

export default GroupsPage;