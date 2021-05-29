import React from "react";

import TaskGroup from "../../../model/TaskGroup";
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {TaskGroupElement} from "./TaskGroupElement";
import {AddTaskGroupElement} from "./AddTaskGroupElement";
import {IBackendable} from "../../../interfaces/IBackendable";

const useStyles = makeStyles((theme) => ({

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
    taskGroup: Array<TaskGroup>
    groupId: number;
    //setGroup(group: (group:Group) => Group) : void;
}

export const TaskGroupContainer: React.FC<ITaskGroupContainer> = (props) => {

    const classes = useStyles();

    return (
        <div className={classes.div}>
            <Grid container className={classes.grid} spacing={2}>
                {props.taskGroup.map((taskGroup) => (
                    <Grid item xs={12} sm={3} md={2}>
                        <TaskGroupElement
                            groupId={props.groupId}
                            taskGroup={taskGroup}
                            backend={props.backend}
                            //setGroup={props.setGroup}
                        />
                    </Grid>
                ))}
                <AddTaskGroupElement onClick={() => {
                }}/>
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