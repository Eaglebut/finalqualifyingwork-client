import React, {useState} from "react";
import {IBackendable} from "../../../interfaces/IBackendable";
import TaskGroup from "../../../model/TaskGroup";
import {Grid, IconButton, Paper, Typography, Zoom} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {TaskElement} from "../task/TaskElement";
import {AddTaskElement} from "../task/AddTaskElement";
import Task from "../../../model/Task";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {TaskGroupInput} from "./TaskGroupInput";
import {getCookie} from "../../../util/CookieUtil";
import EditTaskGroupDto from "../../../dto/task_group/EditTaskGroupDto";
import {IHttpResponsible} from "../../../interfaces/IHttpResponsible";

const useStyles = makeStyles(() => ({

    titleGrid: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "5px",
        alignItems: "center",
        minHeight: "50px",
        flexWrap: "nowrap"
    },
    grid: {
        display: "flex",
        flexDirection: "column",
    },
    div: {
        padding: "15px",
    },
    name: {
        fontSize: "16px",
        overflowWrap: "break-word",
        wordWrap: "break-word",
        wordBreak: "break-word",
    },
    icon: {
        fontSize: "14px",
    },

}));

interface ITaskGroupElement extends IBackendable {
    taskGroup: TaskGroup;
    groupId: number;
    position: number;

    setTaskGroupList(taskGroupList: Array<TaskGroup>): void;
}

export const TaskGroupElement: React.FC<ITaskGroupElement> = (props) => {
    const classes = useStyles();

    const [taskGroup, setTaskGroup] = useState<TaskGroup>(props.taskGroup);
    const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);


    const setTaskList = (taskList: Array<Task>) => {
        setTaskGroup(prevState => {
            return new TaskGroup(prevState.taskGroupId, prevState.name, taskList, prevState.position);
        })
    }

    const onCancelClick = () => {
        setIsEdit(false);
    }

    const onSaveClick = (name: string) => {
        props.backend.editTaskGroup(
            getCookie("token"),
            props.groupId,
            taskGroup.taskGroupId,
            new EditTaskGroupDto(name, props.position),
            new class implements IHttpResponsible {
                onResponse(code: number, response: any) {
                    if (code === 200) {
                        props.setTaskGroupList(TaskGroup.fromJsonArray(JSON.parse(response)));
                        setIsEdit(false);
                        setTaskGroup(TaskGroup.fromJsonArray(JSON.parse(response))[props.position]);
                    } else {
                        alert(code + " " + response);
                    }
                }
            }()
        )
    }

    const onDeleteClick = () => {
        props.backend.deleteTaskGroup(
            getCookie("token"),
            props.groupId,
            taskGroup.taskGroupId,
            new class implements IHttpResponsible {
                onResponse(code: number, response: any) {
                    if (code === 200) {
                        props.setTaskGroupList(TaskGroup.fromJsonArray(JSON.parse(response)));
                        setIsEdit(false);
                    } else {
                        alert(code + " " + response);
                    }
                }
            }()
        )
    }


    return (
        <Paper className={classes.div}>
            {
                isEdit ?
                    <TaskGroupInput
                        onCancelClick={onCancelClick}
                        onSaveClick={onSaveClick}
                        name={taskGroup.name}
                    />
                    :
                    <Grid
                        container
                        className={classes.titleGrid}
                        onMouseOver={() => setIsMouseOver(true)}
                        onMouseLeave={() => setIsMouseOver(false)}
                    >
                        <Grid item>
                            <Typography variant={"h4"} className={classes.name}>
                                {taskGroup.name}
                            </Typography>
                        </Grid>
                        {
                            isMouseOver &&
                            <Zoom in={true}>
                                <Grid item>
                                    <IconButton onClick={() => setIsEdit(true)}>
                                        <EditIcon className={classes.icon}/>
                                    </IconButton>
                                    <IconButton onClick={onDeleteClick}>
                                        <DeleteIcon className={classes.icon}/>
                                    </IconButton>
                                </Grid>
                            </Zoom>
                        }
                    </Grid>
            }
            <Grid container className={classes.grid} spacing={1}>
                {taskGroup.taskList.map((task, index) => (
                    <Grid key={"t" + index} item xs={12} sm={12} md={12}>
                        <TaskElement
                            task={task}
                            backend={props.backend}
                            groupId={props.groupId}
                            taskGroupId={taskGroup.taskGroupId}
                            position={index}
                            setTaskList={setTaskList}
                        />
                    </Grid>
                ))}
                <Grid item xs={12} sm={12} md={12}>
                    <AddTaskElement
                        backend={props.backend}
                        groupId={props.groupId}
                        taskGroupId={props.taskGroup.taskGroupId}
                        setTaskList={setTaskList}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
}