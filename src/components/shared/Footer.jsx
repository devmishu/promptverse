import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full border-t border-[#1e293b]/40 bg-[#030712] text-gray-400 py-12 mt-auto">
            <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Column 1: Brand & Description */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2.5">
                        <div className="relative w-6 h-6 flex items-center justify-center">
                            <svg className="w-full h-full text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.467 5.99 5.99 0 0 0-1.925-3.546 5.974 5.974 0 0 0-2.133-1A3.75 3.75 0 0 0 2.25 6c0 1.53.918 2.843 2.23 3.407a5.98 5.98 0 0 0-.23 1.593c0 2.222 1.206 4.162 3 5.207M12 18a3.75 3.75 0 0 1-.495-7.467 5.99 5.99 0 0 1 1.925-3.546 5.974 5.974 0 0 1 2.133-1A3.75 3.75 0 0 1 21.75 6c0 1.53-.918 2.843-2.23 3.407a5.98 5.98 0 0 1 .23 1.593c0 2.222-1.206 4.162-3 5.207M12 18v3m0 0H9m3 0h3" />
                            </svg>
                            <div className="absolute inset-0 bg-purple-500/30 blur-sm rounded-full -z-10" />
                        </div>
                        <span className="text-lg font-semibold tracking-tight text-white">
                            Synapse
                        </span>
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
                            <Link href="/prompts" className="hover:text-cyan-400 transition-colors">All Prompts</Link>
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