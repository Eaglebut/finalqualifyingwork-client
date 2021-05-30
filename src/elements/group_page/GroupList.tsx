import React, {useEffect, useState} from "react";
import {IBackendable} from "../../interfaces/IBackendable";
import {getCookie} from "../../util/CookieUtil";
import {IHttpResponsible} from "../../interfaces/IHttpResponsible";
import Group from "../../model/Group";
import {GroupElement} from "./GroupElement";
import {makeStyles} from "@material-ui/core/styles";
import {Backdrop, Container, CssBaseline, Fade, Grid, Modal} from "@material-ui/core";
import {AddGroupElement} from "./AddGroupElement";
import {CreateGroup} from "./CreateGroup";

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export const GroupList: React.FC<IBackendable> = (props) => {

    const [groupList, setGroupList] = useState<Array<Group>>([]);
    const [open, setOpen] = useState<boolean>(false);
    const classes = useStyles();

    useEffect(() => {
        props.backend.getUsersGroups(getCookie("token"), new class implements IHttpResponsible {
            onResponse(code: number, response: any) {
                if (code === 200) {
                    let jsonResponse = JSON.parse(response);
                    setGroupList(Group.fromJSONArray(jsonResponse));
                }
            }
        }());
    }, [props.backend]);

    const addGroup = (group: Group) => {
        const groups = new Array<Group>();
        groupList.forEach(value => groups.push(value));
        groups.push(group);
        setGroupList(groups);
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <React.Fragment>
            <CssBaseline/>
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    {groupList.map((group) => (
                        <GroupElement group={group}/>
                    ))}
                    <AddGroupElement onClick={handleOpen}/>
                </Grid>
            </Container>
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
        </React.Fragment>);
}