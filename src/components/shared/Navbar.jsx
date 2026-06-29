"use client"
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";

export function Navbar() {
    const session = useSession();
    const user = session?.data?.user;
    const pathname = usePathname();

    
    const [isMenuOpen, setIsMenuOpen] = useState(false);

   
    const navLinks = [
        { label: "Home", path: "/" },
        { label: "All Prompts", path: "/allprompts" },
        ...(user ? [{ label: "Dashboard", path: `/dashboard/${user?.role}/profile` }] : [])
    ];

    
    const getLinkClass = (path) => {
        const isActive = pathname === path;
        return `pb-1 pt-[19px] border-b-2 font-medium text-[14px] transition-all duration-200 ${isActive
            ? "text-cyan-400 border-cyan-500 font-semibold drop-shadow-[0_0_8px_rgba(34,211,238,0.2)]"
            : "text-gray-400 border-transparent hover:text-white"
            }`;
    };

    
    const getMobileLinkClass = (path) => {
        const isActive = pathname === path;
        return `w-full block py-3 px-4 rounded-xl text-base font-medium transition-all duration-200 ${isActive
            ? "bg-cyan-500/10 text-cyan-400 border-l-4 border-cyan-500 font-semibold"
            : "text-gray-300 hover:bg-[#111827] hover:text-white"
            }`;
    };

    return (
        <header className="w-full border-b border-[#1e293b]/40 bg-[#030712] text-white sticky top-0 z-50">
            <div className="flex h-16 items-center justify-between px-4 sm:px-6 max-w-[1440px] mx-auto relative">

                {/* Left Side: Mobile Menu Button & Brand Logo */}
                <div className="flex items-center gap-3 sm:gap-4">
                    {/* Hamburger Button (Mobile Only) */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-gray-400 hover:text-white p-1 rounded-md focus:outline-none transition-colors"
                    >
                        {isMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>

                    <div className="flex items-center gap-2.5">
                        <Link href={'/'} className="flex items-center gap-2.5">
                            <svg className="w-7 h-7 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" strokeDasharray="2 2" />
                                <path d="M12 6a6 6 0 0 1 6 6c0 1.5-.5 3-1.5 4.5L12 21l-4.5-4.5C6.5 15 6 13.5 6 12a6 6 0 0 1 6-6z" />
                                <circle cx="12" cy="11" r="2" fill="currentColor" />
                            </svg>
                            <div className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent select-none">
                                PromptVerse
                            </div>
                        </Link>

                    </div>
                </div>

                {/* Center Side: Desktop Links (Hidden on Mobile) */}
                <nav className="hidden md:flex items-center gap-6 h-full">
                    {navLinks.map((link) => (
                        <Link key={link.path} href={link.path} className={getLinkClass(link.path)}>
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Right Side: Profile Info & Auth Buttons */}
                <div className="flex items-center">
                    {!user ? (
                        <div className="flex items-center gap-2 sm:gap-3">
                            <Link
                                href={'/login'}
                                className="bg-[#111827] hover:bg-[#1f2937] text-gray-200 font-medium px-4 h-9 flex items-center justify-center rounded-lg border border-gray-800 text-sm transition-colors"
                            >
                                Login
                            </Link>

                            <Link
                                href={'/register'}
                                className="hidden sm:flex border border-gray-800 hover:border-purple-500/50 text-gray-200 font-medium px-4 h-9 items-center justify-center rounded-lg text-sm transition-colors bg-transparent"
                            >
                                Register
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 sm:gap-4 md:pl-3 md:border-l border-[#1e293b]/60">

                            <div className="flex items-center gap-2.5">
                               
                                <div className="relative size-9 rounded-xl overflow-hidden border border-[#30363d] bg-[#111827] flex-shrink-0">
                                    <img
                                        src={user?.userImage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"}
                                        alt={user?.name || "User Avatar"}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                               
                                <div className="hidden sm:flex flex-col justify-center">
                                    <span className="text-sm font-medium text-gray-200 line-clamp-1 max-w-[100px]">
                                        {user?.name?.split(" ")[0] || "User"}
                                    </span>
                                    {user?.plan === "premium" && (
                                        <span className="text-[9px] font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 uppercase mt-0.5 select-none drop-shadow-[0_0_6px_rgba(34,211,238,0.3)]">
                                            PRO MEMBER
                                        </span>
                                    )}
                                </div>
                            </div>

                           
                            <button
                                onClick={() => signOut()}
                                className="hover:cursor-pointer bg-gradient-to-r from-red-500/10 to-pink-600/10 hover:from-red-500 hover:to-pink-600 border border-red-500/20 hover:border-transparent text-red-400 hover:text-white font-medium px-3 h-8 rounded-lg text-xs transition-all duration-200"
                            >
                                Logout
                            </button>

                        </div>
                    )}
                </div>

            </div>

            {/* Mobile Dropdown Menu Drawer (Absolute Positioned) */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-[64px] left-0 w-full bg-[#030712]/95 border-b border-[#1e293b]/40 backdrop-blur-xl shadow-2xl origin-top animate-in slide-in-from-top-2 duration-200">
                    <nav className="flex flex-col px-4 py-5 gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={getMobileLinkClass(link.path)}
                                onClick={() => setIsMenuOpen(false)} // ক্লিক করলে মেনু অফ হবে
                            >
                                {link.label}
                            </Link>
                        ))}

                        
                        {!user && (
                            <Link
                                href={'/register'}
                                onClick={() => setIsMenuOpen(false)}
                                className="sm:hidden w-full text-center mt-2 border border-gray-800 text-gray-200 font-medium py-3 rounded-xl text-base transition-colors hover:bg-gray-800/50"
                            >
                                Create an Account
                            </Link>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
}