import React, {useEffect, useState} from "react";

import TaskGroup from "../../../model/TaskGroup";
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {TaskGroupElement} from "./TaskGroupElement";
import {AddTaskGroupElement} from "./AddTaskGroupElement";
import {IBackendable} from "../../../interfaces/IBackendable";
import Task from "../../../model/Task";
import {DragDropContext, Droppable, DropResult} from "react-beautiful-dnd";
import {getCookie} from "../../../util/CookieUtil";
import EditTaskDto from "../../../dto/task/EditTaskDto";
import {IHttpResponsible} from "../../../interfaces/IHttpResponsible";
import EditTaskGroupDto from "../../../dto/task_group/EditTaskGroupDto";

const reorder = (list: Array<any>, startIndex: number, endIndex: number): Array<any> => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const move = (source: Array<any>,
              destination: Array<any>,
              sourceIndex: number,
              destinationIndex: number,
              sourceDroppableIndex: number,
              destinationDroppableIndex: number): any => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(sourceIndex, 1);

    destClone.splice(destinationIndex, 0, removed);

    const result: any = {};
    result[sourceDroppableIndex] = sourceClone;
    result[destinationDroppableIndex] = destClone;

    return result;
};


const useStyles = makeStyles(() => ({


    div: {
        display: "flex",
    },
    grid: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        justifyContent: "start",
        padding: "10px",
    },
    element: {
        width: "250px"
    },
}));

interface ITaskGroupContainer extends IBackendable {
    taskGroups: Array<TaskGroup>
    groupId: number;
}

export const TaskGroupContainer: React.FC<ITaskGroupContainer> = (props) => {

    const classes = useStyles();
    const [taskGroups, setTaskGroups] = useState<Array<TaskGroup>>(props.taskGroups);

    useEffect(() => {
        console.log("test")
        setTaskGroups(props.taskGroups);
    }, [props.taskGroups])

    const setTaskGroup = (taskGroup: TaskGroup, position: number) => {
        let newTaskGroups = [...taskGroups];
        newTaskGroups
            .splice(position, 1, taskGroup);
        setTaskGroups(newTaskGroups);
    }

    const setTaskList = (taskList: Array<Task>, taskGroup: TaskGroup) => {
        const newTaskGroup = taskGroups[taskGroup.position];
        newTaskGroup.taskList = taskList;
        setTaskGroup(newTaskGroup, taskGroup.position);
    }

    const onDragEnd = (result: DropResult) => {
        console.log("onDragEnd start");
        if (!result.destination) {
            return;
        }

        console.log("result.source.droppableId " + result.source.droppableId);
        console.log("result.destination.droppableId " + result.destination.droppableId);

        const sourceDroppableIndex = +result.source.droppableId;
        const destinationDroppableIndex = +result.destination.droppableId;
        console.log("sourceDroppableIndex " + sourceDroppableIndex);
        console.log("destinationDroppableIndex " + destinationDroppableIndex);
        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;
        console.log("sourceIndex " + sourceIndex);
        console.log("destinationIndex " + destinationIndex);


        if (result.type === "row") {

            const task = taskGroups[sourceDroppableIndex].taskList[sourceIndex];
            const taskGroup = taskGroups[sourceDroppableIndex];

            if (sourceDroppableIndex === destinationDroppableIndex) {

                const items = reorder(taskGroup.taskList, sourceIndex, destinationIndex);
                const newState = [...taskGroups];
                newState[destinationDroppableIndex].taskList = items;
                setTaskGroups(newState);


                props.backend.editTask(
                    getCookie("token"),
                    task.taskId,
                    props.groupId,
                    taskGroup.taskGroupId,
                    new EditTaskDto(
                        task.name,
                        task.text,
                        destinationIndex,
                        taskGroup.taskGroupId
                    ),
                    new class implements IHttpResponsible {
                        onResponse(code: number, response: any): void {
                            if (code === 200) {
                                setTaskList(Task.fromJsonArray(JSON.parse(response)), taskGroup);
                            } else {
                                alert(code + " " + response);
                            }
                        }
                    }()
                );
            } else {
                const taskLists = move(
                    taskGroups[sourceDroppableIndex].taskList,
                    taskGroups[destinationDroppableIndex].taskList,
                    sourceIndex,
                    destinationIndex,
                    sourceDroppableIndex,
                    destinationDroppableIndex
                );
                const newTaskGroups = [...taskGroups];

                newTaskGroups[sourceDroppableIndex].taskList = taskLists[sourceDroppableIndex];
                newTaskGroups[destinationDroppableIndex].taskList = taskLists[destinationDroppableIndex];
                setTaskGroups(newTaskGroups);
                props.backend.editTask(
                    getCookie("token"),
                    task.taskId,
                    props.groupId,
                    taskGroup.taskGroupId,
                    new EditTaskDto(
                        task.name,
                        task.text,
                        destinationIndex,
                        taskGroups[destinationDroppableIndex].taskGroupId
                    ),
                    new class implements IHttpResponsible {
                        onResponse(code: number, response: any): void {
                            if (code === 200) {
                                setTaskList(Task.fromJsonArray(JSON.parse(response)), taskGroups[destinationDroppableIndex]);
                            } else {
                                alert(code + " " + response);
                            }
                        }
                    }()
                );
            }
        } else {
            setTaskGroups(reorder(taskGroups, sourceIndex, destinationIndex));

            const taskGroup = taskGroups[sourceIndex];
            props.backend.editTaskGroup(
                getCookie("token"),
                props.groupId,
                taskGroup.taskGroupId,
                new EditTaskGroupDto(
                    taskGroup.name,
                    destinationIndex
                ),
                new class implements IHttpResponsible {
                    onResponse(code: number, response: any): void {
                        if (code === 200) {
                            setTaskGroups(TaskGroup.fromJsonArray(JSON.parse(response)));
                            console.log(TaskGroup.fromJsonArray(JSON.parse(response)));
                        } else {
                            alert(code + " " + response);
                        }
                    }
                }()
            )
        }
    }


    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="all-columns-main"
                       direction="horizontal"
                       type="column">
                {provided => (
                    <div
                        key={"diva"}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={classes.grid}
                    >

                        <Grid container className={classes.grid}
                              spacing={2}>
                            {taskGroups.map((taskGroup, index) => (
                                <Grid
                                    key={"tg" + taskGroup.taskGroupId}
                                    item
                                    className={classes.element}
                                >
                                    <TaskGroupElement
                                        key={"tge" + taskGroup.taskGroupId}
                                        groupId={props.groupId}
                                        taskGroup={taskGroup}
                                        backend={props.backend}
                                        position={index}
                                        setTaskGroups={setTaskGroups}
                                        setTaskGroup={setTaskGroup}
                                        setTaskList={setTaskList}
                                    />
                                </Grid>

                            ))}
                            {provided.placeholder}
                            <Grid
                                key={"addnewtaskgroupgrid"}
                                item
                                className={classes.element}
                            >
                                <AddTaskGroupElement
                                    key={"addnewtaskgroup"}
                                    backend={props.backend}
                                    groupId={props.groupId}
                                    setTaskGroupList={setTaskGroups}
                                />
                            </Grid>
                        </Grid>
                    </div>
                )}
            </Droppable>

        </DragDropContext>
    );

}
/*
            <AddTaskGroupElement
                backend={props.backend}
                groupId={props.groupId}
                setTaskGroupList={setTaskGroups}
            />
 */