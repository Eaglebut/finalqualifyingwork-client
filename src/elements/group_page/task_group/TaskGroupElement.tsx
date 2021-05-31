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
import {Draggable, Droppable} from "react-beautiful-dnd";

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

    setTaskGroups(taskGroups: Array<TaskGroup>): void;

    setTaskGroup(taskGroup: TaskGroup, position: number): void;

    setTaskList(taskList: Array<Task>, taskGroup: TaskGroup): void

}

export const TaskGroupElement: React.FC<ITaskGroupElement> = (props) => {
    const classes = useStyles();

    const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const onCancelClick = () => {
        setIsEdit(false);
    }

    const onSaveClick = (name: string) => {
        props.backend.editTaskGroup(
            getCookie("token"),
            props.groupId,
            props.taskGroup.taskGroupId,
            new EditTaskGroupDto(name, props.position),
            new class implements IHttpResponsible {
                onResponse(code: number, response: any) {
                    if (code === 200) {
                        props.setTaskGroups(TaskGroup.fromJsonArray(JSON.parse(response)));
                        setIsEdit(false);
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
            props.taskGroup.taskGroupId,
            new class implements IHttpResponsible {
                onResponse(code: number, response: any) {
                    if (code === 200) {
                        props.setTaskGroups(TaskGroup.fromJsonArray(JSON.parse(response)));
                        setIsEdit(false);
                    } else {
                        alert(code + " " + response);
                    }
                }
            }()
        )
    }


    return (
        <Draggable draggableId={props.groupId + " " + props.taskGroup.taskGroupId} index={props.position}>
            {provided => (
                <Paper
                    key={"paper" + props.taskGroup.taskGroupId}
                    className={classes.div}
                    innerRef={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                >
                    {
                        isEdit ?
                            <TaskGroupInput
                                onCancelClick={onCancelClick}
                                onSaveClick={onSaveClick}
                                name={props.taskGroup.name}
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
                                        {props.taskGroup.name}
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


                    <Grid
                        container
                        className={classes.grid}
                        spacing={1}
                    >
                        <Grid item xs={12} sm={12} md={12}>
                            <Droppable
                                key={"" + props.taskGroup.position}
                                droppableId={"" + props.taskGroup.position}
                                type="row"
                            >
                                {(provided, snapshot) => (
                                    <div
                                        key={"TaskGroupDroppableDiv" + props.taskGroup.position}
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        <Grid
                                            container
                                            className={classes.grid}
                                            spacing={1}
                                        >
                                            {props.taskGroup.taskList.map((task, index) => (
                                                <Grid key={"t" + index} item xs={12} sm={12} md={12}>
                                                    <TaskElement
                                                        task={task}
                                                        backend={props.backend}
                                                        groupId={props.groupId}
                                                        taskGroup={props.taskGroup}
                                                        position={index}
                                                        setTaskList={props.setTaskList}
                                                    />
                                                </Grid>
                                            ))}
                                        </Grid>

                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <AddTaskElement
                                backend={props.backend}
                                groupId={props.groupId}
                                taskGroup={props.taskGroup}
                                setTaskList={props.setTaskList}
                            />
                        </Grid>
                    </Grid>
                </Paper>)}
        </Draggable>
    );
}