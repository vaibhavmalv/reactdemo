"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function GuestRoute({ children }) {
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        if (token) {

            window.location.href = "/";
        }
    }, [token]);

    // If user is logged in, don't show the page
    if (token) return null;

    return <>{children}</>;
}
