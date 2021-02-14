import React, { useState, useCallback } from "react";

import { useEffect } from "react";
import courses from "constants/api/courses";
import { Loading } from "parts/Loading";
import { ServerError } from "./500";
import { Link } from "react-router-dom";

export const Joined = ({ history, match }) => {
    const [state, setState] = useState(() => ({
        isLoading: true,
        isError: false,
        data: {},
    }));

    const joining = useCallback(async () => {
        try {
            const details = await courses.detail(match.params.class);
            const joined = await courses.join(match.params.class);

            if (joined.data.snap_url) window.location = joined.data.snap_url;
            else setState({ isLoading: false, isError: false, data: details });
        } catch (error) {
            if (error?.response?.data?.message === "user already taken")
                history.push(`/courses/${match.params.class}`);
            setState({ isLoading: false, isError: true, data: null });
        }
    }, [match.params.class]);

    useEffect(() => {
        joining();
    }, [joining]);

    if (state.isLoading) return <Loading></Loading>;
    if (state.isError) return <ServerError></ServerError>;

    return (
        <section className="h-screen flex flex-col items-center">
            <img
                src={`${process.env.PUBLIC_URL}/assets/images/joined.png`}
                alt="you are success joined class"
            />
            <h1 className="text-3xl text-gray-900 mt-12">Welcome to Class</h1>
            <p className="text-lg text-gray-600 mt-4 mb-8 lg:w-4/12 xl:w-3/12 mx-auto text-center">
                You have successfully joined our{" "}
                <strong>{state?.data?.name ?? "Class Name"}</strong> class
            </p>

            <Link
                to={`/courses/${match.params.class}`}
                className="cursor-pointer bg-orange-500 hover:bg-orange-400 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3 mt-4 "
            >
                Start learn
            </Link>
        </section>
    );
};
