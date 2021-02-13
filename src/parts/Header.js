import React from "react";

import propTypes from "prop-types";

import { ReactComponent as Logo } from "../assets/images/logo.svg";

import { Link, withRouter } from "react-router-dom";

function Header({ onLight, location }) {
    const linkColor = onLight ? "text-gray-900" : "text-white";

    const linkCTA =
        location.pathname.indexOf("/login") > -1 ? `/register` : `/login`;

    const textCTA =
        location.pathname.indexOf("/login") > -1 ? "Daftar" : "Masuk";

    return (
        <header className="flex justify-between items-center">
            <div style={{ height: 54 }}>
                <Logo className={onLight ? "on-light" : "on-dark"}></Logo>
            </div>
            <ul className="flex">
                <li>
                    <a
                        href={process.env.REACT_APP_FRONTPAGE_URL}
                        className={[
                            linkColor,
                            "text-white hover:text-teal-500 text-lg px-6 py-3 font-medium",
                        ].join(" ")}
                    >
                        Home
                    </a>
                </li>
                <li>
                    <a
                        href={process.env.REACT_APP_FRONTPAGE_URL}
                        className={[
                            linkColor,
                            "text-white hover:text-teal-500 text-lg px-6 py-3 font-medium",
                        ].join(" ")}
                    >
                        Pricing
                    </a>
                </li>
                <li>
                    <a
                        href={process.env.REACT_APP_FRONTPAGE_URL}
                        className={[
                            linkColor,
                            "text-white hover:text-teal-500 text-lg px-6 py-3 font-medium",
                        ].join(" ")}
                    >
                        Features
                    </a>
                </li>
                <li>
                    <a
                        href={process.env.REACT_APP_FRONTPAGE_URL}
                        className={[
                            linkColor,
                            "text-white hover:text-teal-500 text-lg px-6 py-3 font-medium",
                        ].join(" ")}
                    >
                        Story
                    </a>
                </li>
                <li>
                    <Link
                        to={linkCTA}
                        className="bg-indigo-700 hover:bg-indigo-800 transition-all duration-200 text-white hover:text-teal-500 text-lg px-6 py-3 font-medium ml-6"
                    >
                        {textCTA}
                    </Link>
                </li>
            </ul>
        </header>
    );
}

Header.prototype = {
    onLight: propTypes.bool,
};

export default withRouter(Header);
