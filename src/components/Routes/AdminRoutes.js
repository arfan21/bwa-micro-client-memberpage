import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";

const AdminRoutes = ({
    component: Component,
    match,
    path,
    location,
    ...rest
}) => {
    const ok = localStorage.getItem("MICRO:token");
    const user = useSelector((state) => state.users);

    return (
        <Route
            {...rest}
            render={(props) =>
                ok && user?.role === "admin" ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={`/*`} />
                )
            }
        />
    );
};

export default withRouter(AdminRoutes);
