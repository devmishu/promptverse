import Link from 'next/link';
import { Avatar } from "@heroui/react";
import { getUser } from '@/lib/core/session';

const DashboardHeader = async () => {
    const user = await getUser();

    console.log("dashboard user header......", user);

    return (
        <header className="w-full border-b border-[#1e293b]/40 bg-[#030712]/60 backdrop-blur-md sticky top-0 z-50">
            <div className="flex h-16 items-center justify-between px-4 sm:px-6 ">

                {/* Left: Logo & Brand */}
                <div className="flex items-center gap-2.5">
                    <svg className="w-7 h-7 text-cyan-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" strokeDasharray="2 2" />
                        <path d="M12 6a6 6 0 0 1 6 6c0 1.5-.5 3-1.5 4.5L12 21l-4.5-4.5C6.5 15 6 13.5 6 12a6 6 0 0 1 6-6z" />
                        <circle cx="12" cy="11" r="2" fill="currentColor" />
                    </svg>
                    <Link href={'/'} className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        PromptVerse
                    </Link>
                </div>

                {/* Right: Navigation Links & Profile */}
                <div className="flex items-center gap-4 sm:gap-6">
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
                        <Link href="/discover" className="hover:text-white transition-colors">
                            Discover Prompts
                        </Link>
                        <Link href="/leaderboard" className="hover:text-white transition-colors">
                            Leaderboard
                        </Link>
                    </nav>

                    {/* User Profile Frame */}
                    <div className="flex items-center gap-3">
                        <h2 className="text-sm font-medium text-gray-200 hidden sm:block">
                            {user?.name || "Guest Space"}
                        </h2>

                        {/* Fallback Option 1: HeroUI Avatar Components with explicit dynamic name fallback */}
                        {user ? (
                            <Avatar
                                src={user.userImage}
                                name={user?.name || "U"}
                                size="sm"
                                className="cursor-pointer text-xs w-8 h-8 min-w-8 min-h-8"
                            />
                        ) : (
                            /* Fallback Option 2: Standard HTML Image carefully bounded if avatar component errors out */
                            <div className="w-8 h-8 rounded-full border border-cyan-500/30 bg-[#111827] flex items-center justify-center text-xs font-bold text-cyan-400 overflow-hidden">
                                {user?.name ? user.name.charAt(0) : "U"}
                            </div>
                        )}

                        {/* <img src={user?.userImage} alt="netework" width={"30px"} /> */}

                    </div>

                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;