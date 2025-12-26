"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { signupUser } from "@/store/auth/authThunks";

const PasswordReset = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { loading } = useSelector(s => s.auth);

    const [form, setForm] = useState({
        email: "",
    });

    const handleChange = (e) =>
        setForm(p => ({ ...p, [e.target.name]: e.target.value }));

    return (
        <div className="flex items-center justify-center bg-gray-100  px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Reset Your Password
                </h2>

                <form  className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>


                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-4 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white py-2 font-medium  transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? "Creating Account..." : "Sign Up"}
                    </button>
                </form>

                <p className="text-sm text-center text-gray-500 mt-6">
                    Already have an account?
                    <span
                        onClick={() => router.push("/auth/login")}
                        className="text-blue-600 cursor-pointer ml-1 hover:underline"
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default PasswordReset;
