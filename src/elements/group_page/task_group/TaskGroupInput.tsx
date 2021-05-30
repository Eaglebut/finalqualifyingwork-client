import React, {useState} from "react";
import {Grid, IconButton, TextField} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import {Save} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    inputGrid: {
        display: "flex",
        alignItems: "stretch",
        flexDirection: "column"
    },
    icon: {
        fontSize: "17px",
    },
    iconGrid: {
        display: "flex",
        justifyContent: "flex-end",
    },
}));


interface ITaskGroupInput {
    name: string;

    onSaveClick(name: string): void;

    onCancelClick(): void;
}

export const TaskGroupInput: React.FC<ITaskGroupInput> = (props) => {

    const classes = useStyles();

    const [taskGroupName, setTaskGroupName] = useState<string>(props.name);


    return (
        <Grid container className={classes.inputGrid}>
            <Grid item>
                <TextField
                    multiline
                    size={"small"}
                    label={"Название группы задач"}
                    onChange={event => setTaskGroupName(event.target.value)}
                    value={taskGroupName}
                    fullWidth
                />
            </Grid>
            <Grid item>
                <Grid container className={classes.iconGrid}>
                    <Grid item>
                        <IconButton
                            onClick={props.onCancelClick}
                        >
                            <CancelIcon className={classes.icon}/>
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton
                            onClick={() => props.onSaveClick(taskGroupName)}
                        >
                            <Save className={classes.icon}/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )

}
