import React, {useState} from "react";
import {IBackendable} from "../../../interfaces/IBackendable";
import TaskGroup from "../../../model/TaskGroup";
import {Grid, Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {TaskElement} from "../task/TaskElement";
import {AddTaskElement} from "../task/AddTaskElement";
import Task from "../../../model/Task";

const useStyles = makeStyles((theme) => ({

    grid: {
        display: "flex",
        flexDirection: "column",
    },
    div: {
        padding: "15px",
    },
    name: {
        fontSize: "16px",
        marginBottom: "5px",
    },


}));

interface ITaskGroupElement extends IBackendable {
    taskGroup: TaskGroup;
    groupId: number;
}

export const TaskGroupElement: React.FC<ITaskGroupElement> = (props) => {
    const classes = useStyles();

    const [taskGroup, setTaskGroup] = useState<TaskGroup>(props.taskGroup);

    const setTaskList = (taskList: Array<Task>) => {
        setTaskGroup(prevState => {
            return new TaskGroup(prevState.taskGroupId, prevState.name, taskList, prevState.position);
        })
    }


    return (
        <Paper className={classes.div}>
            <Typography variant={"h4"} className={classes.name}>
                {taskGroup.name}
            </Typography>
            <Grid container className={classes.grid} spacing={1}>
                {taskGroup.taskList.map((task, index) => (
                    <TaskElement
                        task={task}
                        backend={props.backend}
                        groupId={props.groupId}
                        taskGroupId={props.taskGroup.taskGroupId}
                        position={index}
                        setTaskList={setTaskList}
                    />
                ))}
                <AddTaskElement
                    onClick={() => {
                    }}
                    backend={props.backend}
                    groupId={props.groupId}
                    taskGroupId={props.taskGroup.taskGroupId}
                    setTaskList={setTaskList}
                    //setGroup={props.setGroup}
                />
            </Grid>
        </Paper>
    );
}