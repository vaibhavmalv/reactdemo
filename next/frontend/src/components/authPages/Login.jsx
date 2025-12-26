"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { loginUser } from "@/store/auth/authThunks";
import Link from "next/link";
import { toast } from "react-toastify";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();
    const sessionExpired = searchParams.get("sessionExpired");

    const { loading, error } = useSelector((state) => state.auth);

const handleSubmit = async (e) => {
    e.preventDefault();

    const resultAction = await dispatch(
        loginUser({ email, password })
    );

    if (loginUser.fulfilled.match(resultAction)) {
        const role = resultAction.payload.user.role;
        toast.success("Login success", { autoClose: 1500 });

        setTimeout(() => {
            if (role === "admin") {
                router.push("/admin-panel");
            } else if (role === "manager") {
                router.push("/manager-panel");
            } else {
                router.push("/profile");
            }
        }, 1600);
    } else {
        
        toast.error(
            resultAction.payload?.message || "Login failed",
            { autoClose: 2000 }
        );
    }
};


    return (
        <div className=" flex items-center justify-center  bg-gray-100  px-4">
            <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Welcome Back
                </h2>

                {sessionExpired && (
                    <p className="text-yellow-600 text-center mb-4">Your session has expired. Please login again.</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-lg transition duration-300"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>

                     {error && (
                        <p className="text-red-500 text-center mt-2">{error}</p>
                    )} 
                </form>

                <p className="text-center text-gray-500 mt-6">
                    Don’t have an account?{" "}
                    <Link href="/auth/sign-up" className="text-indigo-500 font-semibold hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
