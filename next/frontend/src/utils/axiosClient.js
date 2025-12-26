import axios from "axios";
import { store } from "../store";
import { logout } from "../store/auth/authSlice";
import { API_BASE } from "@/constants/api";

const client = axios.create({ baseURL: API_BASE });

client.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    // const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    // const apiKey = "1234567890";

    // config.headers = {
    //     ...config.headers,
    //     ...(token ? { Authorization: "Bearer " + token } : {}),
    //     ...(apiKey ? { "x-api-key": apiKey } : {}),
    // };

    return config;
});

client.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            try {
                localStorage.setItem("sessionExpired", "1");
                store.dispatch(logout());
                window.location.href = "/auth/login";
            } catch (e) {
                console.error("Error handling 401", e);
            }
        }

        return Promise.reject(error);
    }
);

export default client;
