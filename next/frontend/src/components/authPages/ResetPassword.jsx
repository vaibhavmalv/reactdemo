"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "@/store/auth/authThunks";
import { toast } from "react-toastify";

const ResetPassword = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const params = useParams();
    const token = params?.token;
    const { loading } = useSelector((s) => s.auth);

    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirm) return toast.error('Passwords do not match');
        const result = await dispatch(resetPassword({ token, password }));
        if (resetPassword.fulfilled.match(result)) {
            toast.success(result.payload.message || 'Password updated');
            setTimeout(() => router.push('/auth/login'), 1200);
        } else {
            toast.error(result.payload || result.error?.message || 'Error');
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Set New Password</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">New Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="New password"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Confirm Password</label>
                        <input
                            type="password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            placeholder="Confirm password"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-4 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white py-2 font-medium  transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Updating...' : 'Update Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
