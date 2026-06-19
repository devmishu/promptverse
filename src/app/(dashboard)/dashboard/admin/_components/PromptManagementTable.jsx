"use client";

import { Avatar, Button } from "@heroui/react";
import { Eye, CheckCircle2, XCircle, Trash2, Terminal, Layers } from "lucide-react";

export default function PromptManagementTable({ prompts = [], onApprove, onReject, onDelete, onView }) {

    // ডামি ডাটা (যদি প্রপস থেকে কোনো ডাটা না আসে)
    const displayPrompts = prompts.length > 0 ? prompts : [
        {
            id: "1",
            title: "Voluptatem exercita",
            category: "Idea Generation",
            creatorName: "Creator",
            creatorEmail: "creator@aiverse.com",
            aiEngine: "STABLE DIFFUSION",
            visibility: "Public",
            isFeatured: false,
            status: "PENDING"
        },
        {
            id: "2",
            title: "Optimized React Tailwind Code Builder",
            category: "Coding",
            creatorName: "Prompt Engineer",
            creatorEmail: "creator@aiverse.com",
            aiEngine: "CHATGPT",
            visibility: "Public",
            isFeatured: true,
            status: "APPROVED"
        }
    ];

    // AI Engine গুলোর জন্য ডাইনামিক কালার ম্যাপিং
    const getEngineStyle = (engine) => {
        const eng = engine?.toUpperCase();
        if (eng?.includes("CHATGPT") || eng?.includes("GPT")) return "bg-emerald-500/10 border-emerald-500/20 text-emerald-400";
        if (eng?.includes("MIDJOURNEY")) return "bg-purple-500/10 border-purple-500/20 text-purple-400";
        if (eng?.includes("STABLE")) return "bg-indigo-500/10 border-indigo-500/20 text-indigo-400";
        return "bg-cyan-500/10 border-cyan-500/20 text-cyan-400";
    };

    // Status গুলোর জন্য ডাইনামিক কালার ম্যাপিং
    const getStatusStyle = (status) => {
        switch (status?.toUpperCase()) {
            case "APPROVED":
                return "bg-emerald-500/10 border-emerald-500/30 text-emerald-400";
            case "REJECTED":
                return "bg-rose-500/10 border-rose-500/30 text-rose-400";
            default:
                return "bg-amber-500/10 border-amber-500/30 text-amber-500";
        }
    };

    return (
        <div className="w-full bg-[#111827]/20 border border-[#1e293b]/50 rounded-3xl backdrop-blur-md p-6 shadow-2xl relative overflow-hidden">

            {/* Table Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                        <Terminal className="text-cyan-400 size-5" />
                        Prompt Template Submissions Moderation
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">Approve templates, reject with feedback, or tag featured highlights.</p>
                </div>
            </div>

            {/* Clean Scrollable Wrapper */}
            <div className="w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <table className="w-full min-w-[1000px] border-collapse text-left">
                    <thead>
                        <tr className="bg-[#030712]/80 border-b border-[#1e293b]/40">
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4">Template Title</th>
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4">Creator</th>
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4">AI Engine</th>
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4">Visibility</th>
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4">Featured</th>
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4">Status</th>
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {displayPrompts.map((prompt) => (
                            <tr key={prompt.id} className="border-b border-[#1e293b]/20 hover:bg-[#111827]/30 transition-colors group">

                                {/* Column 1: Title & Category */}
                                <td className="py-4 px-4">
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-sm text-gray-200 tracking-wide group-hover:text-cyan-400 transition-colors">
                                            {prompt.title}
                                        </span>
                                        <span className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                                            <Layers className="size-3 text-gray-600" />
                                            Category: {prompt.category}
                                        </span>
                                    </div>
                                </td>

                                {/* Column 2: Creator Details */}
                                <td className="py-4 px-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-300">{prompt.creatorName}</span>
                                        <span className="text-xs text-gray-500">{prompt.creatorEmail}</span>
                                    </div>
                                </td>

                                {/* Column 3: AI Engine Badge */}
                                <td className="py-4 px-4">
                                    <span className={`inline-flex items-center justify-center px-2.5 py-1 text-[10px] font-bold tracking-wider rounded-md border ${getEngineStyle(prompt.aiEngine)}`}>
                                        {prompt.aiEngine}
                                    </span>
                                </td>

                                {/* Column 4: Visibility */}
                                <td className="py-4 px-4">
                                    <span className="text-sm text-gray-400 font-medium">{prompt.visibility}</span>
                                </td>

                                {/* Column 5: Featured Tag */}
                                <td className="py-4 px-4">
                                    {prompt.isFeatured ? (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-bold uppercase rounded bg-amber-500/10 border border-amber-500/30 text-amber-500">
                                            ★ Featured
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-medium uppercase rounded bg-gray-500/5 border border-gray-500/10 text-gray-500">
                                            ☆ Feature
                                        </span>
                                    )}
                                </td>

                                {/* Column 6: Status */}
                                <td className="py-4 px-4">
                                    <span className={`inline-flex items-center justify-center px-3 py-1 text-[10px] font-bold tracking-widest rounded-full border shadow-sm ${getStatusStyle(prompt.status)}`}>
                                        {prompt.status}
                                    </span>
                                </td>

                                {/* Column 7: Action Buttons Group */}
                                <td className="py-4 px-4">
                                    <div className="flex items-center justify-center gap-1.5">
                                        {/* View Button */}
                                        <Button
                                            isIconOnly
                                            size="sm"
                                            variant="light"
                                            className="text-gray-400 hover:text-white hover:bg-gray-500/10 rounded-xl transition-colors"
                                            aria-label="View Details"
                                            onClick={() => onView && onView(prompt.id)}
                                        >
                                            <Eye className="size-4" />
                                        </Button>

                                        {/* Approve Button */}
                                        <Button
                                            isIconOnly
                                            size="sm"
                                            variant="light"
                                            className="text-gray-500 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-xl transition-colors"
                                            aria-label="Approve Prompt"
                                            onClick={() => onApprove && onApprove(prompt.id)}
                                        >
                                            <CheckCircle2 className="size-4" />
                                        </Button>

                                        {/* Reject Button */}
                                        <Button
                                            isIconOnly
                                            size="sm"
                                            variant="light"
                                            className="text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
                                            aria-label="Reject Prompt"
                                            onClick={() => onReject && onReject(prompt.id)}
                                        >
                                            <XCircle className="size-4" />
                                        </Button>

                                        {/* Delete Button */}
                                        <Button
                                            isIconOnly
                                            size="sm"
                                            variant="light"
                                            className="text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-colors"
                                            aria-label="Delete Prompt"
                                            onClick={() => onDelete && onDelete(prompt.id)}
                                        >
                                            <Trash2 className="size-4" />
                                        </Button>
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}