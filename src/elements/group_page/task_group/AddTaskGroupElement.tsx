import React, {useState} from "react";
import {Grid, Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import {TaskGroupInput} from "./TaskGroupInput";
import {IBackendable} from "../../../interfaces/IBackendable";
import TaskGroup from "../../../model/TaskGroup";
import {getCookie} from "../../../util/CookieUtil";
import CreateTaskGroupDto from "../../../dto/task_group/CreateTaskGroupDto";
import {IHttpResponsible} from "../../../interfaces/IHttpResponsible";


const useStyles = makeStyles(() => ({

    grid: {
        cursor: "pointer",
    },
    div: {
        padding: "20px",
    },
    text: {
        fontSize: "14px",
    },
    textGrid: {
        display: "flex",
        alignItems: "center",
        flexWrap: "nowrap",
    },
}));

interface IAddTaskGroupElement extends IBackendable {
    groupId: number;

    setTaskGroupList(taskGroupList: Array<TaskGroup>): void;
}

export const AddTaskGroupElement: React.FC<IAddTaskGroupElement> = (props) => {

    const [isCreate, setIsCreate] = useState<boolean>(false);

    const classes = useStyles();

    const onSaveClick = (name: string) => {
        props.backend.createTaskGroup(
            getCookie("token"),
            props.groupId,
            new CreateTaskGroupDto(name, -1),
            new class implements IHttpResponsible {
                onResponse(code: number, response: any) {
                    if (code === 200) {
                        props.setTaskGroupList(TaskGroup.fromJsonArray(JSON.parse(response)));
                        setIsCreate(false);
                    } else {
                        alert(code + " " + response);
                    }
                }
            }()
        )
    }

    const onCancelClick = () => {
        setIsCreate(false);
    }

    return (

        <Paper
            className={classes.div}
        >
            {isCreate
                ?
                <TaskGroupInput
                    name={""}
                    onSaveClick={onSaveClick}
                    onCancelClick={onCancelClick}
                />
                :
                <Grid className={classes.grid}
                      item key={"addCard"}
                      onClick={() => setIsCreate(true)}
                >
                    <Grid container className={classes.textGrid}>
                        <AddIcon className={classes.text}/>
                        <Typography className={classes.text}>
                            Добавить группу задач
                        </Typography>
                    </Grid>
                </Grid>
            }
        </Paper>
    );

}