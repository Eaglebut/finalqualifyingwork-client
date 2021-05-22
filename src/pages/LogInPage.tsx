import React, {useState} from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {Link as RouterLink, useHistory} from "react-router-dom";
import {Link as MaterialLink} from "@material-ui/core";
import ILogInResponsible from "../interfaces/ILogInResponsible";
import {IBackendable} from "../interfaces/IBackendable";


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


export const LogInPage: React.FC<IBackendable> = props => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [savePass, setSavePass] = useState(false);
    const history = useHistory();

    function setCookie(name: string, value: string, days: number): void {
        let expires: string = "";
        if (days) {
            let date: Date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }

    function logIn(event : React.SyntheticEvent) : void{
        event.preventDefault();
        console.log(email + " " + password);
        props.backend.logIn(email, password, new class implements ILogInResponsible {
            onFailed(message: string): void {
                alert(message);
            }

            onSuccess(email: string, password: string, token: string): void {
                if (savePass) {
                    setCookie("email", email, 2);
                    setCookie("pass", password, 2);
                }
                setCookie("token", token, 1);
                history.push("/")
            }
        }());
    }



    const classes = useStyles();

    return (
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Вход
                        </Typography>
                        <form className={classes.form} onSubmit={logIn} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Адресс электронной почты"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={event => setEmail(event.target.value)}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Пароль"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={event => setPassword(event.target.value)}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Запомнить меня"
                                onChange={() => setSavePass(!savePass)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Войти
                            </Button>
                                <Grid container>
                                    <Grid item>
                                        <MaterialLink component={RouterLink} to = "/registration" variant="body2">
                                            {"Нет аккаунта? Зарегистрироваться"}
                                        </MaterialLink>
                                    </Grid>
                                </Grid>
                            <Box mt={5}>
                            </Box>
                        </form>
                    </div>
                </Grid>
            </Grid>
    );
}
export default LogInPage;