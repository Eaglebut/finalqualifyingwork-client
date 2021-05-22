import React from 'react';
import LogInPage from "./pages/LogInPage";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import GroupsPage from "./pages/GroupsPage";
import BackendDao from "./dao/BackendDao";


function App() {

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
                    <GroupsPage/>
                </Route>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
