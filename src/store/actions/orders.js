import {
    STATUS_ORDERS,
    FETCH_ORDERS,
    MESSAGE_ORDERS,
} from "constants/types/orders";

export const statusOrders= (status) => ({
    type: STATUS_ORDERS,
    payload: status,
});

export const fetchOrders= (courses) => ({
    type: FETCH_ORDERS,
    payload: courses,
});

export const messageOrder = (message) => ({
    type: MESSAGE_ORDERS,
    payload: message,
});
