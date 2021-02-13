import React, { useState } from "react";

import { useEffect } from "react";
import courses from "constants/api/courses";
import { Loading } from "parts/Loading";
import { ServerError } from "./500";

export const Joined = ({ history, match }) => {
    const [state, setState] = useState(() => ({
        isLoading: true,
        isError: false,
        data: {},
    }));

    console.log(match);

    useEffect(() => {
        courses.join(match.params.class);

        courses
            .detail(match.params.class)
            .then((res) =>
                setState({ isLoading: false, isError: false, data: res })
            )
            .catch((err) =>
                setState({ isLoading: false, isError: true, data: null })
            );
    }, [match.params.class]);

    if (state.isLoading) return <Loading></Loading>;
    if (state.isError) return <ServerError></ServerError>;

    const joining = () => {
        history.push(`/courses/${match.params.class}`);
        // courses
        //     .join(match.params.class)
        //     .then((res) => {
        //         history.push(`/courses/${match.params.class}`);
        //     })
        //     .catch((err) => {
        //         if (
        //             err?.response?.data?.message ===
        //             "user already take this course"
        //         ) {
        //             history.push(`/courses/${match.params.class}`);
        //         }
        //     });
    };
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

            <span
                onClick={joining}
                className="cursor-pointer bg-orange-500 hover:bg-orange-400 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3 mt-4 "
            >
                Start learn
            </span>
        </section>
    );
};
