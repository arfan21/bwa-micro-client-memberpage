import React, { useEffect } from "react";
import users from "constants/api/users";

import { setAuthorizationHeader } from "configs/axios";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { populateProfile } from "store/actions/users";
import useForm from "helpers/hooks/useForm";
import fieldsErrors from "helpers/fieldsErrors";
import { useState } from "react";
import { Input } from "components/form/input";
import Validator from "fastest-validator";

const LoginForm = ({ history }) => {
    const dispatch = useDispatch();

    const v = new Validator();

    const schemeEmail = { email: "email|empty:false" };
    const schemePassword = { password: "string|min:6|empty:false" };

    const checkEmail = v.compile(schemeEmail);
    const checkPassword = v.compile(schemePassword);

    const [state, setState] = useForm({
        email: "",
        password: "",
    });

    const [Errors, setErrors] = useState(() => null);
    const [isNotFound, setisNotFound] = useState(() => false);
    const [isDisabled, setIsDisabled] = useState(() => true);

    const checkIsDisabled = () => {
        if (
            !checkEmail({ email: state.email }).length &&
            !checkPassword({ password: state.password }).length
        ) {
            return setIsDisabled(false);
        }
        return setIsDisabled(true);
    };

    useEffect(() => {
        checkIsDisabled();
    });

    const ERRORS = fieldsErrors(Errors);

    const submit = async (e) => {
        e.preventDefault();

        try {
            const dataFromLogin = await users.login({
                email: state.email,
                password: state.password,
            });
            setAuthorizationHeader(dataFromLogin.data.token);

            const user = await users.details();
            dispatch(populateProfile(user.data));

            const production =
                process.env.REACT_APP_FRONTPAGE_URL ===
                "https://micro.arfantest-server.site"
                    ? `Domain = ${process.env.REACT_APP_FRONTPAGE_URL}`
                    : "";

            localStorage.setItem(
                "MICRO:token",
                JSON.stringify({ ...dataFromLogin.data, email: state.email })
            );

            const redirect = localStorage.getItem("MICRO:redirect");
            const userCookie = {
                name: user.data.name,
                thumbnail: user.data.avatar,
            };

            const expires = new Date(
                new Date().getTime() * 7 * 24 * 60 * 60 * 1000
            );

            document.cookie = `MICRO:user=${JSON.stringify(
                userCookie
            )}; expires=${expires.toUTCString()}; path=/; ${production}`;

            history.push(redirect || "/");
        } catch (error) {
            if (error?.response?.status === 404) setisNotFound(true);
            setErrors(error?.response?.data?.message ?? "error");
        }
    };

    return (
        <div className="flex justify-center items-center pb-24">
            <div className="w-3/12">
                <h1 className="text-4xl text-gray-900 mb-6">
                    <span className="font-bold">Continue</span> Study, <br />
                    Finish Your <span className="font-bold">Goals</span>
                </h1>
                <form onSubmit={submit}>
                    {isNotFound ? (
                        <span className="text-red-500 text-xl mb-2">
                            Incorrect email or password
                        </span>
                    ) : (
                        ""
                    )}
                    <Input
                        errors={
                            ERRORS?.email?.message ?? state.email
                                ? checkEmail({ email: state.email })?.[0]
                                      ?.message
                                : ""
                        }
                        inputType="email"
                        labelName="Email Address"
                        name="email"
                        placeholder="Your Email Address"
                        onChange={setState}
                        value={state.email}
                    ></Input>

                    <Input
                        errors={
                            ERRORS?.password?.message ?? state.password
                                ? checkPassword({
                                      password: state.password,
                                  })?.[0]?.message
                                : ""
                        }
                        inputType="password"
                        labelName="Password"
                        name="password"
                        placeholder="Your Password"
                        onChange={setState}
                        value={state.password}
                    ></Input>

                    <button
                        type="submit"
                        className={[
                            "hover:bg-orange-400 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3 mt-4 w-full",
                            isDisabled ? "bg-orange-400" : "bg-orange-500",
                        ].join(" ")}
                        disabled={isDisabled}
                    >
                        Masuk
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
