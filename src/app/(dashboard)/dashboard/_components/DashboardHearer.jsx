import Link from 'next/link';
import { Avatar } from "@heroui/react";
import { getUser } from '@/lib/core/session';

const DashboardHearer = async () => {

    const user = await getUser();

    return (
        <header className="w-full border-b border-divider bg-background/60 backdrop-blur-md sticky top-0 z-50">
            <div className="flex h-16 items-center justify-between px-6 max-w-[1440px] mx-auto">
                {/* Left: Logo & Brand */}
                <div className="flex items-center gap-2.5">
                    <svg className="w-7 h-7 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" strokeDasharray="2 2" />
                        <path d="M12 6a6 6 0 0 1 6 6c0 1.5-.5 3-1.5 4.5L12 21l-4.5-4.5C6.5 15 6 13.5 6 12a6 6 0 0 1 6-6z" />
                        <circle cx="12" cy="11" r="2" fill="currentColor" />
                    </svg>
                    <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        Synapse
                    </span>
                </div>

                {/* Right: Navigation Links & Profile */}
                <div className="flex items-center gap-6">
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                        <Link href="/discover" className="hover:text-foreground transition-colors">
                            Discover Prompts
                        </Link>
                        <Link href="/leaderboard" className="hover:text-foreground transition-colors">
                            Leaderboard
                        </Link>
                    </nav>
                    <h2>{user?.name}</h2>
                    <Avatar
                        src={user?.image}
                        size="sm"
                        className="cursor-pointer border-2 border-primary"
                    />
                </div>
            </div>
        </header>
    )
};

export default DashboardHearer;