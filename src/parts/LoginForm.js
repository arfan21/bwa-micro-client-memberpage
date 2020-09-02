import React from "react";
import users from "constants/api/users";

import { setAuthorizationHeader } from "configs/axios";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { populateProfile } from "store/actions/users";
import useForm from "helpers/hooks/useForm";

const LoginForm = ({ history }) => {
    const dispatch = useDispatch();

    const [{ email, password }, setState, newState] = useForm({
        email: "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();

        users
            .login({ email, password })
            .then((res) => {
                setAuthorizationHeader(res.data.token);

                users.details().then((detail) => {
                    dispatch(populateProfile(detail.data));

                    const production =
                        process.env.REACT_APP_FRONTPAGE_URL ===
                        "https://micro.arfantest-server.site"
                            ? "Domain = micro.arfantest-server.site"
                            : "";

                    localStorage.setItem(
                        "MICRO:token",
                        JSON.stringify({ ...res.data, email: email })
                    );

                    const redirect = localStorage.getItem("MICRO:redirect");
                    const userCookie = {
                        name: detail.data.name,
                        thumbnail: detail.data.avatar,
                    };

                    const expires = new Date(
                        new Date().getTime() * 7 * 24 * 60 * 60 * 1000
                    );

                    document.cookie = `MICRO:user=${JSON.stringify(
                        userCookie
                    )}; expires=${expires.toUTCString()}; path=/; ${production}`;

                    history.push(redirect || "/");
                });
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="flex justify-center items-center pb-24">
            <div className="w-3/12">
                <h1 className="text-4xl text-gray-900 mb-6">
                    <span className="font-bold">Continue</span> Study, <br />
                    Finish Your <span className="font-bold">Goals</span>
                </h1>
                <form onSubmit={submit}>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="email" className="text-lg mb-2">
                            Email Address
                        </label>
                        <input
                            name="email"
                            type="email"
                            className="bg-white focus:outline-none border px-6 py-3 w-1/2 border-gray-600 focus:border-teal-500 w-full"
                            placeholder="your email address"
                            value={email}
                            onChange={setState}
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="password" className="text-lg mb-2">
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            className="bg-white focus:outline-none border px-6 py-3 w-1/2 border-gray-600 focus:border-teal-500 w-full"
                            placeholder="your password"
                            value={password}
                            onChange={setState}
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-400 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3 mt-4 w-full"
                    >
                        Login
                    </button>
                </form>
            </div>
            <div className="w-1/12"></div>
            <div className="w-5/12 flex justify-end pt-24 ">
                <div className="relative" style={{ width: 369, height: 440 }}>
                    <div
                        className="absolute border-indigo-700 border-2 -mt-8 -ml-16 left-0 "
                        style={{ width: 324, height: 374 }}
                    ></div>
                    <div className="absolute w-full h-full -mb-8 -ml-8">
                        <img src="assets/images/foto-login.png" alt="tamara" />
                    </div>
                    <div
                        className="absolute z-10 bg-white py-3 px-4 -mr-12 bottom-0 right-0"
                        style={{ transform: "translateY(40%)", width: 290 }}
                    >
                        <p className="text-gray-900 mb-2">
                            Semua sudah terarah dengan <br /> baik dan perlu
                            ikuti saja
                        </p>
                        <p className="text-gray-600">Tamara, UX Designer</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(LoginForm);