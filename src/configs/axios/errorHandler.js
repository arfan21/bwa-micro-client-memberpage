import { toast } from "react-toastify";
import users from "constants/api/users";
import axios, { setAuthorizationHeader } from "./index";

export default async function errorHandler(error) {
    if (error) {
        let message;
        if (error.response) {
            const originalRequest = error.config;

            if (error.response.status === 500) {
                message = "Something went terribly wrong";
            } else if (
                error.response.status === 403 &&
                !originalRequest._retry
            ) {
                originalRequest._retry = true;
                const session = localStorage["MICRO:token"]
                    ? JSON.parse(localStorage["MICRO:token"])
                    : null;
                const resNewToken = await users
                    .refresh({
                        refresh_token: session.refresh_token,
                        email: session.email,
                    })
                    .then((res) => res.data);
                if (resNewToken) {
                    setAuthorizationHeader(resNewToken.token);
                    localStorage.setItem(
                        "MICRO:token",
                        JSON.stringify({
                            ...session,
                            token: resNewToken.token,
                        })
                    );
                    originalRequest.headers.authorization = resNewToken.token;
                    return axios(originalRequest);
                } else {
                    window.location.href = "login";
                    localStorage.removeItem("MICRO:token");
                    document.cookie =
                        "MICRO:user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
                }
            } else {
                message = error.response.data.message;
            }

            if (typeof message === "string") toast.error(message);

            return Promise.reject(error);
        }
    }
}
