import React, {useState} from "react";
import {Grid, IconButton, Paper, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import {Save} from "@material-ui/icons";
import CancelIcon from '@material-ui/icons/Cancel';
import {IBackendable} from "../../../interfaces/IBackendable";
import {getCookie} from "../../../util/CookieUtil";
import {IHttpResponsible} from "../../../interfaces/IHttpResponsible";
import {CreateTaskDto} from "../../../dto/task/CreateTaskDto";
import Task from "../../../model/Task";


const useStyles = makeStyles((theme) => ({
    grid: {},
    div: {
        margin: "10px",
        padding: "10px",
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
    taskGroupId: number;

    onClick(): void;

    setTaskList(taskList: Array<Task>): void;
}

export const AddTaskElement: React.FC<IAddTaskElement> = (props) => {

    const [createMode, setCreateMode] = useState<boolean>(false)

    return (createMode
            ? <CreateTaskModeElement
                setCreateMode={setCreateMode}
                backend={props.backend}
                groupId={props.groupId}
                taskGroupId={props.taskGroupId}
                setTaskList={props.setTaskList}
            />
            : <ButtonModeElement setCreateMode={setCreateMode}/>
    );
}

interface IButton {
    setCreateMode(createMode: boolean): void;
}

const ButtonModeElement: React.FC<IButton> = (props) => {
    const classes = useStyles();
    const onClick = () => {
        props.setCreateMode(true);
    }
    return (
        <Paper className={classes.div} onClick={onClick}>
            <Grid item className={classes.grid} key={"addCard"}>
                <Grid container className={classes.textGrid}>
                    <AddIcon className={classes.text}/>
                    <Typography className={classes.text}> Добавить задачу</Typography>
                </Grid>
            </Grid>
        </Paper>
    );
}


interface ICreateTask extends IBackendable, IButton {
    groupId: number;
    taskGroupId: number;

    setTaskList(taskList: Array<Task>): void;
}

const CreateTaskModeElement: React.FC<ICreateTask> = (props) => {

    const [taskName, setTaskName] = useState<string>("");
    const [taskText, setTaskText] = useState<string>("");

    const classes = useStyles();
    const onSaveClick = () => {
        props.backend.createTask(
            getCookie("token"),
            props.groupId,
            props.taskGroupId,
            new CreateTaskDto(taskName, taskText, -1),
            new class implements IHttpResponsible {
                onResponse(code: number, response: any) {
                    if (code === 200) {
                        props.setTaskList(Task.fromJsonArray(JSON.parse(response)));
                    } else alert(code + " " + response);
                }
            }());
        props.setCreateMode(false);
    }

    const onCancelClick = () => {
        props.setCreateMode(false);
    }

    return (
        <Paper className={classes.div}>
            <Grid item className={classes.grid} key={"addCard"}>
                <Grid container className={classes.inputGrid}>
                    <Grid item>
                        <TextField
                            size={"small"}
                            label={"Название задачи"}
                            onChange={event => setTaskName(event.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            size={"small"}
                            label={"Описание задачи"}
                            multiline
                            onChange={event => setTaskText(event.target.value)}
                        />

                    </Grid>
                    <Grid item>
                        <Grid container className={classes.iconGrid}>
                            <Grid item>
                                <IconButton onClick={onCancelClick}>
                                    <CancelIcon className={classes.icon}/>
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <IconButton onClick={onSaveClick}>
                                    <Save className={classes.icon}/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>

    );
}