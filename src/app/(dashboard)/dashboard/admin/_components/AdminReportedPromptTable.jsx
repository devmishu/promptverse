"use client";

import { Button } from "@heroui/react";
import { AlertOctagon, Eye, CheckCircle, ShieldAlert, Trash2, Calendar, FileText, User } from "lucide-react";
import Link from "next/link";

export default function AdminReportedPromptTable({ deletePrompt, reports = [], onHandleDismiss, onWarn, onHandleDeletePrompt }) {

    console.log("admin reported prompts..", reports);


    return (
        <div className="w-full bg-[#111827]/20 border border-[#1e293b]/50 rounded-3xl backdrop-blur-md p-4 sm:p-6 shadow-2xl relative overflow-hidden">

            {/* Table Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
                        <AlertOctagon className="text-rose-500 size-4 sm:size-5 animate-pulse" />
                        Reported Prompt
                    </h2>

                </div>
            </div>

            {/* 📱 স্মুথ মোবাইল স্ক্রল র‍্যাপার (Custom Hidden Scrollbar) */}
            <div className="w-full overflow-x-auto touch-pan-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pb-2">
                <table className="w-full min-w-[1100px] border-collapse text-left table-auto">
                    <thead>
                        <tr className="bg-[#030712]/80 border-b border-[#1e293b]/40">
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4 whitespace-nowrap">Prompt Title</th>
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4 whitespace-nowrap">Reason</th>
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4 whitespace-nowrap">Reporter Info</th>
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4 whitespace-nowrap">Description</th>
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4 whitespace-nowrap">Date</th>
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4 text-center whitespace-nowrap">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {reports.map((report) => {
                            // যদি ডেট ফিল্ড থাকে তবে ফরম্যাট করবে, না থাকলে কারেন্ট ডেট দেখাবে ব্যাকআপ হিসেবে
                            const rawDate = report?.createdAt?.$date || report?.createdAt || new Date();
                            const formattedDate = new Date(rawDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                            });

                            return (
                                <tr key={report?._id?.$oid || report?.promptId} className="border-b border-[#1e293b]/20 hover:bg-[#111827]/30 transition-colors group">

                                    {/* Column 1: Prompt Title */}
                                    <td className="py-4 px-4">
                                        <div className="flex flex-col max-w-[200px]">
                                            <span className="font-semibold text-sm text-gray-200 tracking-wide group-hover:text-rose-400 transition-colors truncate">
                                                {report.title || "Photo Creation"}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Column 2: Reason Badge */}
                                    <td className="py-4 px-4 whitespace-nowrap">
                                        <span className="inline-flex items-center justify-center px-2.5 py-1 text-[10px] font-bold tracking-wider rounded-md border bg-rose-500/10 border-rose-500/20 text-rose-400 uppercase">
                                            {report.reason}
                                        </span>
                                    </td>

                                    {/* Column 3: Reporter Details */}
                                    <td className="py-4 px-4 whitespace-nowrap">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-300 flex items-center gap-1">
                                                <User className="size-3.5 text-gray-500" />
                                                {report.userName}
                                            </span>
                                            <span className="text-xs text-gray-500 pl-4.5">{report.userImail}</span>
                                        </div>
                                    </td>

                                    {/* Column 4: Description */}
                                    <td className="py-4 px-4">
                                        <p className="text-xs text-gray-400 max-w-[250px] truncate" title={report.description}>
                                            {report.description}
                                        </p>
                                    </td>

                                    {/* Column 5: Date */}
                                    <td className="py-4 px-4 whitespace-nowrap">
                                        <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
                                            <Calendar className="size-3.5 text-gray-500" />
                                            {formattedDate}
                                        </div>
                                    </td>

                                    {/* 🎯 Column 6: Action Buttons Group (As per image) */}
                                    <td className="py-4 px-4 whitespace-nowrap">
                                        <div className="flex items-center justify-center gap-2">

                                            {/* Inspect Button */}
                                            <Link href={`/allprompts/${report.promptId}`}>
                                                <Button
                                                    size="sm"
                                                    variant="bordered"
                                                    className="text-xs text-gray-300 border-[#1e293b] hover:bg-gray-500/10 h-8 rounded-xl font-medium transition-colors"

                                                >
                                                    <Eye className="size-3.5 mr-1 text-gray-400" />
                                                    Inspect
                                                </Button>
                                            </Link>

                                            {/* allprompts/6a367cfbaf312cefed70e4f8 */}

                                            {/* Dismiss Button */}
                                            <Button
                                                size="sm"
                                                variant="bordered"
                                                className="text-xs text-emerald-400 border-[#1e293b] hover:bg-emerald-500/10 h-8 rounded-xl font-medium transition-colors"
                                                onClick={() => onHandleDismiss(report._id)}
                                            >
                                                <CheckCircle className="size-3.5 mr-1 text-emerald-500" />
                                                Dismiss
                                            </Button>

                                            {/* Warn Creator Button */}
                                            <Button
                                                size="sm"
                                                variant="bordered"
                                                className="text-xs text-amber-400 border-[#1e293b] hover:bg-amber-500/10 h-8 rounded-xl font-medium transition-colors"
                                                onClick={() => onWarn && onWarn(report.userId)}
                                            >
                                                <ShieldAlert className="size-3.5 mr-1 text-amber-500" />
                                                Warn Creator
                                            </Button>

                                            {/* Remove Prompt Button */}
                                            <Button
                                                size="sm"
                                                className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 h-8 rounded-xl font-bold transition-colors"
                                                onClick={() => onHandleDeletePrompt(report.promptId)}
                                            >
                                                <Trash2 className="size-3.5 mr-1" />
                                                Remove Prompt {report.promptId}
                                            </Button>

                                        </div>
                                    </td>

                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

        </div>
    );
}