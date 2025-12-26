'use client';

import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import useIsMounted from '../../../lib/useIsMounted';
import { toast } from 'react-toastify';

const HomeMain = () => {
    const { user, loading } = useSelector((state) => state.auth);
    const isMounted = useIsMounted();
    const isAuth = isMounted && !!user;

    const showClockToast = () => {
        const time = new Date().toLocaleTimeString();
        toast.success(`Toast working 🕒 ${time}`);
    };

    return (
        
        <section className="bg-gradient-to-r from-blue-50 to-white py-16">
            <button
                onClick={showClockToast}
                className="px-4 py-2 bg-green-600 text-white rounded"
            >
                Show Clock Toast
            </button>
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl font-bold mb-4">
                    Welcome to YourApp
                </h1>

                <p className="max-w-2xl mx-auto text-gray-600 mb-6">
                    A clean, modern UI built with Tailwind — easy to extend and beautiful by default.
                </p>

                <div className="flex justify-center gap-4">
                    {/* Guest user (rendered on SSR and before mount to avoid hydration mismatch) */}
                    {!isAuth && !loading && (
                        <Link
                            href="/auth/sign-up"
                            className="px-6 py-3 bg-indigo-600 text-white rounded hover:bg-blue-700"
                        >
                            Get started
                        </Link>
                    )}

                    {/* Logged-in user (only shown after client mount to avoid hydration mismatch) */}
                    {isAuth && (
                        <Link
                            href="/profile"
                            className="px-6 py-3 bg-indigo-600 text-white rounded hover:bg-blue-700"
                        >
                            My Profile
                        </Link>
                    )}

                    {/* Always visible */}
                    <Link
                        href="/about-us"
                        className="px-6 py-3 border rounded hover:bg-gray-50"
                    >
                        Learn more
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HomeMain;
