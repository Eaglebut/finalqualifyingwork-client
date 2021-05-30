import React from "react";
import IGroupElement from "../../interfaces/IGroupElement";
import {Card, CardActions, CardContent, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardContent: {
        flexGrow: 1,
    },
}));


export const GroupElement: React.FC<IGroupElement> = (props) => {

    const classes = useStyles();

    return (
        <Grid item key={props.group.groupId} xs={12} sm={6} md={4}>
            <Card className={classes.card} variant={"outlined"} onClick={() => alert(props.group.toString())}>
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.group.name}
                    </Typography>
                    <Typography>
                        {props.group.description}
                    </Typography>
                </CardContent>
                <CardActions>

                </CardActions>
            </Card>
        </Grid>
    );

}