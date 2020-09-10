import React from "react";
import Sidebar from "parts/Sidebar";
import { EmptyClass } from "components/EmptyClass";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
    statusCourses,
    fetchCourses,
    messageCourse,
} from "store/actions/courses";
import courses from "constants/api/courses";
import { ListClassItem } from "parts/ListClassItem";
import { Loading } from "parts/Loading";

export const MyClass = () => {
    const dispatch = useDispatch();
    const COURSES = useSelector((state) => state.courses);

    useEffect(() => {
        window.scroll(0, 0);
        document.title = "MICRO | My Class";

        dispatch(statusCourses("loading"));
        courses
            .mine()
            .then((res) => {
                dispatch(fetchCourses(res.data));
            })
            .catch((err) => {
                console.log(err);
                dispatch(
                    messageCourse(err?.response?.data?.message ?? "error")
                );
            });
    }, [dispatch]);

    return (
        <div className="flex">
            <Sidebar></Sidebar>
            <main className="flex-1">
                <div className="px-16">
                    {COURSES?.status === "loading" && <Loading></Loading>}
                    {COURSES?.status === "error" && COURSES.message}
                    {COURSES?.status === "ok" &&
                        (COURSES.total > 0 ? (
                            <>
                                <section className="flex flex-col mt-8">
                                    <h1 className="text-4xl text-gray-900 font-medium">
                                        My Class
                                    </h1>
                                    <p className="text-lg text-gray-600">
                                        Continue learning to pursue your dreams
                                    </p>
                                </section>
                                <section className="flex flex-col mt-8">
                                    <div className="flex justify-start items center -mx-4">
                                        {Object.values(COURSES.data)?.map?.(
                                            (item, index) => {
                                                return (
                                                    <ListClassItem
                                                        data={item.course}
                                                        key={index}
                                                    ></ListClassItem>
                                                );
                                            }
                                        )}
                                    </div>
                                </section>
                            </>
                        ) : (
                            <EmptyClass></EmptyClass>
                        ))}
                </div>
            </main>
        </div>
    );
};
