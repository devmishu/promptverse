"use client";

import { useSession } from "@/lib/auth-client";
import { Button, AlertDialog } from "@heroui/react";
import { Edit3, Trash2, BarChart3, Terminal, Layers, Eye, Copy } from "lucide-react";
import Link from "next/link";

export default function MyPromptsTable({ prompts = [], onUpdate, noHandleDeletPrompt, onViewAnalytics }) {

    const session = useSession();
    const user = session?.data?.user

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
        // এখানে max-w-full যুক্ত করা হয়েছে
        <div className="my-10  w-full overflow-x-auto overflow-y-hidden block touch-pan-x [scrollbar-width:auto_!important] [&::-webkit-scrollbar]:block [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-cyan-500/30 [&::-webkit-scrollbar-thumb]:rounded-full">

            {/* Table Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
                        <Terminal className="text-cyan-400 size-4 sm:size-5" />
                        My Prompt Templates
                    </h2>
                    <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">Manage your created prompt templates, view performance, and tracking analytics.</p>
                </div>
            </div>

            {/* স্ক্রলবার কন্টেইনারে কাস্টম হিডেন ক্লাস সরিয়ে স্ট্যান্ডার্ড touch-scroll লজিক দেওয়া হয়েছে */}
            <div className="w-full overflow-x-auto overflow-y-hidden block touch-pan-x dynamic-scroll">
                <table className="w-full min-w-[900px] border-collapse text-left table-auto">
                    <thead>
                        <tr className="bg-[#030712]/80 border-b border-[#1e293b]/40">
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4 whitespace-nowrap">Prompt Title</th>
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4 whitespace-nowrap">AI Tool</th>
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4 whitespace-nowrap">Visibility</th>
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4 whitespace-nowrap">Total Copy</th>
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4 whitespace-nowrap">Status</th>
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4 text-center whitespace-nowrap">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {prompts.map((prompt) => (
                            <tr key={prompt._id} className="border-b border-[#1e293b]/20 hover:bg-[#111827]/30 transition-colors group">

                                {/* Column 1: Title & Category */}
                                <td className="py-4 px-4">
                                    <div className="flex flex-col max-w-[320px]">
                                        <span className="font-semibold text-sm text-gray-200 tracking-wide group-hover:text-cyan-400 transition-colors truncate">
                                            {prompt.title}
                                        </span>
                                        <span className="text-xs text-gray-500 mt-0.5 flex items-center gap-1 whitespace-nowrap">
                                            <Layers className="size-3 text-gray-600" />
                                            Category: {prompt.category}
                                        </span>
                                    </div>
                                </td>

                                {/* Column 2: AI Engine */}
                                <td className="py-4 px-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center justify-center px-2.5 py-1 text-[10px] font-bold tracking-wider rounded-md border ${getEngineStyle(prompt.aiEngine)}`}>
                                        {prompt.aiTool}
                                    </span>
                                </td>

                                {/* Column 3: Visibility */}
                                <td className="py-4 px-4 whitespace-nowrap">
                                    <span className="text-sm text-gray-400 font-medium">{prompt.visibility}</span>
                                </td>

                                {/* Column 4: Total Views (Analytics Preview) */}
                                <td className="py-4 px-4 whitespace-nowrap">
                                    <div className="flex items-center gap-1.5 text-gray-300 font-medium text-sm">

                                        <Copy className="size-3.5 text-gray-500" />
                                        {(prompt.copyCount || 0).toLocaleString()}
                                    </div>
                                </td>

                                {/* Column 5: Status */}
                                <td className="flex flex-col justify-center items-center py-4 px-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center justify-center px-3 py-1 text-[10px] font-bold tracking-widest rounded-full border shadow-sm ${getStatusStyle(prompt.status)}`}>
                                        {prompt.status}
                                    </span>
                                    {
                                        prompt.rejectReason && <span className="text-gray-400">Reason: {prompt.rejectReason}</span>
                                    }
                                </td>

                                {/* Column 6: Action Buttons Group */}
                                <td className="py-4 px-4 whitespace-nowrap">
                                    <div className="flex items-center justify-center gap-1.5">

                                        {/* View Analytics Button */}
                                        <Link href={`/dashboard/${user?.role}`}>
                                            <Button
                                                isIconOnly
                                                size="sm"
                                                variant="light"
                                                className="text-gray-500 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-xl transition-colors"
                                                aria-label="View Analytics"

                                            >
                                                <BarChart3 className="size-4" />
                                            </Button>
                                        </Link>

                                        {/* Update / Edit Button */}
                                        <Link href={`/dashboard/${user?.role}/myprompt/edit/${prompt._id}`}>
                                            <Button
                                                isIconOnly
                                                size="sm"
                                                variant="light"
                                                className="text-gray-500 hover:text-amber-400 hover:bg-amber-500/10 rounded-xl transition-colors"
                                                aria-label="Update Prompt"
                                                onClick={() => onUpdate && onUpdate(prompt.id)}
                                            >
                                                <Edit3 className="size-4" />
                                            </Button>
                                        </Link>


                                        <AlertDialog>
                                            {/* Delete Button */}
                                            <Button
                                                isIconOnly
                                                size="sm"
                                                variant="light"
                                                className="text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-colors"
                                                aria-label="Delete Prompt"
                                            >
                                                <Trash2 className="size-4" />
                                            </Button>
                                            <AlertDialog.Backdrop>
                                                <AlertDialog.Container>
                                                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                                                        <AlertDialog.CloseTrigger />
                                                        <AlertDialog.Header>
                                                            <AlertDialog.Icon status="danger" />
                                                            <AlertDialog.Heading>Delete Prompt permanently?</AlertDialog.Heading>
                                                        </AlertDialog.Header>
                                                        <AlertDialog.Body>
                                                            <p>
                                                                This will permanently delete <strong></strong> and all of its
                                                                data. This action cannot be undone.
                                                            </p>
                                                        </AlertDialog.Body>
                                                        <AlertDialog.Footer>
                                                            <Button slot="close" variant="tertiary">
                                                                Cancel
                                                            </Button>
                                                            <Button
                                                                onClick={() => noHandleDeletPrompt(prompt._id)}
                                                                slot="close" variant="danger">
                                                                Delete Prompt
                                                            </Button>
                                                        </AlertDialog.Footer>
                                                    </AlertDialog.Dialog>
                                                </AlertDialog.Container>
                                            </AlertDialog.Backdrop>
                                        </AlertDialog>

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