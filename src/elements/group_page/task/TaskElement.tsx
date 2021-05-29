import React from "react";
import {IBackendable} from "../../../interfaces/IBackendable";
import Task from "../../../model/Task";
import {makeStyles} from "@material-ui/core/styles";
import {Grid, Paper, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    grid: {},
    div: {
        padding: "5px"
    },

    name: {
        fontSize: "16px"
    },
    text: {
        fontSize: "14px"
    },

}));


interface ITaskElement extends IBackendable {
    task: Task;
    groupId: number;
    taskGroupId: number;
}

export const TaskElement: React.FC<ITaskElement> = (props) => {

    const classes = useStyles();

    return (
        <Grid className={classes.grid} item key={props.task.taskId}>
            <Paper variant={"elevation"} className={classes.div}>
                <Typography gutterBottom variant={"h4"} className={classes.name}>
                    {props.task.name}
                </Typography>
                <Typography className={classes.text}>
                    {props.task.text}
                </Typography>

            </Paper>
        </Grid>
    );
}

