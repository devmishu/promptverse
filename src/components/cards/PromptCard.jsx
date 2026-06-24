"use client";

import { Avatar, Card, CardHeader, CardFooter, Button, Chip } from "@heroui/react";
import { Star, Eye, Layers, User } from "lucide-react";
import Link from "next/link";

export function PromptCard({ prompt, author }) {



    const {
        title,
        thumbnail: iconUrl,
        category,
        difficulty,
        visibility,
        copyCount,
        aiTool,
        description = "No description provided.",
        averageRating
    } = prompt;

    const getEngineBadgeColor = (engine) => {
        const eng = engine?.toUpperCase();
        if (eng?.includes("CHATGPT") || eng?.includes("GPT")) return "success";
        if (eng?.includes("MIDJOURNEY")) return "secondary";
        if (eng?.includes("STABLE")) return "primary";
        return "default";
    };

    return (
        <Card className="w-full bg-[#111827]/40 border border-[#1e293b]/40 hover:border-cyan-500/30 transition-all rounded-2xl flex flex-col backdrop-blur-sm group cursor-pointer shadow-xl overflow-hidden">

            {/* ১. থাম্বনেইল ইমেজ - একদম ইমেজের মতো বর্ডার ঘেঁষে বড় করে দেখানো হয়েছে */}
            <div className="relative w-full aspect-[1.8/1] bg-[#1f2937] border-b border-gray-800 flex items-center justify-center overflow-hidden">
                {iconUrl ? (
                    <img
                        alt={`${title} banner`}
                        className="w-full h-full object-cover pointer-events-none select-none group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        src={iconUrl}
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-r from-purple-950/50 to-cyan-950/50 flex items-center justify-center text-gray-600 font-bold tracking-wider text-xs">
                        {aiTool || "AI TEMPLATE"}
                    </div>
                )}
            </div>

            {/* কার্ডের ভেতরের বাকি কন্টেন্টগুলোর প্যাডিং এখানে হ্যান্ডেল করা হয়েছে */}
            <div className="p-5 flex flex-col gap-3 flex-1">

                {/* ২. ব্যাজ রো (Badges Row) */}
                <div className="flex flex-wrap gap-1.5 items-center">
                    {aiTool && (
                        <Chip
                            size="sm"
                            variant="flat"
                            color={getEngineBadgeColor(aiTool)}
                            className="text-[10px] font-bold tracking-wider uppercase h-6"
                        >
                            {aiTool}
                        </Chip>
                    )}
                    <Chip
                        size="sm"
                        variant="bordered"
                        className="text-[10px] font-semibold text-gray-400 border-gray-800 h-6"
                    >
                        {difficulty}
                    </Chip>
                    <Chip
                        size="sm"
                        variant="flat"
                        color={visibility?.toUpperCase() === "PREMIUM" ? "danger" : "default"}
                        className="text-[10px] font-bold uppercase h-6"
                    >
                        {visibility}
                    </Chip>
                </div>

                {/* ৩. টাইটেল সেকশন */}
                <CardHeader className="p-0 flex flex-col items-start">
                    <h3 className="text-[16px] font-bold text-white tracking-tight line-clamp-1 leading-snug group-hover:text-cyan-400 transition-colors">
                        {title}
                    </h3>
                </CardHeader>

                {/* ৪. ডেসক্রিপশন সেকশন (সরাসরি div দিয়ে হ্যান্ডেল করা হয়েছে) */}
                <div className="text-xs text-gray-400 font-normal line-clamp-2 leading-relaxed minimal-description">
                    {description}
                </div>

                {/* ৫. ক্যাটাগরি ব্যাজ */}
                {category && (
                    <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-gray-500 uppercase mt-1">
                        <Layers className="size-3 text-cyan-500/70" />
                        {category}
                    </div>
                )}

                {/* ৬. ফুটার সেকশন: অথর এবং স্ট্যাটস */}
                <CardFooter className="p-0 flex flex-col gap-3 mt-auto pt-3 border-t border-gray-800/40">
                    <div className="flex items-center justify-between w-full">
                        {/* Left: Author */}
                        <div className="flex items-center gap-2">
                            {/* <Avatar
                                name={author?.name}
                                src={author?.avatarUrl}
                                className="w-5 h-5 text-[9px] font-bold bg-purple-600 text-white border border-gray-800"
                            /> */}
                            <User />
                            <span className="text-xs text-gray-400 font-medium tracking-tight">
                                {author?.name || "Creator"}
                            </span>
                        </div>

                        {/* Right: Copies & Ratings */}
                        <div className="flex items-center gap-2.5">
                            <span className="text-[11px] text-gray-500 font-medium flex items-center gap-1">
                                <span className="text-gray-400 font-semibold">{copyCount}</span> copies
                            </span>
                            <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded-md">
                                <Star size={11} className="fill-amber-400 text-amber-400" />
                                <span className="text-[11px] font-bold text-amber-400">
                                    {Number(averageRating).toFixed(1)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* ৭. অ্যাকশন বাটন */}
                    <Link href={`/allprompts/${prompt._id}`}>
                        <Button
                            size="sm"
                            className="w-full h-9 rounded-xl bg-[#111827] hover:bg-[#1f2937] text-gray-300 font-semibold text-xs border border-gray-800 hover:border-cyan-500/30 transition-all flex items-center justify-center gap-2 mt-1"
                        >
                            <Eye size={14} className="text-gray-400 group-hover:text-cyan-400 transition-colors" />
                            View Details
                        </Button>
                    </Link>
                </CardFooter>

            </div>
        </Card>
    );
}