import { Button } from "@heroui/react";
import { Search } from "lucide-react";

export function HeroBanner() {
    const trendingTags = [
        "#chatgpt-creativity",
        "#midjourney-art",
        "#claude-workflows",
        "#automation"
    ];

    return (
        <section className="w-full bg-[#030712] text-white py-20 px-6 overflow-hidden">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 relative">

                {/* Left Side: Content & Search */}
                <div className="flex flex-col gap-6 z-10">
                    <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-white max-w-xl uppercase">
                        Unlock the power of AI: <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                            Discover & trade top prompts
                        </span>
                    </h1>

                    {/* Search Bar container */}
                    <div className="relative max-w-xl w-full group mt-2">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <Search size={18} className="text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="SEO blog post, stable diffusion portrait"
                            className="w-full h-12 pl-12 pr-32 bg-[#111827]/60 border border-[#1e293b]/40 focus:border-cyan-500/50 rounded-full text-sm text-gray-200 placeholder-gray-500 focus:outline-none transition-all backdrop-blur-sm"
                            disabled
                        />
                        <div className="absolute inset-y-1.5 right-1.5">
                            <Button
                                size="sm"
                                className="h-9 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:opacity-95 text-white text-xs font-medium px-5 min-w-0"
                            >
                                Search
                            </Button>
                        </div>
                    </div>

                    {/* Trending Tags */}
                    <div className="flex flex-col gap-2.5 mt-2">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Trending tags
                        </span>
                        <div className="flex flex-wrap gap-2">
                            {trendingTags.map((tag) => (
                                <span
                                    key={tag}
                                    className="cursor-pointer text-xs font-medium text-gray-400 bg-[#111827] border border-[#1e293b]/40 px-3.5 py-1.5 rounded-lg hover:border-cyan-500/30 hover:text-cyan-400 transition-all"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side: Abstract Network Graphic Illustration */}
                <div className="relative flex items-center justify-center md:justify-end min-h-[300px]">
                    <div className="relative w-[320px] h-[300px]">
                        {/* Glow backdrops */}
                        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-500/10 blur-[50px] rounded-full" />
                        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-purple-500/10 blur-[50px] rounded-full" />

                        <svg className="w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Connection Lines */}
                            <line x1="40" y1="100" x2="80" y2="50" stroke="#1e293b" strokeWidth="1.2" opacity="0.6" />
                            <line x1="40" y1="100" x2="80" y2="150" stroke="#1e293b" strokeWidth="1.2" opacity="0.6" />
                            <line x1="80" y1="50" x2="140" y2="50" stroke="#1e293b" strokeWidth="1.2" opacity="0.6" />
                            <line x1="80" y1="150" x2="140" y2="150" stroke="#1e293b" strokeWidth="1.2" opacity="0.6" />
                            <line x1="140" y1="50" x2="120" y2="100" stroke="#1e293b" strokeWidth="1.2" opacity="0.6" />
                            <line x1="140" y1="150" x2="120" y2="100" stroke="#1e293b" strokeWidth="1.2" opacity="0.6" />

                            {/* Fluid Gradient Shape */}
                            <path
                                d="M90,75 C110,60 135,70 145,90 C155,110 130,135 115,125 C100,115 85,130 75,110 C65,90 75,85 90,75 Z"
                                fill="url(#fluidGradient)"
                                opacity="0.85"
                                filter="drop-shadow(0px 0px 10px rgba(6,182,212,0.15))"
                            />

                            {/* Network Nodes */}
                            <circle cx="40" cy="100" r="6" fill="url(#nodeGradient1)" />
                            <circle cx="80" cy="50" r="6" fill="url(#nodeGradient2)" />
                            <circle cx="80" cy="150" r="6" fill="url(#nodeGradient1)" />
                            <circle cx="140" cy="150" r="6" fill="url(#nodeGradient2)" />

                            {/* Sparkles / Stars */}
                            <path d="M170,60 L172,65 L177,67 L172,69 L170,74 L168,69 L163,67 L168,65 Z" fill="#22d3ee" />
                            <path d="M185,110 L186.5,114 L191.5,115 L186.5,116 L185,120 L183.5,116 L178.5,115 L183.5,114 Z" fill="#a78bfa" />
                            <path d="M150,35 L151,38 L154,39 L151,40 L150,43 L149,40 L146,39 L149,38 Z" fill="#e879f9" />

                            {/* Gradients Definitions */}
                            <defs>
                                <linearGradient id="fluidGradient" x1="70" y1="70" x2="150" y2="130" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stopColor="#06b6d4" />
                                    <stop offset="50%" stopColor="#3b82f6" />
                                    <stop offset="100%" stopColor="#d946ef" />
                                </linearGradient>
                                <linearGradient id="nodeGradient1" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#38bdf8" />
                                    <stop offset="100%" stopColor="#c084fc" />
                                </linearGradient>
                                <linearGradient id="nodeGradient2" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#ec4899" />
                                    <stop offset="100%" stopColor="#8b5cf6" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>

            </div>
        </section>
    );
}