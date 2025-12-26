"use client";

import { Provider } from "react-redux";
import AuthInitializer from "./protaction/AuthInitializer.jsx";
import "@/utils/axiosClient";
import { store } from "@/store";
import ToastProvider from "./ToastProvider.jsx";

const Providers = ({ children }) => {
    return (
        <Provider store={store}>
            <AuthInitializer />
            <ToastProvider /> 
            {children}
        </Provider>
    );
};

export default Providers;
