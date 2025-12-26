"use client";

import Link from "next/link";
import { useDispatch } from "react-redux";
import { logout } from "@/store/auth/authSlice";

export default function UserHeader({ user }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/";
  };

  const initials = user?.name ? user.name.split(" ").map(n => n[0]).join("") : "U";

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center gap-6">
        <Link href="/" className="text-2xl font-bold">YourApp</Link>

        <nav className="hidden md:flex gap-6">
          <Link href="/">Home</Link>
          {user?.role === 'admin' && <Link href="/admin-panel">Admin Panel</Link>}
          {user?.role === 'user' && <Link href="/manager-panel">My Account</Link>}
          <Link href="/contact-us">Contact</Link>
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <div className="flex flex-col text-right">
            <span className="font-semibold">{user?.name}</span>
            <span className="text-xs text-gray-500">{user?.email}</span>
          </div>

          <div className="h-10 w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
            {initials}
          </div>

          <button onClick={handleLogout} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Logout</button>
        </div>
      </div>
    </header>
  );
}

