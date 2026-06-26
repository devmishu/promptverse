"use client";

import React, { useState, useEffect } from "react";
import { Avatar, Button, Chip, TextArea } from "@heroui/react";
import {
    Copy, Bookmark, ArrowLeft, Star, Code,
    Terminal, ShieldCheck, MessageSquare, Activity,
    Lock,
    CreditCard
} from "lucide-react";
import { createBookmark } from "@/lib/actions/bookmark";
import { toast, Toaster } from "react-hot-toast";
import { createReview } from "@/lib/actions/review";
import { ReportModal } from "./ReportModal";
import { ReviewCard } from "@/components/cards/ReviewCard";

export default function PromptDetails({ promptData: initialPromptData, promptId, author, promptReviews }) {
    const [promptData, setPromptData] = useState(initialPromptData);
    const [copied, setCopied] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const [userReview, setUserReview] = useState("");


    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [hasReviewed, setHasReviewed] = useState(false);
    const [isReviewSubmitting, setIsReviewSubmitting] = useState(false);


    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < promptReviews.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };


    // 🛠️ বুকমার্ক, রিভিউ এবং রিপোর্ট একসাথে চেক করার জন্য আপডেট করা ইফেক্ট
    useEffect(() => {
        const checkUserStatus = async () => {
            if (!author?.id || !promptData?._id) return;

            try {
                // ১. বুকমার্ক স্ট্যাটাস চেক
                const bookmarkRes = await fetch(`http://localhost:5000/api/bookmarks/check?userId=${author.id}&promptId=${promptData._id}`);
                const bookmarkData = await bookmarkRes.json();
                if (bookmarkData?.isBookmarked) {
                    setIsBookmarked(true);
                }

                // ২. রিভিউ স্ট্যাটাস চেক
                const reviewRes = await fetch(`http://localhost:5000/api/reviews/check?userId=${author.id}&promptId=${promptData._id}`);
                const reviewData = await reviewRes.json();
                if (reviewData?.hasReviewed) {
                    setHasReviewed(true); // এর ফলে রিফ্রেশ দিলেও "Already Reviewed" দেখাবে
                }

            } catch (error) {
                console.error("Error checking user status:", error);
            }
        };

        checkUserStatus();
    }, [author?.id, promptData?._id]);

    const handleCopy = async () => {
        navigator.clipboard.writeText(promptData.content);
        setCopied(true);

        if (promptData?.locked) {
            toast.error("Unlock lifetime access to copy premium prompts.");
            return;
        }

        // ইনস্ট্যান্ট ইউজার এক্সপেরিয়েন্সের জন্য ফ্রন্টএন্ডে আগে ১ বাড়িয়ে নিচ্ছি
        setPromptData(prevData => ({
            ...prevData,
            copyCount: (prevData.copyCount || 0) + 1
        }));

        toast.success("Prompt copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);

        // 🚀 ব্যাকএন্ড ডাটাবেজে কপি কাউন্ট ১ বাড়ানোর জন্য এপিআই কল
        try {
            await fetch(`http://localhost:5000/api/prompts/${promptData._id}/copy`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.error("Failed to update copy count in database:", error);
        }
    };


    const handleBookmark = async () => {
        // ফ্রন্টেন্ডে প্রথম লেয়ারের ভ্যালিডেশন
        if (isBookmarked) {
            toast.error("Already bookmarked!");
            return;
        }

        try {
            setIsSubmitting(true);

            const bookMarkData = {
                userName: author?.name,
                userImail: author?.id,
                userId: author?.id,
                promptId: promptData._id, // প্রম্পট আইডি এখানে আলাদা থাকবে

                // প্রম্পটের বাকি ডাটাগুলো আলাদা ফিল্ডে পাঠানো হলো
                title: promptData.title,
                description: promptData.description,
                content: promptData.content,
                category: promptData.category,
                aiTool: promptData.aiTool,
                thumbnail: promptData.thumbnail,
                difficulty: promptData.difficulty,
                visibility: promptData.visibility,
                copyCount: promptData.copyCount,
                status: promptData.status,
                tags: promptData.tags || []
            };

            // ব্যাকএন্ডে ডাটা পাঠানো হচ্ছে
            const res = await createBookmark(bookMarkData);

            // সার্ভার অ্যাকশনের রেসপন্স চেক করা হচ্ছে
            if (res?.success) {
                setIsBookmarked(true);
                toast.success("Added to bookmarks!");
            } else {
                // যদি ব্যাকএন্ড অলরেডি বুকমার্কড পায়
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
                userEmail: author?.email,
                userId: author?.id,
                promptId: promptData._id,
                title: promptData.title,
                aiTool: promptData.aiTool,
                rating,
                reviewText,
            };

            // ব্যাকএন্ড সার্ভার অ্যাকশন বা এপিআই কল
            const res = await createReview(promptId, reviewData);

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
        <div className="min-h-screen bg-[#020617] text-slate-200 p-4 sm:p-8 md:p-12 lg:p-16 font-sans selection:bg-purple-500/30">
            <Toaster position="top-center" reverseOrder={false} />

            <div className="max-w-7xl mx-auto flex items-center justify-between mb-8 md:mb-12 border-b border-slate-900 pb-6">
                <Button
                    size="md"
                    variant="light"
                    className="text-slate-400 hover:text-purple-400 transition-colors p-0 bg-transparent min-w-0 flex items-center gap-2.5 text-sm font-bold uppercase tracking-widest"
                    onClick={() => window.history.back()}
                >
                    <ArrowLeft size={16} />
                    Back
                </Button>

                <div className="flex items-center gap-4 sm:gap-5 text-xs sm:text-sm text-slate-400 font-medium">
                    <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px] sm:text-xs font-bold">
                        <Activity size={14} className="text-emerald-500" />
                        {promptData?.visibility}
                    </span>
                    <span className="text-slate-800">|</span>
                    <span>{promptData?.copyCount || 0} Used</span>
                </div>
            </div>

            {/* মেইন গ্রিড স্ট্রাকচার ফিক্স */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">

                {/* কলাম ১: মেটাডাটা ও থাম্বনেইল */}
                <div className="flex flex-col gap-6 lg:col-span-1">
                    {promptData?.thumbnail && (
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
                                {promptData?.aiTool}
                            </Chip>
                            <Chip size="md" variant="flat" color="primary" className="text-xs font-bold uppercase tracking-wider px-2.5 py-1">
                                {promptData?.category}
                            </Chip>
                            <Chip size="md" variant="flat" className="text-xs font-bold bg-slate-900 border border-slate-800 text-slate-400 uppercase px-2.5 py-1">
                                {promptData?.difficulty}
                            </Chip>
                        </div>

                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                            {promptData?.title}
                        </h1>

                        <p className="text-sm md:text-base text-slate-400 font-normal leading-relaxed">
                            {promptData?.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-2">
                            {promptData?.tags?.map((tag, idx) => (
                                <span key={idx} className="text-[11px] font-medium text-cyan-400/80 bg-cyan-500/5 border border-cyan-500/10 px-2 py-0.5 rounded-md">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>

                {/* কলাম ২: প্রম্পট ওয়ার্কস্পেস */}
                <div className="lg:col-span-2 flex flex-col gap-6 md:gap-8">
                    <div className="w-full bg-[#0f172a]/30 border border-slate-800/60 rounded-3xl p-5 sm:p-7 md:p-8 shadow-2xl relative">
                        <div className="flex items-center justify-between gap-4 mb-5">
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2.5">
                                <Terminal size={16} className="text-purple-500" />
                                Console Workspace
                            </span>
                            <div className="flex items-center gap-2">
                                <Button
                                    onClick={handleBookmark}
                                    isLoading={isSubmitting}
                                    isIconOnly
                                    size="md"
                                    variant="light"
                                    className={`rounded-xl transition-colors ${isBookmarked ? "text-purple-400" : "text-slate-400 hover:text-white bg-slate-800"}`}
                                >
                                    <Bookmark size={16} className={isBookmarked ? "fill-purple-500" : ""} />
                                </Button>

                                {promptData?.locked ? <Button disabled={true} isIconOnly size="md" variant="light" className=" hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all bg-slate-800 text-slate-500 cursor-not-allowed opacity-60 pointer-events-none">
                                    <ShieldCheck size={18} />
                                </Button> : <ReportModal promptData={promptData} author={author} />

                                }

                                <Button
                                    size="md"
                                    disabled={promptData?.locked}
                                    className={`font-bold text-xs sm:text-sm rounded-xl h-9 px-4 transition-all ml-2 shadow-lg ${promptData?.locked
                                        ? "bg-slate-800 text-slate-500 cursor-not-allowed opacity-60 pointer-events-none"
                                        : "bg-white hover:bg-slate-200 text-black"
                                        }`}
                                    onClick={() => !promptData?.locked && handleCopy()}
                                >
                                    {copied ? "Copied!" : "Copy Prompt"}
                                </Button>
                            </div>
                        </div>

                        {promptData?.locked ? (
                            <div className="w-full bg-[#020617]/90 border border-dashed border-amber-500/20 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center min-h-[240px] shadow-2xl border-l-4 border-l-amber-500/60 space-y-5">
                                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                                    <Lock size={20} className="animate-pulse" />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm font-bold text-amber-400 uppercase tracking-widest bg-amber-500/5 px-3 py-1 rounded-full border border-amber-500/10 inline-block">
                                        Premium Content Locked
                                    </p>
                                    <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                                        This is a private premium prompt template. Upgrade to get instant, unlimited access to this workspace.
                                    </p>
                                </div>
                                <div className="pt-2 w-full max-w-xs relative">


                                    <form action="/api/checkout_sessions" method="POST">
                                        <section>
                                            <input
                                                type="hidden"
                                                name="currentPage"
                                                value={typeof window !== "undefined" ? window.location.pathname : ""}
                                            />
                                            <button

                                                type="submit" role="link"
                                                className="cursor-pointer group relative w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-semibold text-sm py-3 px-6 rounded-xl transition-all duration-300 hover:from-amber-400 hover:to-amber-500 active:scale-[0.98] shadow-[0_4px_20px_rgba(245,158,11,0.2)]"
                                            >
                                                <CreditCard size={16} className="transition-transform group-hover:scale-110" />
                                                <span>Unlock Lifetime Access — $10</span>
                                                <span className="absolute -top-2 -right-2 bg-slate-900 text-amber-400 text-[9px] font-bold px-2 py-0.5 rounded-md border border-amber-500/30 tracking-wider uppercase shadow-md">
                                                    One-Time
                                                </span>
                                            </button>

                                            {/* <button
                                                type="button"
                                                onClick={handlePayment}
                                                className="group relative w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-semibold text-sm py-3 px-6 rounded-xl"
                                            >
                                                <CreditCard size={16} />
                                                <span>Unlock Lifetime Access — $10</span>
                                            </button> */}

                                        </section>
                                    </form>






                                    <p className="text-[10px] text-slate-500 mt-2.5 flex items-center justify-center gap-1">
                                        <span>⚡ Secure payment</span>
                                        <span>•</span>
                                        <span>Pay once, use forever</span>
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full bg-[#020617]/90 border border-slate-900 rounded-2xl p-5 sm:p-6 md:p-7 font-mono text-sm sm:text-base text-emerald-400 leading-relaxed shadow-2xl border-l-4 border-l-emerald-500/70 overflow-x-auto">
                                {promptData?.content}
                            </div>
                        )}

                        <div className="mt-6 pt-5 border-t border-slate-900/60 flex flex-wrap gap-x-6 gap-y-2 justify-between text-xs text-slate-500">
                            <div className="flex items-center gap-2">
                                <span>Status: <span className="text-emerald-500 font-semibold uppercase text-[11px]">{promptData?.status}</span></span>
                            </div>

                        </div>
                    </div>

                    {/* রিভিউ এবং ফিডব্যাক সেকশন */}
                    <div className="mt-2">
                        <h3 className="text-xs sm:text-sm font-bold text-slate-400 tracking-wider uppercase mb-5 flex items-center gap-2.5">
                            <MessageSquare size={16} /> Community Feedback ({promptReviews.length})
                        </h3>

                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                            {promptData?.locked ? (
                                <div className="lg:col-span-2 bg-[#0f172a]/20 border border-dashed border-amber-500/25 rounded-2xl p-6 flex flex-col items-center justify-center text-center min-h-[220px] shadow-lg border-l-4 border-l-amber-500/60">
                                    <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/10 mb-3">
                                        <Lock size={14} className="animate-pulse" />
                                    </div>
                                    <p className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
                                        Reviews Locked
                                    </p>
                                    <p className="text-[11px] text-slate-400 max-w-[220px] leading-relaxed">
                                        Feedback and rating system is exclusive to premium members. Upgrade to unlock community insights.
                                    </p>
                                </div>
                            ) : (
                                <div className="lg:col-span-2 w-full">
                                    {hasReviewed ? (
                                        <div className="bg-[#0f172a]/10 border border-slate-900/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center border-dashed min-h-[220px]">
                                            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-3">
                                                <ShieldCheck size={20} />
                                            </div>
                                            <p className="text-sm font-bold text-slate-300 uppercase tracking-wider">Already Reviewed</p>
                                            <p className="text-xs text-slate-500 mt-1 max-w-[200px]">You have already shared your feedback for this prompt.</p>
                                        </div>
                                    ) : (
                                        <div className="bg-[#0f172a]/20 border border-slate-900 rounded-2xl p-5 sm:p-6 flex flex-col gap-4">
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

                                            <TextArea
                                                value={userReview}
                                                onChange={handleReviewData}
                                                placeholder="Share your thoughts..."
                                                variant="flat"
                                                rows={3}
                                                className={{
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
                                </div>
                            )}

                            <div className="lg:col-span-3 flex flex-col gap-4">
                                {promptReviews && promptReviews.length > 0 ? (
                                    <>
                                        {/* Shudhu matro current index er review card-ti dekhabe */}
                                        <ReviewCard
                                            key={promptReviews[currentIndex]._id || currentIndex}
                                            review={promptReviews[currentIndex]}
                                        />

                                        {/* 1 tar beshi review thaklei shudhu navigation arrow dekhabe */}
                                        {promptReviews.length > 1 && (
                                            <div className="flex items-center justify-end gap-3 mt-1">
                                                {/* Prev Button */}
                                                <button
                                                    onClick={handlePrev}
                                                    disabled={currentIndex === 0}
                                                    className={`p-2 rounded-xl border border-slate-800 bg-[#0b0f19]/60 text-slate-400 transition-all duration-200
                                ${currentIndex === 0
                                                            ? 'opacity-40 cursor-not-allowed'
                                                            : 'hover:bg-slate-900 hover:text-white'
                                                        }`}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                                    </svg>
                                                </button>

                                                {/* Next Button */}
                                                <button
                                                    onClick={handleNext}
                                                    disabled={currentIndex === promptReviews.length - 1}
                                                    className={`p-2 rounded-xl border border-slate-800 bg-[#0b0f19]/60 text-slate-400 transition-all duration-200
                                ${currentIndex === promptReviews.length - 1
                                                            ? 'opacity-40 cursor-not-allowed'
                                                            : 'hover:bg-slate-900 hover:text-white'
                                                        }`}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                                    </svg>
                                                </button>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="w-full h-full bg-[#0b0f19]/40 border border-slate-900/60 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center min-h-[220px]">
                                        <p className="text-sm text-slate-500 max-w-[240px] leading-relaxed">
                                            No community comments yet. Be the first to start the discussion!
                                        </p>
                                    </div>
                                )}
                            </div>


                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}