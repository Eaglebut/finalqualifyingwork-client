import React, {useEffect, useState} from "react";
import {IBackendable} from "../interfaces/IBackendable";
import {MainAppBar} from "../elements/appbar/MainAppBar";
import Group from "../model/Group";
import {useHistory, useParams} from "react-router-dom";
import {getCookie} from "../util/CookieUtil";
import {IHttpResponsible} from "../interfaces/IHttpResponsible";
import {TaskGroupContainer} from "../elements/group_page/task_group/TaskGroupContainer";
import TaskGroup from "../model/TaskGroup";

class GroupId {
    public groupId: string;

    constructor(groupId: string) {
        this.groupId = groupId;
    }
}

export const GroupPage: React.FC<IBackendable> = (props) => {
    const [group, setGroup] = useState<Group>();

    const history = useHistory();
    const {groupId} = useParams<GroupId>();


    useEffect(() => {
        props.backend.getGroup(getCookie("token"), Number.parseInt(groupId), new class implements IHttpResponsible {
            onResponse(code: number, response: any) {
                if (code === 200) {
                    setGroup(Group.fromJSON(JSON.parse(response)));
                }
            }
        }())
    }, []);

    const onBackClick = () => {
        history.goBack();
    }

    return (
        <div>
            <MainAppBar
                backend={props.backend}
                title={group === undefined ? "" : group.name}
                backButtonVisibility={true}
                onBackButtonClick={onBackClick}
            />
            <TaskGroupContainer
                groupId={group === undefined ? 0 : group.groupId}
                backend={props.backend}
                taskGroup={group === undefined ? new Array<TaskGroup>() : group.taskGroups}
                //setGroup={setGroup}
            />
        </div>
    );
}