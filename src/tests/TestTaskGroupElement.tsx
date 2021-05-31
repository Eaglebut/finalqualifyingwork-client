import React from "react";
import TaskGroup from "../model/TaskGroup";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {Grid, Paper} from "@material-ui/core";
import {TestTaskElement} from "./TestTaskElement";
import {Draggable, Droppable} from "react-beautiful-dnd";


const useStyles = makeStyles(() =>
    createStyles({
        grid: {
            display: "flex",
            flexDirection: "column",

            alignItems: "stretch",
        },
        paper: {
            padding: "10px",
        },
        taskGroup: {
            display: "flex",
        },
        div: {
            display: "flex",
        }
    }),
);

interface ITestTaskGroupElement {
    taskGroup: TaskGroup;
    position: number;
}


export const TestTaskGroupElement: React.FC<ITestTaskGroupElement> = (props) => {

    const classes = useStyles();

    console.log(props.position);
    console.log(props.taskGroup.taskGroupId)

    return (
        <Draggable
            draggableId={props.position + " " + props.taskGroup.taskGroupId}
            index={props.position}
        >
            {provided => (
                <Grid
                    item
                    key={"testTg" + props.taskGroup.taskGroupId}
                    className={classes.taskGroup}
                    xs={12} sm={3} md={2}
                    {...provided.draggableProps}
                    innerRef={provided.innerRef}
                >
                    <Paper
                        className={classes.paper}
                        {...provided.dragHandleProps}
                    >
                        <Droppable
                            key={"" + props.taskGroup.position}
                            droppableId={"" + props.taskGroup.position}
                            type="row"
                        >
                            {(provided, snapshot) => (
                                <div
                                    key={"testTaskGroupDroppableDiv" + props.taskGroup.position}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <Grid
                                        container
                                        className={classes.grid}
                                        spacing={2}
                                    >
                                        {
                                            props.taskGroup.taskList.map((value, index) => {
                                                return (
                                                    <TestTaskElement
                                                        key={"testTaskGroupElementElement" + index}
                                                        task={value}
                                                        position={index}/>
                                                );
                                            })
                                        }
                                    </Grid>
                                    {provided.placeholder}
                                </div>)
                            }
                        </Droppable>
                    </Paper>
                </Grid>
            )}
        </Draggable>
    );
}