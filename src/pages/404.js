import React from "react";
import { Link } from "react-router-dom";

export const NotFound = ({ history }) => {
    return (
        <section className="h-screen flex flex-col items-center">
            <img
                src={`${process.env.PUBLIC_URL}/assets/images/404.png`}
                alt="page not found"
            />
            <h1 className="text-3xl text-gray-900 mt-12">Opps! We're lost</h1>
            <p className="text-lg text-gray-600 mt-4 mb-8 lg:w-3/12 xl:w-2/12 mx-auto text-center">
                The page that your requested is not found in our system
            </p>

            <Link
                className="bg-orange-500 hover:bg-orange-400 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3 mt-4 "
                to="/"
            >
                Back To Home
            </Link>
        </section>
    );
};
