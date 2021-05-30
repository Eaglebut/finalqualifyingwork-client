import React, {useState} from "react";
import {IBackendable} from "../../../interfaces/IBackendable";
import Task from "../../../model/Task";
import {makeStyles} from "@material-ui/core/styles";
import {Grid, IconButton, Paper, Typography, Zoom} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {TaskInput} from "./TaskInput";
import {getCookie} from "../../../util/CookieUtil";
import EditTaskDto from "../../../dto/task/EditTaskDto";
import {IHttpResponsible} from "../../../interfaces/IHttpResponsible";

const useStyles = makeStyles((theme) => ({
    grid: {},
    div: {
        padding: "5px"
    },

    name: {
        fontSize: "16px",
        overflowWrap: "break-word",
    },
    text: {
        fontSize: "14px",
        overflowWrap: "break-word",

    },
    gridWithButtons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },

    buttons: {
        display: "flex",
    },
    iconGrid: {
        display: "flex",
        flexDirection: "column",
    },
    icon: {
        fontSize: "14px"
    },
    textItem: {},
    textContainer: {
        display: "flex",
        flexDirection: "column"
    },
    inputGrid: {
        display: "flex",
        alignItems: "stretch",
        flexDirection: "column"
    },
}));


interface ITaskElement extends IBackendable {
    task: Task;
    groupId: number;
    taskGroupId: number;
    position: number;

    setTaskList(taskList: Array<Task>): void;
}

function chunkString(str: string, length: number) {
    return str.match(new RegExp('.{1,' + length + '}', 'g'));
}

export const TaskElement: React.FC<ITaskElement> = (props) => {

    const classes = useStyles();
    const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const chunkedName = chunkString(props.task.name, isMouseOver ? 16 : 21);
    const chunkedText = chunkString(props.task.text, isMouseOver ? 16 : 21);

    const onCancelClick = () => {
        setIsEdit(false);
    }

    const onSaveClick = (name: string, text: string) => {
        props.backend.editTask(
            getCookie("token"),
            props.task.taskId,
            props.groupId,
            props.taskGroupId,
            new EditTaskDto(name, text, props.position, props.taskGroupId),
            new class implements IHttpResponsible {
                onResponse(code: number, response: any) {
                    if (code === 200) {
                        props.setTaskList(Task.fromJsonArray(JSON.parse(response)));
                    } else alert(code + " " + response);
                }
            }()
        )
        setIsEdit(false);
    }

    const onDeleteClick = () => {
        props.backend.deleteTask(
            getCookie("token"),
            props.task.taskId,
            props.groupId,
            props.taskGroupId,
            new class implements IHttpResponsible {
                onResponse(code: number, response: any) {
                    if (code === 200) {
                        props.setTaskList(Task.fromJsonArray(JSON.parse(response)));
                    } else alert(code + " " + response);
                }
            }()
        )
    }

    return (
        <Grid
            className={classes.grid}
            item
            key={props.task.taskId}
            onMouseOver={event => setIsMouseOver(true)}
            onMouseLeave={event => setIsMouseOver(false)}
        >
            <Paper variant={"elevation"}
                   className={classes.div}
            >
                <Grid container className={classes.gridWithButtons}
                >
                    <Grid item className={classes.textItem}>
                        <Grid container className={classes.textContainer}
                        >
                            {!isEdit && chunkedName?.map(value => {
                                return (<Typography className={classes.name}>
                                    {value}
                                </Typography>)
                            })}
                            {!isEdit && chunkedText?.map(value => {
                                return (<Typography className={classes.text}>
                                    {value}
                                </Typography>)
                            })}

                            {isEdit && <TaskInput
                                name={props.task.name}
                                text={props.task.text}
                                onCancelClick={onCancelClick}
                                onSaveClick={onSaveClick}
                            />}
                        </Grid>
                    </Grid>
                    {!isEdit && isMouseOver &&
                    <Grid item className={classes.grid}
                    >
                        <Zoom in={isMouseOver}>
                            <Grid container className={classes.iconGrid}>
                                <IconButton
                                    onClick={() => setIsEdit(true)}
                                >
                                    <EditIcon className={classes.icon}/>
                                </IconButton>
                                <IconButton
                                    onClick={onDeleteClick}
                                >
                                    <DeleteIcon className={classes.icon}/>
                                </IconButton>
                            </Grid>
                        </Zoom>
                    </Grid>
                    }
                </Grid>
            </Paper>
        </Grid>
    );
}

