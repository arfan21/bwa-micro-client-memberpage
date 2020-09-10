import axios from "configs/axios";

export default {
    detail: (id) => axios.get(`/courses/${id}`).then((res) => res.data),

    join: (id) => axios.post(`/my-courses`, { course_id: id }),
    mine: () => axios.get(`/my-courses`),
};
