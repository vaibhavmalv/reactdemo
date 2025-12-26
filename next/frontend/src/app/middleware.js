import { NextResponse } from "next/server";

export function middleware(req) {
    const token = req.cookies.get("token")?.value;
    const role = req.cookies.get("role")?.value;
    const pathname = req.nextUrl.pathname;


       console.log("MIDDLEWARE CHECK:", { token, role });

    // 🔐 Auth pages
    if (pathname.startsWith("/auth")) {
        if (token) {
            return NextResponse.redirect(
                new URL("/profile", req.url)
            );
        }
        return NextResponse.next();
    }

    // 🚫 Not logged in
    if (!token) {
        return NextResponse.redirect(
            new URL("/auth/login?sessionExpired=1", req.url)
        );
    }

    // 🛡️ Role-based access
    if (pathname.startsWith("/admin-panel") && role !== "admin") {
        return NextResponse.redirect(
            new URL("/unauthorized", req.url)
        );
    }

    if (pathname.startsWith("/manager-panel") && role !== "manager") {
        return NextResponse.redirect(
            new URL("/unauthorized", req.url)
        );
    }

    if (pathname.startsWith("/profile") && role !== "user") {
        return NextResponse.redirect(
            new URL("/unauthorized", req.url)
        );
    }

    return NextResponse.next();
}
