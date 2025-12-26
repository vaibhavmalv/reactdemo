"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import PublicHeader from "./PublicHeader";
import UserHeader from "./UserHeader";
import ManagerHeader from "./ManagerHeader";
import AdminHeader from "./AdminHeader";

export default function Header() {
    const { user, role, token } = useSelector(state => state.auth);
    const [mounted, setMounted] = useState(false);
    const [resolvedUser, setResolvedUser] = useState(null);
    const [resolvedRole, setResolvedRole] = useState(null);

    useEffect(() => {
        setMounted(true);

        const storedUser = localStorage.getItem("user");
        const storedRole = localStorage.getItem("role");

        setResolvedUser(user ?? (storedUser ? JSON.parse(storedUser) : null));
        setResolvedRole(role ?? storedRole);
    }, [user, role]);

    // Render a stable public header on first render to avoid SSR/CSR mismatches
    if (!token && !resolvedUser) {
        return <PublicHeader />;
    }

    if (resolvedRole === "admin") {
        return <AdminHeader user={resolvedUser} />;
    }

    if (resolvedRole === "manager") {
        return <ManagerHeader user={resolvedUser} />;
    }

    return <UserHeader user={resolvedUser} />;
}
