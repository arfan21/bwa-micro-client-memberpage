import React from "react";

import { ReactComponent as ArrowBack } from "assets/images/arrow_back.svg";

import { Link, withRouter } from "react-router-dom";

const SidebarClass = ({ data, match, defaultUri }) => {
    const getNavLinkClass = (path) => {
        return match.url === path || defaultUri === path
            ? "text-teal-500 "
            : "text-indigo-500";
    };

    const list = [];
    data.chapters.forEach((chapter, i) => {
        list.push(
            <li key={`${chapter.course_id}-${i}`}>
                <span className="nav-header relative block py-3 px-5 bg-indigo-800 text-white text-left">
                    {chapter?.name ?? "Chapter Name"}
                </span>
            </li>
        );
        if (chapter?.lessons?.length > 0) {
            chapter.lessons.forEach((lesson, i2) => {
                list.push(
                    <li key={`${chapter.course_id}-${lesson.id}-${i}`}>
                        <Link
                            className={[
                                " relative flex items-center py-3 px-5 transition-all duration-200 w-full text-left truncate ...",
                                getNavLinkClass(
                                    `/courses/${data.id}/${chapter.id}/${lesson.video}`
                                ),
                            ].join(" ")}
                            to={`/courses/${data.id}/${chapter.id}/${lesson.video}`}
                        >
                            {lesson?.name ?? "Lesson Name"}
                        </Link>
                    </li>
                );
            });
        }
    });

    return (
        <aside
            className="bg-indigo-1000 max-h-screen h-screen overflow-y-auto pt-8"
            style={{ width: 280 }}
        >
            <div
                className="max-h-screen h-screen fixed bg-indigo-1000 flex flex-col content-between"
                style={{ width: 280 }}
            >
                <div
                    className="fixed z-10 bg-indigo-1000 pb-8"
                    style={{ width: 280 }}
                >
                    <Link
                        className="relative flex items-center py-3 px-5 w-full text-left text-white"
                        to="/"
                    >
                        <ArrowBack className="fill-white mr-2"></ArrowBack>
                        Back to home
                    </Link>
                </div>
                <ul className="sidebar-class-list pt-20 pb-14">
                    <li>
                        {/* <Link
                            className="relative flex items-center py-3 px-5 w-full text-left text-white mb-12"
                            to="/"
                        >
                            <ArrowBack className="fill-white mr-2"></ArrowBack>
                            Back to home
                        </Link> */}
                    </li>
                    {list}
                </ul>
            </div>
        </aside>
    );
};

export default withRouter(SidebarClass);
