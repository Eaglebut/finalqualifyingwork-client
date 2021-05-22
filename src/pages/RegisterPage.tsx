import React, {useState} from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link as RouterLink, useHistory} from "react-router-dom";
import {Link as MaterialLink} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {IBackendable} from "../interfaces/IBackendable";
import {IRegisterResponsible} from "../interfaces/IRegisterResponsible";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


export const RegisterPage: React.FC<IBackendable> = (props) => {
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

    const history = useHistory();


    function register(event: React.SyntheticEvent) {
        event.preventDefault();
        console.log(email, password, name, surname);
        props.backend.register(email, password, name, surname, new class implements IRegisterResponsible {
            onSuccess(email: string, password: string) {
                history.push("/login");
            }

            onFailed(message: string, code: number) {
                alert(code + " " + message);
            }
        }());
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Регистрация
                </Typography>
                <form className={classes.form} noValidate onSubmit={register}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="Фамилия"
                                autoFocus
                                onChange={event => setSurname(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Имя"
                                name="lastName"
                                autoComplete="lname"
                                onChange={event => setName(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                onChange={event => setEmail(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Пароль"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                onChange={event => setPassword(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password repeat"
                                label="Повторите пароль"
                                type="password"
                                id="password_repeat"
                                autoComplete="new-password"
                                onChange={event => setRepeatedPassword(event.target.value)}
                                error={password !== repeatedPassword}
                                helperText={password !== repeatedPassword ? "Пароли должны совпадать" : null}

                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Зарегистрироваться
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <MaterialLink component={RouterLink} to="/login" href="#" variant="body2">
                                Уже зарегистрированы? Войдите
                            </MaterialLink>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
            </Box>
        </Container>
    );
}

export default RegisterPage