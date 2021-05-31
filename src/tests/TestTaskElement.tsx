import React from "react";
import Task from "../model/Task";
import {Grid, Paper, Typography} from "@material-ui/core";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {Draggable} from "react-beautiful-dnd";

const useStyles = makeStyles((test) =>
    createStyles({
        grid: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",

        },
        paper: {
            padding: "20px",
        },
        text: {
            fontSize: "14px",
            overflowWrap: "break-word",
            wordWrap: "break-word",
            wordBreak: "break-word",
        },
        /*border: {
          border: "1px solid black"
        },*/

    }),
);

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    //userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "white",

    // styles we need to apply on draggables
    //...draggableStyle
});

interface ITestTaskElement {
    task: Task;
    position: number;
}

export const TestTaskElement: React.FC<ITestTaskElement> = (props) => {

    const classes: any = useStyles();
    return (
        <Grid
            item
            key={"testta" + props.task.taskId}
            //className={classes.border}
        >
            <Draggable
                draggableId={props.task.taskId + " " + props.task.taskId}
                key={props.task.taskId + " " + props.task.taskId}
                index={props.position}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <Paper
                            //onClick={() => console.log(provided.draggableProps.style)}
                            style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style)}
                        >
                            <Typography className={classes.text}>
                                {props.task.taskId}
                            </Typography>
                            <Typography className={classes.text}>
                                {props.task.name}
                            </Typography>
                            <Typography className={classes.text}>
                                {props.task.text}
                            </Typography>
                            <Typography className={classes.text}>
                                {props.task.position}
                            </Typography>
                        </Paper>
                    </div>
                )}
            </Draggable>
        </Grid>
    );
}