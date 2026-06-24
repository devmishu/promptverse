"use client";

import { Button } from "@heroui/react";
import { Calendar, Star, Eye, MessageSquareText } from "lucide-react";

export default function UserReviewTable({ reviews = [] }) {
    // প্রপস হিসেবে ডাটা না আসলে যেন ক্র্যাশ না করে, সেজন্য লোকাল ফেক ডাটা ব্যাকআপ
    


    return (
        // ১. কন্টেইনারে max-w-full এবং p-4 sm:p-6 করা হয়েছে যাতে মোবাইলে বর্ডার স্ক্রিনের বাইরে না চলে যায়
        <div className="w-full max-w-full bg-[#111827]/20 border border-[#1e293b]/50 rounded-3xl backdrop-blur-md p-4 sm:p-6 shadow-2xl relative overflow-hidden ">

            {/* Table Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                        <MessageSquareText className="text-cyan-400 size-5" />
                        User Feedback Records
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Overview of user ratings, feature logs, and raw submission content.
                    </p>
                </div>
            </div>

            {/* ২. কাস্টম স্ক্রলবার হাইড ক্লাসগুলো সরিয়ে স্ট্যান্ডার্ড touch-scroll এবং block লেআউট দেওয়া হয়েছে */}
            <div className="w-full overflow-x-auto overflow-y-hidden block touch-pan-x dynamic-scroll">
                {/* ৩. table-auto দিয়ে কলামগুলোর উইডথ সুরক্ষিত করা হয়েছে */}
                <table className="w-full min-w-[950px] border-collapse text-left table-auto">
                    <thead>
                        <tr className="bg-[#030712]/80 border-b border-[#1e293b]/40">
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4">Review Title</th>
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4">AI Tool</th>
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4">Rating</th>
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4 w-[300px]">User Comment</th>
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4">Submitted Date</th>
                            <th className="text-gray-400 font-semibold text-xs uppercase py-4 px-4 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {reviews.map((review) => (
                            <tr
                                key={review._id}
                                className="border-b border-[#1e293b]/20 hover:bg-[#111827]/30 transition-colors group"
                            >
                                {/* Column 1: Title */}
                                <td className="py-4 px-4">
                                    <span className="font-semibold text-sm text-gray-200 tracking-wide line-clamp-1">
                                        {review?.title || "blank title"}
                                    </span>
                                </td>

                                {/* Column 2: AI Tool */}
                                <td className="py-4 px-4">
                                    <span className="text-xs font-mono text-cyan-400 bg-cyan-500/5 px-2 py-1 rounded-md border border-cyan-500/10 whitespace-nowrap">
                                        {review.aiTool || "Ai tool"}
                                    </span>
                                </td>

                                {/* Column 3: Rating Stars */}
                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`size-3.5 ${i < review.rating
                                                    ? "fill-amber-400 text-amber-400"
                                                    : "text-gray-600"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </td>

                                {/* Column 4: Comment (Safe Truncate Fix) */}
                                <td className="py-4 px-4 max-w-[300px]">
                                    {review.reviewText ? (
                                        <p className="text-sm text-gray-400 font-medium truncate" title={review.comment}>
                                            {review.reviewText}
                                        </p>
                                    ) : (
                                        <span className="text-xs text-gray-500 italic font-normal tracking-wide whitespace-nowrap">
                                            No comment yet
                                        </span>
                                    )}
                                </td>

                                {/* Column 5: Submitted Date */}
                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium whitespace-nowrap">
                                        <Calendar className="size-3.5 text-gray-500" />
                                        {review.createdAt}
                                    </div>
                                </td>

                                {/* Column 6: Action View Button */}
                                <td className="py-4 px-4 text-center">
                                    <Button
                                        isIconOnly
                                        size="sm"
                                        variant="light"
                                        className="text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-xl"
                                        aria-label="View Detailed Review"
                                        onClick={() => alert(`Review Details:\n\nTitle: ${review.title}\nComment: ${review.comment || "No comment yet"}`)}
                                    >
                                        <Eye className="size-4" />
                                    </Button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}