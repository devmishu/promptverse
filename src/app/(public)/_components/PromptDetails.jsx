"use client";

import React, { useState } from "react";
import { Avatar, Button, Chip, TextArea } from "@heroui/react";
import {
    Copy, Bookmark, ArrowLeft, Star, Code,
    Terminal, ShieldCheck, MessageSquare, Activity
} from "lucide-react";
import { createBookmark } from "@/lib/actions/bookmark";
import { toast, Toaster } from "react-hot-toast";
import { createReview } from "@/lib/actions/review";
import { ReportModal } from "./ReportModal";

export default function PromptDetails({ promptData: initialPromptData, promptId, author }) {


    const [promptData, setPromptData] = useState(initialPromptData);
    const [copied, setCopied] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const [userReview, setUserReview] = useState("");


    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [hasReviewed, setHasReviewed] = useState(false);
    const [isReviewSubmitting, setIsReviewSubmitting] = useState(false);


    const handleCopy = () => {
        navigator.clipboard.writeText(promptData.content);
        setCopied(true);

        setPromptData(prevData => ({
            ...prevData,
            copyCount: prevData.copyCount + 1
        }));

        toast.success("Prompt copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    };


    // const handleBookmark = async () => {

    //     if (isBookmarked) {
    //         toast.error("Already bookmarked!");
    //         return;
    //     }

    //     try {
    //         setIsSubmitting(true);

    //         const bookMarkData = {
    //             userName: author?.name,
    //             userImail: author?.id,
    //             userId: author?.id,
    //             ...promptData
    //         };

    //         await createBookmark(bookMarkData);


    //         setIsBookmarked(true);
    //         toast.success("Added to bookmarks!");

    //     } catch (error) {
    //         toast.error("Failed to bookmark. Try again!");
    //     }
    // };

    const handleBookmark = async () => {
        // ফ্রন্টেন্ডে প্রথম লেয়ারের ভ্যালিডেশন
        if (isBookmarked) {
            toast.error("Already bookmarked!");
            return;
        }

        try {
            setIsSubmitting(true);

            const bookMarkData = {
                userName: author?.name,
                userImail: author?.id, // আপনার প্রজেক্টের এক্সিস্টিং প্রোপার্টি স্ট্রাকচার রাখা হলো
                userId: author?.id,
                ...promptData // এর ভেতরেই প্রম্পটের আইডি বা _id প্রোপার্টিটি ব্যাকএন্ডে চলে যাবে
            };

            // ব্যাকএন্ডে ডাটা পাঠানো হচ্ছে
            const res = await createBookmark(bookMarkData);

            // সার্ভার অ্যাকশনের রেসপন্স চেক করা হচ্ছে
            if (res?.success) {
                setIsBookmarked(true);
                toast.success("Added to bookmarks!");
            } else {
                // যদি ব্যাকএন্ড অলরেডি বুকমার্কড পায়
                if (res?.alreadyBookmarked) {
                    setIsBookmarked(true);
                }
                toast.error(res?.message || "Failed to bookmark.");
            }

        } catch (error) {
            console.error("Bookmark error:", error);

            // ব্যাকএন্ডের ৪০০ বা ৪_ ডুপ্লিকেট এরর মেসেজ ক্যাচ করার জন্য
            const errorMessage = error?.response?.data?.message || error?.message || "";

            if (errorMessage.includes("already bookmarked") || error?.response?.data?.alreadyBookmarked) {
                setIsBookmarked(true);
                toast.error("Already bookmarked!");
            } else {
                toast.error("Failed to bookmark. Try again!");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReviewData = (e) => {
        const review = e.target.value;
        setUserReview(review);
    };


    const handleUserReview = async (rating, reviewText) => {
        // রেটিং ভ্যালিডেশন
        if (rating === 0) {
            toast.error("Please select a rating star!");
            return;
        }

        // টেক্সট ভ্যালিডেশন
        if (!reviewText.trim()) {
            toast.error("Please write some thoughts before publishing!");
            return;
        }

        // ইউজার একবার রিভিউ দিয়ে দিলে ২য় বার আটকে দিবে
        if (hasReviewed) {
            toast.error("You have already reviewed this prompt!");
            return;
        }

        try {
            setIsReviewSubmitting(true);

            const reviewData = {
                userName: author?.name,
                userImail: author?.email, // আপনার দেওয়া স্পেলিং
                userId: author?.id,
                promptId: promptData._id,
                rating,
                reviewText,
            };

            // ব্যাকএন্ড সার্ভার অ্যাকশন বা এপিআই কল
            const res = await createReview(reviewData);

            // যদি আপনার সার্ভার অ্যাকশন সরাসরি অবজেক্ট রিটার্ন করে (যেমন: { success: true })
            if (res?.success) {
                setHasReviewed(true);
                toast.success("Review published successfully!");
                setUserReview("");
                setUserRating(0);
            } else {
                // যদি ব্যাকএন্ড থেকে সাকসেস না আসে
                if (res?.alreadyReviewed) {
                    setHasReviewed(true);
                }
                toast.error(res?.message || "Failed to publish review.");
            }

        } catch (error) {
            console.error("Review submit error:", error);

            // 💡 ব্যাকএন্ডের ৪০০ এরর বা ডুপ্লিকেট চেকের মেসেজ এখানে হ্যান্ডেল করা হচ্ছে
            const errorMessage = error?.response?.data?.message || error?.message || "";

            if (errorMessage.includes("already reviewed") || error?.response?.data?.alreadyReviewed) {
                setHasReviewed(true);
                toast.error("You have already reviewed this prompt!");
            } else {
                toast.error("Failed to publish review. Try again!");
            }
        } finally {
            setIsReviewSubmitting(false);
        }
    };


    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 p-6 sm:p-10 md:p-16 font-sans selection:bg-purple-500/30">

            {/* টোস্ট মেসেজ কন্টেইনার */}
            <Toaster position="top-center" reverseOrder={false} />

            {/* ১. টপ নেভিগেশন */}
            <div className="max-w-7xl mx-auto flex items-center justify-between mb-12 border-b border-slate-900 pb-6">
                <Button
                    size="md"
                    variant="light"
                    className="text-slate-400 hover:text-purple-400 transition-colors p-0 bg-transparent min-w-0 flex items-center gap-2.5 text-sm font-bold uppercase tracking-widest"
                    onClick={() => window.history.back()}
                >
                    <ArrowLeft size={16} />
                    Back
                </Button>

                <div className="flex items-center gap-5 text-sm text-slate-400 font-medium">
                    <span className="flex items-center gap-1.5 uppercase tracking-wider text-xs font-bold">
                        <Activity size={14} className="text-emerald-500" />
                        {promptData.visibility}
                    </span>
                    <span className="hidden sm:inline text-slate-800">|</span>
                    <span>{promptData.copyCount} Used</span>
                </div>
            </div>

            {/* ২. ৩-কলাম লিকুইড গ্রিড স্ট্রাকচার */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

                {/* === কলাম ১: টাইটেল, থাম্বনেইল, ডেসক্রিপশন এবং ক্রিয়েটর === */}
                <div className="flex flex-col gap-6 lg:col-span-1">
                    {promptData.thumbnail && (
                        <div className="w-full aspect-[1.8/1] rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-950 shadow-xl group">
                            <img
                                src={promptData.thumbnail}
                                alt={promptData.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                            <Chip size="md" variant="flat" color="secondary" className="text-xs font-bold uppercase tracking-wider px-2.5 py-1">
                                {promptData.aiTool}
                            </Chip>
                            <Chip size="md" variant="flat" color="primary" className="text-xs font-bold uppercase tracking-wider px-2.5 py-1">
                                {promptData.category}
                            </Chip>
                            <Chip size="md" variant="flat" className="text-xs font-bold bg-slate-900 border border-slate-800 text-slate-400 uppercase px-2.5 py-1">
                                {promptData.difficulty}
                            </Chip>
                        </div>

                        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                            {promptData.title}
                        </h1>

                        <p className="text-sm sm:text-base text-slate-400 font-normal leading-relaxed">
                            {promptData.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-2">
                            {promptData.tags?.map((tag, idx) => (
                                <span key={idx} className="text-[11px] font-medium text-cyan-400/80 bg-cyan-500/5 border border-cyan-500/10 px-2 py-0.5 rounded-md">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* ক্রিয়েটর কার্ড */}
                    <div className="bg-[#0b0f19]/60 border border-slate-900/50 p-5 rounded-2xl flex items-center justify-between shadow-xl mt-2">
                        <div className="flex items-center gap-3.5">
                            <Avatar
                                name={promptData.author?.name}
                                src={promptData.author?.avatarUrl}
                                className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-cyan-500 text-white font-bold text-sm"
                            />
                            <div className="flex flex-col min-w-0">
                                <span className="text-sm font-bold text-slate-200 truncate">{promptData.author?.name}</span>
                                <span className="text-xs text-slate-500 truncate mt-0.5">{promptData.author?.email}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/20 text-amber-400 font-black text-xs">
                            <Star size={12} className="fill-amber-400" />
                            {promptData?.rating?.toFixed(1)}
                        </div>
                    </div>
                </div>

                {/* === কলাম ২: প্রম্পট ওয়ার্কস্পেস === */}
                <div className="lg:col-span-2 flex flex-col gap-8">
                    <div className="w-full bg-[#0f172a]/30 border border-slate-800/60 rounded-3xl p-7 sm:p-8 shadow-2xl relative">
                        <div className="flex items-center justify-between mb-5">
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2.5">
                                <Terminal size={16} className="text-purple-500" />
                                Console Workspace
                            </span>
                            <div className="flex items-center gap-2">
                                {/* বুকমার্ক বাটন (আইকন কন্ডিশনাল ফিল এবং লোডিং স্টেট সহ) */}
                                <Button
                                    onClick={handleBookmark}
                                    isLoading={isSubmitting}
                                    isIconOnly
                                    size="md"
                                    variant="light"
                                    className={`rounded-xl transition-colors ${isBookmarked ? "text-purple-400" : "text-slate-400 hover:text-white"}`}
                                >
                                    <Bookmark size={16} className={isBookmarked ? "fill-purple-500" : ""} />
                                </Button>


                                <ReportModal
                                    promptData={promptData}
                                    author={author}
                                />

                                <Button
                                    size="md"
                                    className="bg-white hover:bg-slate-200 text-black font-bold text-xs sm:text-sm rounded-xl h-9 px-4 transition-all ml-2 shadow-lg"
                                    onClick={handleCopy}
                                >
                                    {copied ? "Copied!" : "Copy Prompt"}
                                </Button>
                            </div>
                        </div>

                        <div className="w-full bg-[#020617]/90 border border-slate-900 rounded-2xl p-6 sm:p-7 font-mono text-sm sm:text-base text-emerald-400 leading-relaxed shadow-2xl border-l-4 border-l-emerald-500/70">
                            {promptData.content}
                        </div>

                        <div className="mt-6 pt-5 border-t border-slate-900/60 flex flex-wrap gap-x-6 gap-y-2 justify-between text-xs text-slate-500">
                            <div className="flex items-center gap-2">
                                <Code size={15} className="text-slate-600" />
                                <span>Status: <span className="text-emerald-500 font-semibold uppercase text-[11px]">{promptData.status}</span></span>
                            </div>
                            <span className="font-mono text-[11px]">ID: {promptData._id}</span>
                        </div>
                    </div>

                    {/* === রিভিউ সেকশন === */}
                    <div className="mt-2">
                        <h3 className="text-xs sm:text-sm font-bold text-slate-400 tracking-wider uppercase mb-5 flex items-center gap-2.5">
                            <MessageSquare size={16} /> Community Feedback ({promptData.reviewCount})
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                            {hasReviewed ? (
                                <div className="md:col-span-2 bg-[#0f172a]/10 border border-slate-900/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center border-dashed min-h-[220px]">
                                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-3">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <p className="text-sm font-bold text-slate-300 uppercase tracking-wider">Already Reviewed</p>
                                    <p className="text-xs text-slate-500 mt-1 max-w-[200px]">You have already shared your feedback for this prompt.</p>
                                </div>
                            ) : (
                                <div className="md:col-span-2 bg-[#0f172a]/20 border border-slate-900 rounded-2xl p-6 flex flex-col gap-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Your Rating</span>
                                        <div className="flex items-center gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button key={star} onClick={() => setUserRating(star)} className="focus:outline-none transition-transform active:scale-90">
                                                    <Star size={15} className={`${star <= userRating ? "fill-amber-400 text-amber-400" : "fill-slate-800 text-slate-700"}`} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* HeroUI v3 কনভেনশন অনুযায়ী সঠিক ছোট হাতের TextArea */}
                                    <TextArea
                                        value={userReview}
                                        onChange={handleReviewData}
                                        placeholder="Share your thoughts..."
                                        variant="flat"
                                        rows={3}
                                        classNames={{
                                            inputWrapper: "bg-[#020617]/60 border border-slate-900 rounded-xl p-3.5",
                                            input: "text-sm text-slate-300 placeholder:text-slate-700",
                                        }}
                                    />

                                    <Button
                                        onClick={() => handleUserReview(userRating, userReview)}
                                        isLoading={isReviewSubmitting}
                                        size="md"
                                        className="w-full h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm transition-all"
                                    >
                                        Publish Review
                                    </Button>
                                </div>
                            )}


                            <div className="md:col-span-3 bg-[#0b0f19]/40 border border-slate-900/60 rounded-2xl p-6 flex flex-col items-center justify-center text-center p-8">
                                <p className="text-sm text-slate-500 max-w-[240px] leading-relaxed">
                                    No community comments yet. Be the first to start the discussion!
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}