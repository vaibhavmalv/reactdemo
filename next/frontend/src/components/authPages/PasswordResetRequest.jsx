"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { requestPasswordReset } from "@/store/auth/authThunks";
import { toast } from "react-toastify";

const PasswordResetRequest = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { loading } = useSelector((s) => s.auth);

    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(requestPasswordReset({ email }));
        if (requestPasswordReset.fulfilled.match(result)) {
            toast.success(result.payload.message || 'Reset link sent');
            setTimeout(() => router.push('/auth/login'), 1400);
        } else {
            toast.error(result.payload || result.error?.message || 'Error');
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Password Reset</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>

                <p className="text-sm text-center text-gray-500 mt-6">
                    Remembered your password?{' '}
                    <span onClick={() => router.push('/auth/login')} className="text-blue-600 cursor-pointer ml-1 hover:underline">Login</span>
                </p>
            </div>
        </div>
    );
};

export default PasswordResetRequest;
