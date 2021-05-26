import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Button, Container, CssBaseline, Grid, Paper, TextField, Typography} from "@material-ui/core";
import {IBackendable} from "../../interfaces/IBackendable";
import {getCookie} from "../../util/CookieUtil";
import PostGroupDto from "../../dto/group/PostGroupDto";
import {IHttpResponsible} from "../../interfaces/IHttpResponsible";
import Group from "../../model/Group";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
            padding: theme.spacing(2),
            [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
                marginTop: theme.spacing(6),
                marginBottom: theme.spacing(6),
                padding: theme.spacing(3),
            },
        },
        layout: {
            width: 'auto',
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
            [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
                width: 600,
                marginLeft: 'auto',
                marginRight: 'auto',
            },
        },
        stepper: {
            padding: theme.spacing(3, 0, 5),
        },
        buttons: {
            display: 'flex',
            justifyContent: 'flex-end',
        },
        button: {
            marginTop: theme.spacing(3),
            marginLeft: theme.spacing(1),
        },

    })
);

interface ICreateGroup extends IBackendable {
    closeModal(): void;

    addGroup(group: Group): void;
}

export const CreateGroup: React.FC<ICreateGroup> = (props) => {
    const classes = useStyles();

    const [groupName, setGroupName] = useState<string>("");
    const [groupDescription, setGroupDescription] = useState<string>("");

    const onAcceptClick = () => {
        props.backend.createGroup(getCookie("token"),
            new PostGroupDto(groupName, groupDescription),
            new class implements IHttpResponsible {
                onResponse(code: number, response: any) {
                    if (code !== 200) {
                        console.log(code + " " + response);
                    } else {
                        console.log(response);
                        props.addGroup(Group.fromJSON(JSON.parse(response)));
                        props.closeModal()
                    }
                }
            }());

    }

    return (
        <Container maxWidth="sm">
            <CssBaseline/>
            <Paper className={classes.paper}>
                <Typography variant="h6" gutterBottom>
                    Создать группу
                </Typography>
                <div>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="address1"
                                name="address1"
                                label="Название группы"
                                fullWidth
                                onChange={event => setGroupName(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="address2"
                                name="address2"
                                label="Описание группы"
                                fullWidth
                                onChange={event => setGroupDescription(event.target.value)}
                            />
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.buttons}>
                    <Button
                        className={classes.button}
                        onClick={props.closeModal}>
                        Отмена
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={onAcceptClick}
                    >
                        Сохранить
                    </Button>
                </div>
            </Paper>
        </Container>
    );
}