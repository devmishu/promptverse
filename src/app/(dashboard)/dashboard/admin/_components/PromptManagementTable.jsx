"use client";

import { useState } from "react";
import { Avatar, Button, Modal } from "@heroui/react"; // 👈 HeroUI Modal ইমপোর্ট করা হয়েছে
import { Eye, CheckCircle2, XCircle, Trash2, Terminal, Layers, AlertTriangle, X } from "lucide-react";
import Link from "next/link";

export default function PromptManagementTable({ prompts = [], onHandleReject, onHandleDeletPrompt, onHandleApprove, onHandleFeatured }) {

    // মোডাল এবং ডেটা ম্যানেজ করার স্টেট
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPromptId, setSelectedPromptId] = useState(null);
    const [rejectReason, setRejectReason] = useState("");

    const getEngineStyle = (engine) => {
        const eng = engine?.toUpperCase();
        if (eng?.includes("CHATGPT") || eng?.includes("GPT")) return "bg-emerald-500/10 border-emerald-500/20 text-emerald-400";
        if (eng?.includes("MIDJOURNEY")) return "bg-purple-500/10 border-purple-500/20 text-purple-400";
        if (eng?.includes("STABLE")) return "bg-indigo-500/10 border-indigo-500/20 text-indigo-400";
        return "bg-cyan-500/10 border-cyan-500/20 text-cyan-400";
    };

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

    // রিজেক্ট বাটনে ক্লিক করলে আইডি সেভ হবে ও মোডাল ওপেন হবে
    const openRejectModal = (id) => {
        setSelectedPromptId(id);
        setIsModalOpen(true);
    };

    // ফর্ম সাবমিট হ্যান্ডলার
    const handleRejectSubmit = async (e) => {
        e.preventDefault();
        if (!rejectReason.trim()) return;

        await onHandleReject(selectedPromptId, rejectReason);

        // স্টেট ক্লিয়ার ও মোডাল ক্লোজ
        setIsModalOpen(false);
        setSelectedPromptId(null);
        setRejectReason("");
    };

    return (
        <div className="w-full bg-[#111827]/20 border border-[#1e293b]/50 rounded-3xl backdrop-blur-md sm:p-6 shadow-2xl relative overflow-hidden">

            {/* Table Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
                        <Terminal className="text-cyan-400 size-4 sm:size-5" />
                        All Prompts
                    </h2>
                </div>
            </div>

            {/* Table Wrapper */}
            <div className="w-full overflow-x-auto touch-pan-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <table className="w-full min-w-[1000px] border-collapse text-left table-auto">
                    <thead>
                        <tr className="bg-[#030712]/80 border-b border-[#1e293b]/40">
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4">Prompt Title</th>
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4">Ai Tool</th>
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4">Visibility</th>
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4">Featured</th>
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4">Status</th>
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {prompts.map((prompt) => (
                            <tr key={prompt._id} className="border-b border-[#1e293b]/20 hover:bg-[#111827]/30 transition-colors group">

                                <td className="py-4 px-4">
                                    <div className="flex flex-col max-w-[280px]">
                                        <span className="font-semibold text-sm text-gray-200 tracking-wide group-hover:text-cyan-400 transition-colors truncate">
                                            {prompt.title}
                                        </span>
                                        <span className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                                            <Layers className="size-3 text-gray-600" />
                                            Category: {prompt.category}
                                        </span>
                                    </div>
                                </td>

                                <td className="py-4 px-4">
                                    <span className={`inline-flex items-center justify-center px-2.5 py-1 text-[10px] font-bold tracking-wider rounded-md border ${getEngineStyle(prompt.aiEngine)}`}>
                                        {prompt.aiTool}
                                    </span>
                                </td>

                                <td className="py-4 px-4">
                                    <span className="text-sm text-gray-400 font-medium">{prompt.visibility}</span>
                                </td>

                                <td className="py-4 px-4">
                                    {prompt.isFeatured ? (
                                        <span className="cursor-pointer inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-bold uppercase rounded bg-amber-500/10 border border-amber-500/30 text-amber-500">
                                            ★ Featured
                                        </span>
                                    ) : (
                                        <button
                                            onClick={() => onHandleFeatured(prompt._id)}
                                            className="cursor-pointer inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-medium uppercase rounded bg-gray-500/5 border border-gray-500/10 text-gray-500">
                                            ☆ Feature
                                        </button>
                                    )}
                                </td>

                                <td className="py-4 px-4">
                                    <span className={`inline-flex items-center justify-center px-3 py-1 text-[10px] font-bold tracking-widest rounded-full border shadow-sm ${getStatusStyle(prompt.status)}`}>
                                        {prompt.status}
                                    </span>
                                </td>

                                <td className="py-4 px-4 text-center">
                                    <div className="flex items-center justify-center gap-1.5">
                                        <Link href={`/allprompts/${prompt?._id}`}>
                                            <Button isIconOnly size="sm" variant="light" className="text-gray-400 hover:text-white hover:bg-gray-500/10 rounded-xl">
                                                <Eye className="size-4" />
                                            </Button>
                                        </Link>

                                        <Button isIconOnly size="sm" variant="light" className="text-gray-500 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-xl" onClick={() => onHandleApprove(prompt._id)}>
                                            <CheckCircle2 className="size-4" />
                                        </Button>

                                        {/* Reject Button: এটি শুধু স্টেট ওপেন করবে, মোডাল এখানে নেই */}
                                        <Button isIconOnly size="sm" variant="light" className="text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl" onClick={() => openRejectModal(prompt._id)}>
                                            <XCircle className="size-4" />
                                        </Button>

                                        <Button isIconOnly size="sm" variant="light" className="text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl" onClick={() => onHandleDeletPrompt(prompt._id)}>
                                            <Trash2 className="size-4" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 📑 একমাত্র মোডাল যা টেবিল লুপের বাইরে রাখা হয়েছে (Focus ও Dismiss সমস্যা সমাধানের জন্য) */}
            <Modal
                isOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
                isDismissable={false} // বাইরে ক্লিক করলে ক্লোজ হবে না
                isKeyboardDismissDisabled={true}
            >
                <Modal.Backdrop>
                    <Modal.Container>
                        <Modal.Dialog className="sm:max-w-[420px] bg-[#0f172a] border border-[#1e293b] rounded-3xl p-2 shadow-2xl">
                            <Modal.CloseTrigger className="text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl" />

                            <Modal.Header className="flex items-center gap-3">
                                <Modal.Icon className="bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-2xl p-2">
                                    <AlertTriangle className="size-5" />
                                </Modal.Icon>
                                <div>
                                    <Modal.Heading className="text-base sm:text-lg font-bold text-white">Reject Prompt</Modal.Heading>
                                    <p className="text-xs text-gray-500 font-medium mt-0.5">Please provide a reason to notify the creator</p>
                                </div>
                            </Modal.Header>

                            <form onSubmit={handleRejectSubmit}>
                                <Modal.Body className="py-2">
                                    <div className="space-y-2">
                                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                            Reason for Rejection
                                        </label>
                                        <textarea
                                            value={rejectReason}
                                            onChange={(e) => setRejectReason(e.target.value)}
                                            placeholder="e.g., Prompt contains generic output description, please fix it..."
                                            className="w-full h-28 px-4 py-3 text-sm text-gray-200 bg-[#030712]/60 border border-[#1e293b] rounded-2xl focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 resize-none transition-all placeholder:text-gray-600"
                                            required
                                        />
                                    </div>
                                </Modal.Body>

                                <Modal.Footer className="flex justify-end gap-2 pt-2">
                                    <Button
                                        size="sm"
                                        variant="light"
                                        onClick={() => setIsModalOpen(false)}
                                        className="text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl font-medium text-xs"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        size="sm"
                                        className="bg-rose-600 hover:bg-rose-700 text-white font-semibold px-4 py-2 rounded-xl text-xs transition-all shadow-lg shadow-rose-600/20"
                                    >
                                        Confirm Reject
                                    </Button>
                                </Modal.Footer>
                            </form>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>

        </div>
    );
}