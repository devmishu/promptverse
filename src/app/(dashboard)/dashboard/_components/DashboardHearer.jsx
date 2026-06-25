import Link from 'next/link';
import { getUser } from '@/lib/core/session';

const DashboardHeader = async () => {
    const user = await getUser();

    console.log("dashboard user header......", user);

    return (
        <header className="w-full border-b border-[#1e293b]/40 bg-[#030712]/60 backdrop-blur-md sticky top-0 z-50">
            <div className="flex h-16 items-center justify-between px-4 sm:px-6 max-w-[1440px] mx-auto">

                {/* Left: Logo & Brand */}
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

                {/* Right: Navigation Links & Profile Frame */}
                <div className="flex items-center gap-4 sm:gap-6">
                

                    {/* User Profile Area (ইউজার লগইন থাকলে ইমেজ, নাম ও কন্ডিশনাল ব্যাজ শো করবে) */}
                    {user && (
                        <div className="flex items-center gap-2.5 pl-4 md:border-l border-[#1e293b]/60">

                            {/* ইউজারের ইমেজ (HTML নরমাল ইমেজ ট্যাগ) */}
                            <div className="relative size-9 rounded-xl overflow-hidden border border-[#30363d] bg-[#111827] flex-shrink-0">
                                <img
                                    src={user?.userImage || user?.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"}
                                    alt={user?.name || "User Avatar"}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* ইউজার নেম ও রোল/প্ল্যান ব্যাজ কন্টেইনার (মোবাইল স্ক্রিনেও সুন্দরভাবে ফিট থাকবে) */}
                            <div className="flex flex-col justify-center">
                                <span className="text-sm font-medium text-gray-200 line-clamp-1 max-w-[100px] sm:max-w-[140px]">
                                    {user?.name?.split(" ")[0] || "User"}
                                </span>

                                {/* 👑 রোল যদি এডমিন হয় তবে Admin ব্যাজ আগে দেখাবে */}
                                {user?.role === "admin" ? (
                                    <span className="text-[9px] font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-amber-400 uppercase mt-0.5 select-none drop-shadow-[0_0_6px_rgba(248,113,113,0.3)]">
                                        ADMIN
                                    </span>
                                ) : (
                                    /* ⚡ রোল এডমিন না হয়ে যদি প্ল্যান প্রিমিয়াম হয় তবে PRO MEMBER দেখাবে */
                                    user?.plan === "premium" && (
                                        <span className="text-[9px] font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 uppercase mt-0.5 select-none drop-shadow-[0_0_6px_rgba(34,211,238,0.3)]">
                                            PRO MEMBER
                                        </span>
                                    )
                                )}
                            </div>

                        </div>
                    )}

                    {/* ইউজার যদি লগইন না থাকে (Guest / Fallback অবস্থা) */}
                    {!user && (
                        <div className="text-sm font-medium text-gray-400 select-none">
                            Guest Space
                        </div>
                    )}

                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;