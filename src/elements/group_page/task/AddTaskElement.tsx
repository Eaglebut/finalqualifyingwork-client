import React, {useState} from "react";
import {Grid, Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import {IBackendable} from "../../../interfaces/IBackendable";
import {getCookie} from "../../../util/CookieUtil";
import {IHttpResponsible} from "../../../interfaces/IHttpResponsible";
import {CreateTaskDto} from "../../../dto/task/CreateTaskDto";
import Task from "../../../model/Task";
import {TaskInput} from "./TaskInput";
import TaskGroup from "../../../model/TaskGroup";


const useStyles = makeStyles(() => ({
    grid: {},
    div: {
        padding: "10px",
        cursor: "pointer",
    },
    textGrid: {
        display: "flex",
        alignItems: "center",
    },
    inputGrid: {
        display: "flex",
        alignItems: "stretch",
        flexDirection: "column"
    },
    icon: {
        fontSize: "17px",
    },
    text: {
        fontSize: "13px"
    },
    textField: {
        fontSize: "13px"
    },
    iconGrid: {
        display: "flex",
        justifyContent: "flex-end",
    },
    border: {
        border: "1px solid black"
    }
}));

interface IAddTaskElement extends IBackendable {
    groupId: number;
    taskGroup: TaskGroup;

    setTaskList(taskList: Array<Task>, taskGroup: TaskGroup): void
}

export const AddTaskElement: React.FC<IAddTaskElement> = (props) => {

    const [createMode, setCreateMode] = useState<boolean>(false)

    const classes = useStyles();

    const onCancelClick = () => {
        setCreateMode(false);
    }

    const onSaveClick = (name: string, text: string) => {
        props.backend.createTask(
            getCookie("token"),
            props.groupId,
            props.taskGroup.taskGroupId,
            new CreateTaskDto(name, text, -1),
            new class implements IHttpResponsible {
                onResponse(code: number, response: any) {
                    if (code === 200) {
                        props.setTaskList(Task.fromJsonArray(JSON.parse(response)), props.taskGroup);
                    } else alert(code + " " + response);
                }
            }());
        setCreateMode(false);
    }

    return (createMode
            ? <TaskInput
                onCancelClick={onCancelClick}
                onSaveClick={onSaveClick}
                name={""}
                text={""}
            />
            :
            <Paper className={classes.div} onClick={() => setCreateMode(true)}>
                <Grid item className={classes.grid} key={"addCard"}>
                    <Grid container className={classes.textGrid}>
                        <AddIcon className={classes.text}/>
                        <Typography className={classes.text}> ???????????????? ????????????</Typography>
                    </Grid>
                </Grid>
            </Paper>
    );
}
