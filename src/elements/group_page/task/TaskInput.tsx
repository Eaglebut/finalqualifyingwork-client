import React, {useState} from "react";
import {Grid, IconButton, TextField} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import {Save} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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


interface ITaskInput {
    name: string;
    text: string;

    onSaveClick(name: string, text: string): void;

    onCancelClick(): void;
}

export const TaskInput: React.FC<ITaskInput> = (props) => {

    const classes = useStyles();

    const [taskName, setTaskName] = useState<string>(props.name);
    const [taskText, setTaskText] = useState<string>(props.text);

    return (
        <Grid container className={classes.inputGrid}>
            <Grid item>
                <TextField
                    multiline
                    size={"small"}
                    label={"Название задачи"}
                    onChange={event => setTaskName(event.target.value)}
                    value={taskName}
                />
            </Grid>
            <Grid item>
                <TextField
                    size={"small"}
                    label={"Описание задачи"}
                    multiline
                    onChange={event => setTaskText(event.target.value)}
                    value={taskText}
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
                            onClick={() => props.onSaveClick(taskName, taskText)}
                        >
                            <Save className={classes.icon}/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )

}
