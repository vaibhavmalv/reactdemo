"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function RoleGuard({ allow = [], children }) {
    const router = useRouter();
    const { token, role } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!token) {
            router.replace("/auth/login");
            return;
        }

        if (allow.length && !allow.includes(role)) {
            router.replace("/unauthorized");
        }
    }, [token, role, allow, router]);

    if (!token) return null;
    if (allow.length && !allow.includes(role)) return null;

    return children;
}
