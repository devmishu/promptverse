"use client";

import { Button, Modal } from "@heroui/react";
import { Calendar, Star, Eye, MessageSquareText, Sparkles } from "lucide-react";
import { useState } from "react";

export default function UserReviewTable({ reviews = [] }) {
    
    const [isOpen, setIsOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);

    const handleOpenModal = (review) => {
        setSelectedReview(review);
        setIsOpen(true);
    };

    return (
        <div className="w-full max-w-full bg-[#111827]/20 border border-[#1e293b]/50 rounded-3xl backdrop-blur-md p-4 sm:p-6 shadow-2xl relative overflow-hidden">

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

            {/* Table Container */}
            <div className="w-full overflow-x-auto overflow-y-hidden block touch-pan-x dynamic-scroll">
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
                                <td className="py-4 px-4">
                                    <span className="font-semibold text-sm text-gray-200 tracking-wide line-clamp-1">
                                        {review?.title || "blank title"}
                                    </span>
                                </td>

                                <td className="py-4 px-4">
                                    <span className="text-xs font-mono text-cyan-400 bg-cyan-500/5 px-2 py-1 rounded-md border border-cyan-500/10 whitespace-nowrap">
                                        {review.aiTool || "Ai tool"}
                                    </span>
                                </td>

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

                                <td className="py-4 px-4 max-w-[300px]">
                                    {review.reviewText ? (
                                        <p className="text-sm text-gray-400 font-medium truncate" title={review.reviewText}>
                                            {review.reviewText}
                                        </p>
                                    ) : (
                                        <span className="text-xs text-gray-500 italic font-normal tracking-wide whitespace-nowrap">
                                            No comment yet
                                        </span>
                                    )}
                                </td>

                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium whitespace-nowrap">
                                        <Calendar className="size-3.5 text-gray-500" />
                                        {review.createdAt}
                                    </div>
                                </td>

                                <td className="py-4 px-4 text-center">
                                    
                                    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                                        <Button
                                            isIconOnly
                                            size="sm"
                                            variant="light"
                                            className="text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-xl"
                                            aria-label="View Detailed Review"
                                            onClick={() => handleOpenModal(review)}
                                        >
                                            <Eye className="size-4" />
                                        </Button>
                                        <Modal.Backdrop className="bg-[#030712]/60 backdrop-blur-sm">
                                            <Modal.Container>
                                                <Modal.Dialog className="sm:max-w-[480px] bg-[#0b1329] border border-[#1e293b] text-white rounded-2xl shadow-2xl p-6">
                                                    <Modal.CloseTrigger className="text-gray-400 hover:text-white transition-colors" />

                                                    <Modal.Header className="flex items-center gap-3 p-0 pb-4 border-b border-[#1e293b]/50">
                                                        <Modal.Icon className="bg-cyan-500/10 text-cyan-400 p-2.5 rounded-xl border border-cyan-500/20">
                                                            <Sparkles className="size-5" />
                                                        </Modal.Icon>
                                                        <div>
                                                            <Modal.Heading className="text-base font-bold text-white tracking-tight">
                                                                Review Insights
                                                            </Modal.Heading>
                                                            <p className="text-xs text-gray-400 font-mono mt-0.5">
                                                                Target: {selectedReview?.aiTool || "N/A"}
                                                            </p>
                                                        </div>
                                                    </Modal.Header>

                                                    <Modal.Body className="p-0 py-5 flex flex-col gap-4">
                                                        <div className="flex flex-col gap-1">
                                                            <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">Title</span>
                                                            <h4 className="text-base font-semibold text-gray-200">
                                                                {selectedReview?.title || "No Title Provided"}
                                                            </h4>
                                                        </div>

                                                        <div className="flex flex-col gap-1">
                                                            <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">Rating</span>
                                                            <div className="flex items-center gap-0.5 pt-0.5">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <Star
                                                                        key={i}
                                                                        className={`size-4 ${i < (selectedReview?.rating || 0)
                                                                            ? "fill-amber-400 text-amber-400"
                                                                            : "text-gray-700"
                                                                            }`}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-col gap-1.5 bg-[#111827]/50 border border-[#1e293b]/40 rounded-xl p-4">
                                                            <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">User Comment</span>
                                                            <p className="text-sm text-gray-300 leading-relaxed">
                                                                {selectedReview?.reviewText || "User left no explicit feedback text."}
                                                            </p>
                                                        </div>
                                                    </Modal.Body>

                                                    <Modal.Footer className="p-0 pt-2 flex items-center justify-between">
                                                        <div className="flex items-center gap-1.5 text-gray-500 text-xs font-medium">
                                                            <Calendar className="size-3.5" />
                                                            <span>Logged: {selectedReview?.createdAt}</span>
                                                        </div>
                                                    </Modal.Footer>
                                                </Modal.Dialog>
                                            </Modal.Container>
                                        </Modal.Backdrop>
                                    </Modal>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </div>
    );
}