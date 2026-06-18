import Link from "next/link";
import { Button } from "@heroui/react";

export function Navbar({ isLoggedIn = false, onLogout }) {
    return (
        <header className="w-full border-b border-[#1e293b]/40 bg-[#030712] text-white sticky top-0 z-50">
            <div className="flex h-16 items-center justify-between px-6 max-w-[1440px] mx-auto">

                {/* Left: Brand Logo & Name */}
                <div className="flex items-center gap-2.5">
                    <div className="relative w-7 h-7 flex items-center justify-center">
                        <svg className="w-full h-full text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.467 5.99 5.99 0 0 0-1.925-3.546 5.974 5.974 0 0 0-2.133-1A3.75 3.75 0 0 0 2.25 6c0 1.53.918 2.843 2.23 3.407a5.98 5.98 0 0 0-.23 1.593c0 2.222 1.206 4.162 3 5.207M12 18a3.75 3.75 0 0 1-.495-7.467 5.99 5.99 0 0 1 1.925-3.546 5.974 5.974 0 0 1 2.133-1A3.75 3.75 0 0 1 21.75 6c0 1.53-.918 2.843-2.23 3.407a5.98 5.98 0 0 1 .23 1.593c0 2.222-1.206 4.162-3 5.207M12 18v3m0 0H9m3 0h3" />
                        </svg>
                        <div className="absolute inset-0 bg-purple-500/30 blur-sm rounded-full -z-10" />
                    </div>
                    <span className="text-xl font-semibold tracking-tight text-white">
                        Synapse
                    </span>
                </div>

                {/* Center & Right Actions Area */}
                <div className="flex items-center gap-8">

                    {/* Navigation Links */}
                    <nav className="hidden md:flex items-center gap-6 text-[14px] font-medium">
                        <Link
                            href="/"
                            className="text-cyan-400 pb-5 pt-5 border-b-2 border-cyan-500 transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            href="/prompts"
                            className="text-gray-400 hover:text-white transition-colors pb-5 pt-5"
                        >
                            All Prompts
                        </Link>
                        {isLoggedIn && (
                            <Link
                                href="/dashboard"
                                className="text-gray-400 hover:text-white transition-colors pb-5 pt-5"
                            >
                                Dashboard
                            </Link>
                        )}
                    </nav>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                        {!isLoggedIn ? (
                            <>
                                <Button
                                    variant="light"
                                    className="bg-[#111827] hover:bg-[#1f2937] text-gray-200 font-medium px-4 h-9 rounded-lg border border-gray-800 text-sm min-w-0"
                                >
                                    Login
                                </Button>

                                <Button
                                    variant="bordered"
                                    className="border-gray-800 hover:border-purple-500/50 text-gray-200 font-medium px-4 h-9 rounded-lg text-sm min-w-0 bg-transparent"
                                >
                                    Register
                                </Button>
                            </>
                        ) : (
                            <Button
                                onClick={onLogout}
                                className="bg-gradient-to-r from-red-500 to-pink-600 hover:opacity-90 text-white font-medium px-4 h-9 rounded-lg text-sm min-w-0"
                            >
                                Logout
                            </Button>
                        )}
                    </div>

                </div>
            </div>
        </header>
    );
}