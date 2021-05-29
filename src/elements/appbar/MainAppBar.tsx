import React, {useEffect} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import {AppMenu} from "./AppMenu";
import {MobileAppMenu} from "./MobileAppMenu";
import {IBackendable} from "../../interfaces/IBackendable";
import {Avatar, Fade} from "@material-ui/core";
import User from "../../model/User";
import {getCookie} from "../../util/CookieUtil";
import {IHttpResponsible} from "../../interfaces/IHttpResponsible";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grow: {
            flexGrow: 1,
        },
        title: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
        },
        sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
    }),
);

interface IMainAppBar extends IBackendable {
    title: string;
    backButtonVisibility: boolean;

    onBackButtonClick(): void;
}

export const MainAppBar: React.FC<IMainAppBar> = (props) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
    const [user, setUser] = React.useState<null | User>(null);

    useEffect(() => {
        props.backend.getUser(getCookie("token"), new class implements IHttpResponsible {
            onResponse(code: number, response: any) {
                if (code === 200)
                    setUser(JSON.parse(response));
            }
        }(),)
    }, [props.backend]);


    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };


    const menuId = 'primary-search-account-menu';
    const mobileMenuId = 'primary-search-account-menu-mobile';

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <Fade in={props.backButtonVisibility}>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu"
                            onClick={props.onBackButtonClick}
                        >
                            <ArrowBackIcon/>
                        </IconButton>
                    </Fade>
                    <Typography className={classes.title} variant="h6" noWrap>
                        {props.title}
                    </Typography>
                    <div className={classes.grow}/>
                    <div className={classes.sectionDesktop}>
                        <IconButton aria-label="show 17 new notifications" color="inherit">
                            <Badge badgeContent={17} color="secondary">
                                <NotificationsIcon/>
                            </Badge>
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <Avatar>
                                {
                                    user === null
                                        ? "DD"
                                        : user.name.charAt(0).toUpperCase() + user.surname.charAt(0).toUpperCase()
                                }
                            </Avatar>
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon/>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <AppMenu menuId={menuId}
                     isMenuOpen={isMenuOpen}
                     handleMenuClose={handleMenuClose}
                     anchorEl={anchorEl}
                     backend={props.backend}
                     user={user}
            />
            <MobileAppMenu isMobileMenuOpen={isMobileMenuOpen}
                           mobileMenuId={mobileMenuId}
                           handleMobileMenuClose={handleMobileMenuClose}
                           handleProfileMenuOpen={handleMobileMenuOpen}
                           mobileMoreAnchorEl={mobileMoreAnchorEl}/>
        </div>
    );
}



