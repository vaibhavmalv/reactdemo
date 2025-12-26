'use client'
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { Provider } from "react-redux";
import { store } from "@/store";
import "./globals.css";
import { Suspense } from "react";
import AuthInitializer from "@/components/protaction/AuthInitializer";
import ToastProvider from "@/components/ToastProvider";
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});


export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Provider store={store}>
                    <AuthInitializer />
                    <Suspense fallback={<><p>loading----</p></>}>
                        <Header />
                        <main>{children}</main>
                        <Footer />
                        <ToastProvider />
                    </Suspense>
                </Provider>
            </body>
        </html>
    );
}
