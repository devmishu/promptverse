import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full border-t border-[#1e293b]/40 bg-[#030712] text-gray-400 py-12 mt-auto">
            <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Column 1: Brand & Description */}
                <div className="flex flex-col gap-3">
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
                    <p className="text-sm text-gray-500 leading-relaxed">
                        Discover, share, and optimize the best AI prompts for your creative and technical workflows.
                    </p>
                </div>

                {/* Column 2: Explore */}
                <div className="flex flex-col gap-3">
                    <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Explore</h4>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
                        </li>
                        <li>
                            <Link href="/allprompts" className="hover:text-cyan-400 transition-colors">All Prompts</Link>
                        </li>
                    </ul>
                </div>

                {/* Column 3: Legal */}
                <div className="flex flex-col gap-3">
                    <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Legal</h4>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</Link>
                        </li>
                    </ul>
                </div>

                {/* Column 4: Newsletter / Contact */}
                <div className="flex flex-col gap-3">
                    <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Stay Connected</h4>
                    <p className="text-sm text-gray-500">
                        Join our community to get the latest prompt engineering updates.
                    </p>
                </div>

            </div>

            {/* Bottom Copyright Area */}
            <div className="max-w-[1440px] mx-auto px-6 mt-10 pt-6 border-t border-[#1e293b]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
                <p>&copy; {new Date().getFullYear()} Synapse. All rights reserved.</p>
                <div className="flex gap-4">
                    <span className="hover:text-gray-400 cursor-pointer">Twitter</span>
                    <span className="hover:text-gray-400 cursor-pointer">GitHub</span>
                    <span className="hover:text-gray-400 cursor-pointer">Discord</span>
                </div>
            </div>
        </footer>
    );
}