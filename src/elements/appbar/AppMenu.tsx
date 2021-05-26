import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React, {useEffect, useState} from "react";
import IAppMenu from "../../interfaces/IAppMenu";
import {Avatar, Grid, Link as MaterialLink, Typography} from "@material-ui/core";
import {Link as RouterLink, useHistory} from "react-router-dom";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {deleteCookie, getCookie} from "../../util/CookieUtil";
import User from "../../model/User";
import {IHttpResponsible} from "../../interfaces/IHttpResponsible";

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
        },
        wrapper: {},
        text: {},
        textGrid: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "stretch",
        },
    }),
);


export const AppMenu: React.FC<IAppMenu> = (props) => {

    const [user, setUser] = useState<User | null>(props.user);

    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        props.backend.getUser(getCookie("token"), new class implements IHttpResponsible {
            onResponse(code: number, response: any) {
                if (code === 200)
                    setUser(JSON.parse(response));
            }
        }())
    }, [props.backend]);

    function onLogoutClick() {
        deleteCookie("token");
        deleteCookie("email");
        deleteCookie("pass");
        props.handleMenuClose();
        history.replace("/logIn");
    }

    const avatar = user === null
        ? "DD"
        : user.name.charAt(0).toUpperCase() + user.surname.charAt(0).toUpperCase();

    const nameSurname = user === null
        ? "FAIL FAIL"
        : user.name + " " + user.surname;

    const email = user === null
        ? "FAIL EMAIL"
        : user.email

    return (
        <Menu
            id={props.menuId}
            anchorEl={props.anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            transformOrigin={{vertical: 'top', horizontal: 'center'}}
            keepMounted
            open={props.isMenuOpen}
            onClose={props.handleMenuClose}
        >
            <MenuItem onClick={props.handleMenuClose}>
                <div>
                    <MaterialLink component={RouterLink} to={"/user"} color="inherit" underline="none">
                        <Grid container spacing={2} className={classes.container}>
                            <Grid item className={classes.wrapper}>
                                <Avatar>
                                    {avatar}
                                </Avatar>
                            </Grid>
                            <Grid item className={classes.wrapper}>
                                <Grid container spacing={1} className={classes.textGrid}>
                                    <Grid item>
                                        <Typography className={classes.text}>
                                            {nameSurname}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography className={classes.text}>
                                            {email}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </MaterialLink>
                </div>
            </MenuItem>
            <MenuItem onClick={onLogoutClick}>Выйти из аккаунта</MenuItem>
        </Menu>
    )
}