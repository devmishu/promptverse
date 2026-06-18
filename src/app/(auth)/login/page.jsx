"use client";

import { Check } from "@gravity-ui/icons";
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function SignInPage() {

    const handleLogin = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const signinData = Object.fromEntries(formData.entries());

        console.log(signinData);

        const { email, password } = signinData;

        const { data, error } = await authClient.signIn.email({
            email,
            password,
        });

        console.log("data:", { data, error });

        if (data) {
            toast.success('Login successfully');
            redirect('/')
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
        <div className="bg-[linear-gradient(to_bottom,#f8fafc,#f1f5f9)] dark:bg-[radial-gradient(120%_120%_at_50%_10%,#000000_40%,#1e1b4b_75%,#4c1d95_100%)] text-slate-900 dark:text-neutral-50 min-h-screen w-full transition-colors duration-500 flex items-center justify-center p-4 sm:p-6 lg:p-8">

            {/* Centered Auth Card Overlay Container */}
            <div className="w-full max-w-md bg-white dark:bg-neutral-900/80 border border-slate-200 dark:border-neutral-800/80 shadow-xl rounded-2xl p-6 sm:p-8 backdrop-blur-md transition-all">

                {/* Brand/Header Logo Concept */}
                <div className="flex flex-col items-center justify-center mb-6 text-center select-none">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-3">
                        <svg
                            className="w-6 h-6 text-white"
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
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-neutral-50">
                        Welcome back
                    </h1>
                    <p className="text-slate-500 dark:text-neutral-400 text-sm mt-1">
                        Sign in to manage your projects and dashboard
                    </p>
                </div>

                {/* Social Authentication Access */}
                <button
                    type="button"
                    onClick={signIn}
                    className="w-full flex items-center justify-center gap-2 border border-slate-300 dark:border-neutral-700 text-slate-700 dark:text-neutral-300 bg-transparent hover:bg-slate-50 dark:hover:bg-neutral-800/50 font-medium px-4 h-11 rounded-xl transition-all text-sm cursor-pointer mb-5 active:scale-[0.99]"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
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
                    <div className="flex-1 h-[1px] bg-slate-200 dark:bg-neutral-800/80" />
                    <span className="text-xs text-slate-400 dark:text-neutral-500 uppercase px-3 tracking-wider">
                        Or continue with
                    </span>
                    <div className="flex-1 h-[1px] bg-slate-200 dark:bg-neutral-800/80" />
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
                        <Label className="text-slate-700 dark:text-neutral-300 text-sm font-medium mb-1 inline-block">Email Address</Label>
                        <Input
                            placeholder="john@example.com"
                            className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-neutral-50 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                        />
                        <FieldError className="text-red-500 text-xs mt-1" />
                    </TextField>

                    {/* Form Action: Absolute Cipher Configuration */}
                    <TextField
                        isRequired
                        name="password"
                        type="password"

                    >
                        <div className="flex justify-between items-center mb-1">
                            <Label className="text-slate-700 dark:text-neutral-300 text-sm font-medium inline-block">Password</Label>
                            <a href="#" className="text-xs text-indigo-500 dark:text-indigo-400 hover:underline">
                                Forgot password?
                            </a>
                        </div>
                        <Input
                            placeholder="Enter your password"
                            className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-neutral-50 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                        />
                        <FieldError className="text-red-500 text-xs mt-1" />
                    </TextField>

                    {/* Execution Operations Matrix */}
                    <div className="flex flex-col gap-3 mt-2">
                        <Button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-semibold px-5 h-11 rounded-xl transition-all shadow-md shadow-indigo-500/10 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <Check className="w-4 h-4" />
                            Sign In
                        </Button>

                        <Button
                            type="reset"
                            variant="secondary"
                            className="w-full border border-slate-300 dark:border-neutral-700 text-slate-700 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-neutral-800 px-5 h-11 rounded-xl transition-all cursor-pointer bg-transparent"
                        >
                            Reset Form
                        </Button>
                    </div>
                </Form>

                {/* Account Creation Redirection Link */}
                <p className="text-center text-sm text-slate-600 dark:text-neutral-400 mt-6 select-none">
                    Don't have an account?{" "}
                    <Link
                        href={`/register`}
                        className="text-indigo-500 dark:text-indigo-400 hover:text-indigo-400 font-semibold transition-colors decoration-2 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

            </div>
        </div>
    );
}