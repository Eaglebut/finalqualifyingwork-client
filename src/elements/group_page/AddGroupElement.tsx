import React from "react";
import {Card, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles((theme) => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center"
    },
    addIcon: {
        fontSize: "180px",
        opacity: ".8",
    },

}));

interface Clickable {
    onClick(): void;
}

export const AddGroupElement: React.FC<Clickable> = (props) => {

    const classes = useStyles();

    return (
        <Grid item key={"addCard"} xs={12} sm={6} md={4}>
            <Card className={classes.card} variant={"outlined"} onClick={props.onClick}>
                <AddIcon className={classes.addIcon}/>
            </Card>
        </Grid>
    );

}