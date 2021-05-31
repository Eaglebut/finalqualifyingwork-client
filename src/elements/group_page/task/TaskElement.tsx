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
import {Draggable} from "react-beautiful-dnd";
import TaskGroup from "../../../model/TaskGroup";

const useStyles = makeStyles(() => ({
    grid: {
        alignSelf: "center",
    },
    div: {
        padding: "5px"
    },

    name: {
        fontSize: "16px",
        overflowWrap: "break-word",
        wordWrap: "break-word",
        wordBreak: "break-word",
    },
    text: {
        fontSize: "14px",
        overflowWrap: "break-word",
        wordWrap: "break-word",
        wordBreak: "break-word",
    },
    gridWithButtons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "nowrap"
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
    taskGroup: TaskGroup;
    position: number;

    setTaskList(taskList: Array<Task>, taskGroup: TaskGroup): void
}


export const TaskElement: React.FC<ITaskElement> = (props) => {

    const classes = useStyles();
    const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const onCancelClick = () => {
        setIsEdit(false);
    }

    const onSaveClick = (name: string, text: string) => {
        props.backend.editTask(
            getCookie("token"),
            props.task.taskId,
            props.groupId,
            props.taskGroup.taskGroupId,
            new EditTaskDto(name, text, props.position, props.taskGroup.taskGroupId),
            new class implements IHttpResponsible {
                onResponse(code: number, response: any) {
                    if (code === 200) {
                        props.setTaskList(Task.fromJsonArray(JSON.parse(response)), props.taskGroup);
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
            props.taskGroup.taskGroupId,
            new class implements IHttpResponsible {
                onResponse(code: number, response: any) {
                    if (code === 200) {
                        props.setTaskList(Task.fromJsonArray(JSON.parse(response)), props.taskGroup);
                    } else alert(code + " " + response);
                }
            }()
        )
    }

    return (
        <Draggable
            draggableId={"" + props.task.taskId}
            key={"" + props.task.taskId}
            index={props.position}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Grid
                        className={classes.grid}
                        item
                        key={props.task.taskId}
                        onMouseOver={() => setIsMouseOver(true)}
                        onMouseLeave={() => setIsMouseOver(false)}
                    >

                        <Paper variant={"elevation"}
                               className={classes.div}
                        >
                            <Grid container className={classes.gridWithButtons}
                            >
                                <Grid item className={classes.textItem}>
                                    <Grid container className={classes.textContainer}
                                    >
                                        {!isEdit && <Typography className={classes.name}>
                                            {props.task.name}
                                        </Typography>
                                        }
                                        {!isEdit && <Typography className={classes.text}>
                                            {props.task.text}
                                        </Typography>}

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
                </div>)}
        </Draggable>
    );
}

