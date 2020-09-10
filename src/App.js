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
import { Register } from "pages/Register";
import { useEffect } from "react";
import { setAuthorizationHeader } from "configs/axios";
import { useDispatch } from "react-redux";
import users from "constants/api/users";
import { populateProfile } from "store/actions/users";
import { Joined } from "pages/Joined";
import { DetailsClass } from "pages/DetailsClass";
import { Settings } from "pages/Settings";

function App() {
    const dispatch = useDispatch();

    const history = createBrowserHistory({ basename: process.env.PUBLIC_URL });

    useEffect(() => {
        let session = null;

        if (localStorage.getItem("MICRO:token")) {
            session = JSON.parse(localStorage.getItem("MICRO:token"));

            setAuthorizationHeader(session.token);

            users.details().then((res) => {
                dispatch(populateProfile(res.data));
            });
        }
    }, [dispatch]);

    return (
        <>
            <Router history={history}>
                <Switch>
                    <GuestRoutes path="/login" component={Login}></GuestRoutes>
                    <GuestRoutes
                        path="/register"
                        component={Register}
                    ></GuestRoutes>
                    <GuestRoutes
                        path="/private"
                        component={Unauthenticated}
                    ></GuestRoutes>

                    <MemberRoutes
                        exact
                        path="/"
                        component={MyClass}
                    ></MemberRoutes>
                    <MemberRoutes
                        exact
                        path="/joined/:class"
                        component={Joined}
                    ></MemberRoutes>
                    <MemberRoutes
                        exact
                        path="/courses/:class/:chapter/:uid"
                        component={DetailsClass}
                    ></MemberRoutes>
                    <MemberRoutes
                        exact
                        path="/courses/:class/"
                        component={DetailsClass}
                    ></MemberRoutes>
                    <MemberRoutes
                        path="/settings"
                        component={Settings}
                    ></MemberRoutes>

                    <Route path="*" component={NotFound}></Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;
