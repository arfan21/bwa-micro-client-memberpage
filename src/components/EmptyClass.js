import React from "react";

export const EmptyClass = () => {
    return (
        <section className="flex h-screen items-center">
            <div className="w-5/12 text-center py-12 mx-auto">
                <img
                    src={`${process.env.PUBLIC_URL}/assets/images/emptycourse.png`}
                    alt="you are class is empty"
                />
                <h1 className="text-3xl text-gray-900 mt-12">Time to Invest</h1>
                <p className="text-lg text-gray-600 mt-4 mb-8 mx-auto text-center">
                    it seems you don't have any class yet so let's get them and
                    grow your skills
                </p>

                <a
                    href={`${process.env.REACT_APP_FRONTPAGE_URL}/courses`}
                    target="_black"
                    rel="noopener noreferrer"
                    className="bg-orange-500 hover:bg-orange-400 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3 mt-4 "
                >
                    Cari Kelas
                </a>
            </div>
        </section>
    );
};
