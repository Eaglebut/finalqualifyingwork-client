import React, {useEffect, useState} from "react";
import Group from "../model/Group";
import TaskGroup from "../model/TaskGroup";
import Task from "../model/Task";
import {Grid} from "@material-ui/core";
import {TestTaskGroupElement} from "./TestTaskGroupElement";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {DragDropContext, Droppable, DropResult} from "react-beautiful-dnd";
import {IBackendable} from "../interfaces/IBackendable";
import {getCookie} from "../util/CookieUtil";
import {IHttpResponsible} from "../interfaces/IHttpResponsible";
import EditTaskDto from "../dto/task/EditTaskDto";
import EditTaskGroupDto from "../dto/task_group/EditTaskGroupDto";

const useStyles = makeStyles(() =>
    createStyles({
        grid: {
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            flexWrap: "wrap",
            justifyContent: "start"
        },

        /*border: {
            border: "1px solid black",
        },*/
        div: {
            display: "flex",
        },
    }),
);

const groupId = 129;

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

export const TestPage: React.FC<IBackendable> = (props) => {

    const classes = useStyles();

    const [taskGroups, setTaskGroups] = useState<Array<TaskGroup>>(new Array<TaskGroup>());

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


    useEffect(() => {
        props.backend.getGroup(
            getCookie("token"),
            groupId,
            new class implements IHttpResponsible {
                onResponse(code: number, response: any) {
                    if (code === 200) {
                        setTaskGroups(Group.fromJSON(JSON.parse(response)).taskGroups);
                    } else {
                        alert(code + " " + response);
                    }
                }
            }()
        )
    }, [props.backend])

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
                    groupId,
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
                    groupId,
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
            //setTaskGroups(reorder(taskGroups, sourceIndex, destinationIndex));

            const taskGroup = taskGroups[sourceIndex];
            props.backend.editTaskGroup(
                getCookie("token"),
                groupId,
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
        <div
            className={classes.div}
        >
            <DragDropContext
                onDragEnd={onDragEnd}
            >
                <Droppable
                    droppableId="all-columns"
                    direction="horizontal"
                    type="column"
                >
                    {provided => (
                        <Grid
                            container
                            className={classes.grid}
                            spacing={2}
                            {...provided.droppableProps}
                            innerRef={provided.innerRef}
                        >
                            {
                                taskGroups.map((value, index) => {
                                    return (
                                        <TestTaskGroupElement
                                            key={"testTaskGroupElement" + index}
                                            taskGroup={value}
                                            position={index}
                                        />
                                    )
                                })
                            }
                            {provided.placeholder}
                        </Grid>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}