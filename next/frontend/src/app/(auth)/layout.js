'use client'
import React from 'react';
import GuestRoute from '@/components/protaction/GuestRoute';

function Layout({ children }) {
  return (
    <GuestRoute>
      <div className="grid grid-cols-1 md:grid-cols-2 h-[90dvh]">
        {/* <Image
          src={loginIllustration}
          alt="Login Illustration"
          className="object-cover h-full w-full"
          priority
        /> */}
        <div className="hidden md:flex items-center justify-center relative  bg-indigo-500 ">
          <div className="absolute inset-0 "></div>
          <div className="absolute text-white text-center p-8">
            <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
            <p className="text-lg">Sign in to access your dashboard</p>
          </div>
        </div>

        {/* Right side login form */}
        <>
          {children}
        </>
      </div>
    </GuestRoute>
  );
}

export default Layout;
