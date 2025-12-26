"use client";

import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setUserFromStorage, logout } from "@/store/auth/authSlice";
import {
    fetchUserProfile,
    fetchUserInfo,
    fetchContact
} from "@/store/user/userThunks";

const SESSION_TIME = 15 * 60 * 1000; // 15 minutes

export default function AuthInitializer() {
    const dispatch = useDispatch();
    const timeoutRef = useRef(null);

    const handleExpire = () => {
        try {
            localStorage.setItem("sessionExpired", "1");

            // clear everything
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("role");
            localStorage.removeItem("tokenExpiry");

            dispatch(logout());

            window.location.replace("/auth/login");
        } catch (err) {
            console.error("Session expire error", err);
        }
    };

    const setupExpiry = () => {
        const expiry = localStorage.getItem("tokenExpiry");

        if (!expiry) {
            handleExpire();
            return;
        }

        const remaining = Number(expiry) - Date.now();

        if (remaining <= 0) {
            handleExpire();
            return;
        }

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(handleExpire, remaining);
    };

    useEffect(() => {
        try {
            const user = localStorage.getItem("user");
            const token = localStorage.getItem("token");
            const role = localStorage.getItem("role");

            if (!user || !token) return;

            const parsedUser = JSON.parse(user);

            dispatch(
                setUserFromStorage({
                    user: parsedUser,
                    token,
                    role: role || parsedUser?.role || null,
                })
            );

            dispatch(fetchUserProfile());
            dispatch(fetchUserInfo());
            dispatch(fetchContact());

            setupExpiry();

            // 🔁 Sync across tabs
            const onStorage = (e) => {
                if (e.key === "tokenExpiry") setupExpiry();

                if (e.key === "token" && !e.newValue) {
                    dispatch(logout());
                    window.location.replace("/auth/login");
                }
            };

            window.addEventListener("storage", onStorage);

            return () => {
                window.removeEventListener("storage", onStorage);
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
            };
        } catch (err) {
            console.error("Auth init failed", err);
        }
    }, [dispatch]);

    return null;
}
