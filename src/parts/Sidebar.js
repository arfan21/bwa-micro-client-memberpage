import React from "react";

import { ReactComponent as DefaultUser } from "assets/images/default-avatar.svg";
import { useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";

const Sidebar = ({ match, history }) => {
    const getNavLinkClass = (path) => {
        return match.path === path
            ? "active text-white bg-indigo-900"
            : "text-indigo-500";
    };

    const logout = () => {
        history.push("/login");
        localStorage.removeItem("MICRO:token");
        document.cookie =
            "MICRO:user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    };

    const user = useSelector((state) => state.users);
    return (
        <aside
            className="bg-indigo-1000 max-h-screen h-screen overflow-y-auto"
            style={{ width: 280 }}
        >
            <div
                className="max-h-screen h-screen fixed bg-indigo-1000 flex flex-col content-between"
                style={{ width: 280 }}
            >
                <div className="flex flex-col text-center mt-8">
                    <div className="border border-indigo-500 mx-auto p-2 inline-flex rounded-full overflow-hidden mb-3">
                        {user?.avatar ? (
                            <img
                                src={user?.avatar}
                                alt={user?.name}
                                style={{ width: 90, height: 90 }}
                            />
                        ) : (
                            <DefaultUser
                                className="fill-indigo-500"
                                style={{ width: 90, height: 90 }}
                            ></DefaultUser>
                        )}
                    </div>
                    <h6 className="text-white text-xl">
                        {user?.name ?? "Username"}
                    </h6>
                    <span className="text-indigo-500 text-sm">
                        {user?.profession ?? "Profession"}
                    </span>
                </div>

                <ul className="main-menu mt-12">
                    <li>
                        <Link
                            className={[
                                "nav-link relative flex items-center py-3 px-5 transition-all duration-200 hover:text-white active:text-white focus:outline-none w-full text-left",
                                getNavLinkClass("/"),
                            ].join(" ")}
                            to="/"
                        >
                            My Class
                        </Link>
                    </li>
                    <li>
                        <a
                            className={[
                                "nav-link relative flex items-center py-3 px-5 transition-all duration-200 hover:text-white active:text-white focus:outline-none w-full text-left",
                                getNavLinkClass("/courses"),
                            ].join(" ")}
                            href={`${process.env.REACT_APP_FRONTPAGE_URL}/courses`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Library
                        </a>
                    </li>
                    <li>
                        <Link
                            className={[
                                "nav-link relative flex items-center py-3 px-5 transition-all duration-200 hover:text-white active:text-white focus:outline-none w-full text-left",
                                getNavLinkClass("/transactions"),
                            ].join(" ")}
                            to="/transactions"
                        >
                            Transactions
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={[
                                "nav-link relative flex items-center py-3 px-5 transition-all duration-200 hover:text-white active:text-white focus:outline-none w-full text-left",
                                getNavLinkClass("/settings"),
                            ].join(" ")}
                            to="/settings"
                        >
                            Settings
                        </Link>
                    </li>
                </ul>
                <div className="my-auto"></div>
                <ul className="main-menu mt-12">
                    <li>
                        <button
                            onClick={logout}
                            className={[
                                "nav-link relative flex items-center py-3 px-5 transition-all duration-200 hover:text-white active:text-white focus:outline-none w-full text-left text-indigo-500",
                            ].join(" ")}
                        >
                            Log Out
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default withRouter(Sidebar);
