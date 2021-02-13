import {
    STATUS_COURSES,
    FETCH_COURSES,
    WATCH_COURSES,
    MESSAGE_COURSES,
} from "constants/types/courses";

export const statusCourses = (status) => ({
    type: STATUS_COURSES,
    payload: status,
});

export const fetchCourses = (courses) => ({
    type: FETCH_COURSES,
    payload: courses,
});

export const watchCourse = (course) => ({
    type: WATCH_COURSES,
    payload: course,
});

export const messageCourse = (message) => ({
    type: MESSAGE_COURSES,
    payload: message,
});
