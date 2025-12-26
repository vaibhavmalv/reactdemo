"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
    const router = useRouter();
    const { token } = useSelector(state => state.auth);

    useEffect(() => {
        if (!token) {
            router.replace("/auth/login");
        }
    }, [token, router]);

    if (!token) return null;

    return children;
}
