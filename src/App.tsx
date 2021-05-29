import React from 'react';
import LogInPage from "./pages/LogInPage";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import GroupListPage from "./pages/GroupListPage";
import BackendDao from "./dao/BackendDao";
import {GroupPage} from "./pages/GroupPage";


class App extends React.Component {
    render() {
        const backend = new BackendDao();
        return (
            <div>
                <Router>
                    <Switch>
                        <Route path="/logIn" exact>
                            <LogInPage backend={backend}/>
                        </Route>
                        <Route path="/registration" exact>
                            <RegisterPage backend={backend}/>
                        </Route>
                        <Route path="/" exact>
                            <GroupListPage backend={backend}/>
                        </Route>
                        <Route path="/user" exact>
                            <h1>
                                USER PAGE
                            </h1>
                        </Route>
                        <Route path="/group/:groupId" exact>
                            <GroupPage backend={backend}/>
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}


export default App;
