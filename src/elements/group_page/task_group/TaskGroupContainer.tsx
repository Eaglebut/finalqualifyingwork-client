import React, {useEffect, useState} from "react";

import TaskGroup from "../../../model/TaskGroup";
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {TaskGroupElement} from "./TaskGroupElement";
import {AddTaskGroupElement} from "./AddTaskGroupElement";
import {IBackendable} from "../../../interfaces/IBackendable";

const useStyles = makeStyles(() => ({

    grid: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        justifyContent: "start"
    },
    div: {
        margin: "10px",
        padding: "10px"
    }
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

    useEffect(() => {
        console.log("test1")
        console.log(taskGroups);
        setTaskGroups(taskGroups);
    }, [taskGroups])


    return (
        <div className={classes.div}>
            <Grid container className={classes.grid} spacing={2}>
                {taskGroups.map((taskGroup, index) => (
                    <Grid key={"tg" + taskGroup.position} item xs={12} sm={3} md={2}>
                        <TaskGroupElement
                            groupId={props.groupId}
                            taskGroup={taskGroup}
                            backend={props.backend}
                            position={index}
                            setTaskGroupList={setTaskGroups}
                        />
                    </Grid>
                ))}
                <Grid key={"tgAdd"} item xs={12} sm={3} md={2}>
                    <AddTaskGroupElement
                        backend={props.backend}
                        groupId={props.groupId}
                        setTaskGroupList={setTaskGroups}
                    />
                </Grid>
            </Grid>

        </div>
    );

}

/*
<Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <CreateGroup closeModal={handleClose} backend={props.backend} addGroup={addGroup}/>
                </Fade>
            </Modal>
 */