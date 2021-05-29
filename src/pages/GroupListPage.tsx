import React from "react";
import {useHistory} from "react-router-dom";
import {MainAppBar} from "../elements/appbar/MainAppBar";
import {IBackendable} from "../interfaces/IBackendable";
import {getCookie} from "../util/CookieUtil";
import {GroupList} from "../elements/group_list_page/GroupList";

export const GroupListPage: React.FC<IBackendable> = (props) => {

    //const [open, setOpen] = useState<boolean>(false);

    function checkCookie(history: any) {
        if (getCookie("token") === "") {
            history.replace("/logIn");
        }
    }

    const history = useHistory();
    checkCookie(history);

    return (
        <div>
            <MainAppBar backend={props.backend} title={"Groups"} backButtonVisibility={false} onBackButtonClick={() => {
            }}/>
            <GroupList backend={props.backend}/>
        </div>
    );
}

export default GroupListPage;

/*
<Modal
    open={open}
>
    <Fade in={open}>
        <Paper> test </Paper>
    </Fade>
</Modal>
*/