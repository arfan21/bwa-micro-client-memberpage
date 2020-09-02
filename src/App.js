import React from "react";
import { createBrowserHistory } from "history";
import "assets/css/style.css";
import { Router, Switch, Route } from "react-router-dom";
import GuestRoutes from "components/Routes/GuestRoutes";
import { Login } from "pages/Login";
import { NotFound } from "pages/404";
import MemberRoutes from "components/Routes/MemberRoutes";
import { MyClass } from "pages/MyClass";
import { Unauthenticated } from "pages/401";

function App() {
    const history = createBrowserHistory({ basename: process.env.PUBLIC_URL });

    return (
        <>
            <Router history={history}>
                <Switch>
                    <GuestRoutes path="/login" component={Login}></GuestRoutes>
                    <GuestRoutes
                        path="/private"
                        component={Unauthenticated}
                    ></GuestRoutes>
                    <MemberRoutes
                        exact
                        path="/"
                        component={MyClass}
                    ></MemberRoutes>
                    <Route path="*" component={NotFound}></Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;
