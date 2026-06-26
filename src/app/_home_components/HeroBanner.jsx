"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function HeroBanner() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");

    const trendingTags = [
        "#chatgpt-creativity",
        "#midjourney-art",
        "#claude-workflows",
        "#automation"
    ];

    const handleSearch = (e, query) => {
        if (e) e.preventDefault();

        const activeQuery = query || searchQuery;
        if (!activeQuery.trim()) return;

        const cleanQuery = activeQuery.replace("#", "").trim();

        // Next.js রাউটার পুশ
        router.push(`/allprompts?search=${encodeURIComponent(cleanQuery)}`);
    };

    // Framer Motion Animation Variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 24 },
        visible: (customDelay) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                delay: customDelay,
                ease: [0.16, 1, 0.3, 1], // Custom premium cubic-bezier
            }
        })
    };

    return (
        <section className="w-full bg-[#030712] text-white py-20 px-6 overflow-hidden">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 relative">

                {/* Left Column Content */}
                <div className="flex flex-col gap-6 z-10">

                    {/* Header Text Animation */}
                    <motion.h1
                        initial="hidden"
                        animate="visible"
                        custom={0}
                        variants={fadeInUp}
                        className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-white max-w-xl uppercase"
                    >
                        Unlock the power of AI: <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                            Discover & trade top prompts
                        </span>
                    </motion.h1>

                    {/* Search Bar Animation */}
                    <motion.form
                        initial="hidden"
                        animate="visible"
                        custom={0.15}
                        variants={fadeInUp}
                        onSubmit={(e) => handleSearch(e)}
                        className="relative max-w-xl w-full group mt-2"
                    >
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <Search size={18} className="text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="SEO blog post, stable diffusion portrait"
                            className="w-full h-12 pl-12 pr-32 bg-[#111827]/60 border border-[#1e293b]/40 focus:border-cyan-500/50 rounded-full text-sm text-gray-200 placeholder-gray-500 focus:outline-none transition-all backdrop-blur-sm"
                        />
                        <div className="absolute inset-y-1.5 right-1.5 flex items-center gap-2">
                            <Button
                                type="submit"
                                className="h-9 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:opacity-95 text-white text-xs font-medium px-5 min-w-0"
                            >
                                Search
                            </Button>
                            <Link href={'/allprompts'}>
                                <Button
                                    type="button"

                                    className="h-9 rounded-full bg-transparent border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-900 text-slate-300 hover:text-cyan-400 text-xs font-medium px-4 min-w-0 transition-all duration-200"
                                >
                                    Explore Prompts
                                </Button>
                            </Link>
                        </div>
                    </motion.form>

                    {/* Trending Tags Animation */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        custom={0.3}
                        variants={fadeInUp}
                        className="flex flex-col gap-2.5 mt-2"
                    >
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Trending tags
                        </span>
                        <div className="flex flex-wrap gap-2">
                            {trendingTags.map((tag) => (
                                <span
                                    key={tag}
                                    onClick={(e) => handleSearch(e, tag)}
                                    className="cursor-pointer text-xs font-medium text-gray-400 bg-[#111827] border border-[#1e293b]/40 px-3.5 py-1.5 rounded-lg hover:border-cyan-500/30 hover:text-cyan-400 transition-all"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Right Column Image & Glow Illustration Animation */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    custom={0.45}
                    variants={fadeInUp}
                    className="relative flex items-center justify-center md:justify-end min-h-[300px]"
                >
                    <div className="relative w-[320px] h-[300px] flex items-center justify-center">
                        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-500/10 blur-[50px] rounded-full" />
                        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-purple-500/10 blur-[50px] rounded-full" />
                        <img
                            src="/assets/network-illustration.png"
                            alt="Abstract Network Graphic"
                            className="w-full h-full object-contain pointer-events-none select-none drop-shadow-2xl"
                            loading="lazy"
                        />
                    </div>
                </motion.div>

            </div>
        </section>
    );
}