import React from "react";
import {Grid, Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles((theme) => ({

    grid: {},
    div: {
        margin: "10px",
        padding: "20px",
    },
    text: {
        fontSize: "14px",
    },
    textGrid: {
        display: "flex",
        alignItems: "center",
        flexWrap: "nowrap",
    },
}));

interface Clickable {
    onClick(): void;
}

export const AddTaskGroupElement: React.FC<Clickable> = (props) => {

    const classes = useStyles();

    return (
        <Paper className={classes.div}>
            <Grid item key={"addCard"}>
                <Grid container className={classes.textGrid}>
                    <AddIcon className={classes.text}/>
                    <Typography className={classes.text}>
                        Добавить группу задач
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );

}