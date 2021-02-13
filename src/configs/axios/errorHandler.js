import { toast } from "react-toastify";
import users from "constants/api/users";
import axios, { setAuthorizationHeader } from "./index";
import history from "utils/history";

export default async function errorHandler(error) {
    let message;

    if (error.response) {
        const originalRequest = error.config;

        if (error.response.status === 500) {
            message = "Something went terribly wrong";
        } else if (error.response.status === 403 && !originalRequest._retry) {
            try {
                if (originalRequest.url === "/refresh-tokens")
                    throw new Error("refresh tokens expired");

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
            } catch (error) {
                message = error;

                localStorage.removeItem("MICRO:token");
                document.cookie =
                    "MICRO:user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
                history.push("/login");
            }
        } else {
            message = error.response.data.message;
        }

        if (typeof message === "string") toast.error(message);

        return Promise.reject(error);
    }
}
