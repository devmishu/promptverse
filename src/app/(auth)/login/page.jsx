"use client";

import { Check } from "@gravity-ui/icons";
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";


export default function SignInPage() {

    const handleLogin = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const signinData = Object.fromEntries(formData.entries());

        

        const { email, password } = signinData;

        const { data, error } = await authClient.signIn.email({
            email,
            password,
            callbackURL: "/",
        });

       

        if (data) {
            toast.success('Login successfully');
        }
        if (error) {
            toast.error(error.message);
        }
    };

    // google signin
    const signIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
    };

    return (
        <div className="bg-[#030712] text-white min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">

            {/* Decorative Cosmic Glowing Backdrops to match Register/Landing Page ambient vibe */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

            {/* Premium Dynamic Auth Card container */}
            <div className="w-full max-w-md bg-[#111827]/40 border border-[#1e293b]/60 shadow-2xl rounded-3xl p-6 sm:p-8 backdrop-blur-md z-10 transition-all">

                {/* Brand/Header Logo Concept */}
                <div className="flex flex-col items-center justify-center mb-6 text-center select-none">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 mb-3">
                        <svg
                            className="w-5 h-5 text-white"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="16 18 22 12 16 6" />
                            <polyline points="8 6 2 12 8 18" />
                        </svg>
                    </div>
                    <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                        Welcome back
                    </h1>
                    <p className="text-gray-400 text-xs mt-1">
                        Sign in to manage your projects and dashboard
                    </p>
                </div>

                {/* Social Authentication Access */}
                <button
                    type="button"
                    onClick={signIn}
                    className="w-full flex items-center justify-center gap-2 border border-[#1e293b]/80 text-gray-300 bg-[#111827]/30 hover:bg-[#111827]/80 font-semibold px-4 h-11 rounded-xl transition-all text-xs cursor-pointer mb-5 active:scale-[0.99]"
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                            fill="#EA4335"
                            d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582l3.51-3.51C17.642 1.07 14.96 0 12 0 7.354 0 3.307 2.655 1.252 6.533l4.014 3.232z"
                        />
                        <path
                            fill="#4285F4"
                            d="M23.455 12.273c0-.818-.073-1.609-.209-2.373H12v4.5h6.418a5.485 5.485 0 0 1-2.382 3.6l3.714 2.877c2.173-2.005 3.423-4.955 3.423-8.604z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.266 14.235L1.252 17.47A11.944 11.944 0 0 0 12 24c2.96 0 5.641-1.07 7.75-2.895l-3.714-2.877a7.114 7.114 0 0 1-4.036 1.136 7.077 7.077 0 0 1-6.734-5.13z"
                        />
                        <path
                            fill="#34A853"
                            d="M1.252 6.533A11.948 11.948 0 0 0 0 12c0 1.927.455 3.745 1.252 5.468l4.014-3.232a7.042 7.042 0 0 1 0-4.472L1.252 6.533z"
                        />
                    </svg>
                    Sign in with Google
                </button>

                {/* Separator Divider Display */}
                <div className="flex items-center my-4 select-none">
                    <div className="flex-1 h-[1px] bg-[#1e293b]/40" />
                    <span className="text-[10px] text-gray-500 font-bold uppercase px-3 tracking-widest">
                        Or continue with
                    </span>
                    <div className="flex-1 h-[1px] bg-[#1e293b]/40" />
                </div>

                {/* Core Entry Matrix */}
                <Form className="flex w-full flex-col gap-4" onSubmit={handleLogin}>

                    {/* Form Action: Email Account Pointer */}
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label className="text-gray-300 text-xs font-semibold tracking-wide mb-1 inline-block">Email Address</Label>
                        <Input
                            placeholder="john@example.com"
                            className="bg-[#030712]/60 border border-[#1e293b]/80 text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 transition-all duration-200"
                        />
                        <FieldError className="text-red-400 text-xs mt-1 font-medium" />
                    </TextField>

                    {/* Form Action: Absolute Cipher Configuration */}
                    <TextField
                        isRequired
                        name="password"
                        type="password"
                    >

                        <Input
                            placeholder="Enter your password"
                            className="bg-[#030712]/60 border border-[#1e293b]/80 text-white rounded-xl px-4 py-2.5 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 transition-all duration-200"
                        />
                        <FieldError className="text-red-400 text-xs mt-1 font-medium" />
                    </TextField>

                    {/* Execution Operations Matrix */}
                    <div className="flex flex-col gap-3 mt-4">
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold text-sm h-11 rounded-xl shadow-lg shadow-cyan-500/10 hover:opacity-95 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer transition-all"
                        >
                            <Check className="w-4 h-4" />
                            Sign In
                        </Button>

                        <Button
                            type="reset"
                            className="w-full border border-slate-800 bg-[#111827]/20 text-gray-400 hover:text-white hover:bg-slate-900 px-5 h-11 rounded-xl transition-all cursor-pointer text-xs font-medium"
                        >
                            Reset Form
                        </Button>
                    </div>
                </Form>

                {/* Account Creation Redirection Link */}
                <p className="text-center text-xs text-gray-400 mt-6 select-none font-medium">
                    Donot have an account?{" "}
                    <Link
                        href={`/register`}
                        className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors hover:underline ml-0.5"
                    >
                        Sign Up
                    </Link>
                </p>

            </div>
        </div>
    );
}