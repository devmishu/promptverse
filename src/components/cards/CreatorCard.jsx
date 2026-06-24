"use client";

import React from "react";
import { Card, Button, Avatar, Chip } from "@heroui/react";
import { Layers, Copy, Award, ArrowUpRight } from "lucide-react";

export function CreatorCard({ creator, rank }) {
    // ডাটা ডেস্ট্রাকচারিং এবং সেফ ফলব্যাক ভ্যালু সেট করা
    const {
        name = "Anonymous Creator",
        avatarUrl = "",
        totalPromptsCreated = 0,
        totalCopies = 0,
        topAiTool = "General AI",
        mainCategory = "AI Research"
    } = creator || {};

    // র‍্যাংক অনুযায়ী মুকুট বা মেডেল কালার কনফিগারেশন
    const getRankColor = (rank) => {
        if (rank === 1) return "from-amber-400 to-yellow-500 text-black";
        if (rank === 2) return "from-slate-300 to-slate-400 text-black";
        if (rank === 3) return "from-amber-600 to-amber-700 text-white";
        return "from-[#1e293b] to-[#0f172a] text-gray-400 border border-[#30363d]";
    };

    return (
        <Card className="relative bg-[#0d1117]/60 border border-[#30363d]/60 hover:border-purple-500/50 rounded-2xl overflow-hidden backdrop-blur-md transition-all duration-300 group shadow-lg">

            {/* 👑 র‍্যাংক ব্যাজ */}
            <div className={`absolute top-3 left-3 z-10 flex items-center justify-center size-7 text-xs font-bold rounded-lg bg-gradient-to-br shadow-md ${getRankColor(rank)}`}>
                {rank <= 3 ? <Award className="size-4" /> : `#${rank}`}
            </div>

            {/* 🤖 এআই এক্সপার্ট ব্যাজ */}
            <div className="absolute top-3 right-3 z-10">
                <Chip
                    size="sm"
                    className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full"
                >
                    {topAiTool}
                </Chip>
            </div>

            {/* 👤 প্রোফাইল পার্ট */}
            <Card.Header className="flex flex-col items-center pt-8 pb-4 px-5">
                <div className="relative mb-3">
                    {/* অবতারের ব্যাকগ্রাউন্ডে প্রিমিয়াম গ্লো ইফেক্ট */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-cyan-500 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
                    <Avatar
                        src={avatarUrl}
                        name={name}
                        className="size-16 border-2 border-[#30363d] group-hover:border-purple-500/50 transition-colors"
                    />
                </div>
                <Card.Title className="text-base font-semibold text-gray-100 group-hover:text-purple-400 transition-colors line-clamp-1">
                    chatgpt
                </Card.Title>
                <Card.Description className="text-xs text-gray-500 flex items-center gap-1 mt-1 font-medium capitalize">
                    <Layers className="size-3.5 text-indigo-400" />
                    {mainCategory} Specialist
                </Card.Description>
            </Card.Header>

            {/* 📈 স্ট্যাটস গ্রিড (Prompts & Copies) */}
            <Card.Content className="px-5 py-3 border-t border-b border-[#30363d]/40 bg-[#161b22]/30 grid grid-cols-2 text-center gap-2">
                <div className="flex flex-col gap-0.5 border-r border-[#30363d]/40">
                    <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Prompts</span>
                    <span className="text-base font-bold text-gray-200">{totalPromptsCreated}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                    <span className="text-xs text-gray-500 font-medium uppercase tracking-wider flex items-center justify-center gap-1">
                        <Copy className="size-3 text-purple-400" /> Copies
                    </span>
                    <span className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                        {totalCopies >= 1000 ? `${(totalCopies / 1000).toFixed(1)}k` : totalCopies}
                    </span>
                </div>
            </Card.Content>

            {/* 🚀 অ্যাকশন বাটন */}
            <Card.Footer className="p-3.5 flex justify-center">
                <Button
                    className="w-full h-9 bg-[#161b22] border border-[#30363d] text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 hover:border-transparent text-xs font-semibold rounded-xl transition-all duration-300 shadow-sm flex items-center justify-center gap-1"
                >
                    View Portfolio
                    <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
            </Card.Footer>

        </Card>
    );
}