import axios from "axios";
import { store } from "../store";
import { logout } from "../store/auth/authSlice";

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && error.response?.data?.expired) {

            // Show alert message
            alert("Your session has expired. Please login again.");

            // Remove token + user data
            store.dispatch(logout());

            // Redirect to home/login
            window.location.href = "/";
        }

        return Promise.reject(error);
    }
);
