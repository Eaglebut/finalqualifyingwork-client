import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import IAppMenu from "../interfaces/IAppMenu";
import {Link as MaterialLink, Typography} from "@material-ui/core";
import {Link as RouterLink, useHistory} from "react-router-dom";
import CookieUtil from "../util/CookieUtil";


export const AppMenu: React.FC<IAppMenu> = (props) => {

    const history = useHistory();

    function onLogoutClick() {
        const cookieUtil = new CookieUtil();
        cookieUtil.deleteCookie("token");
        cookieUtil.deleteCookie("email");
        cookieUtil.deleteCookie("pass");
        props.handleMenuClose();
        history.replace("/logIn");

    }

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
                <Typography>
                    <MaterialLink component={RouterLink} to={"/user"} color="inherit" underline="none">
                        Мой аккаунт
                    </MaterialLink>
                </Typography>
            </MenuItem>
            <MenuItem onClick={onLogoutClick}>Выйти из аккаунта</MenuItem>
        </Menu>
    )
}