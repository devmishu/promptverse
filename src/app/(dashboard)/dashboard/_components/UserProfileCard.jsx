"use client";

import { Avatar, Button, Card, Link } from "@heroui/react";
import {
    ShieldCheck,
    Zap,
    Crown,
    FileCode2,
    CheckCircle2,
    Sparkles,
    UserCheck,
    AlertCircle,
    CreditCard,
    ShieldAlert,
    Calendar
} from "lucide-react";

export default function UserProfileCard({ user = {}, myPrompts, title, warnings }) {
    // Props Destructuring
    const {
        name = "Anonymous User",
        email = "user@example.com",
        userImage,
        role = "user",
        plan = "free",
        promptsPublishedLength = 0,
        emailVerified
    } = user;

    const isPremium = plan?.toLowerCase() === "premium";

    return (
       
        <div className="  w-full bg-[#111827]/20 border border-[#1e293b]/50 rounded-3xl backdrop-blur-md p-5 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col gap-6 sm:gap-8">

            {/* ─── TOP SECTION: PROFILE INFO & BADGES ─── */}
            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left justify-between gap-4 border-b border-[#1e293b]/30 pb-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-5">
                    {/* Profile Photo with Premium Glow */}
                    <img className="rounded-full w-20 h-20"
                        src={userImage} alt={name}
                    />


                    {/* Name & Email */}
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center justify-center md:justify-start gap-1.5">
                            {name}
                            {emailVerified && <UserCheck className="size-5 text-cyan-400" />}
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-400 mt-1 font-mono break-all">{email}</p>
                    </div>
                </div>

                {/* Badges Stack */}
                <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 md:mt-2">
                    {/* Role Badge */}
                    <span className={`inline-flex items-center gap-1 px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-md border ${role === 'admin'
                        ? "bg-rose-500/10 border-rose-500/30 text-rose-400"
                        : "bg-gray-500/10 border-[#1e293b] text-gray-400"
                        }`}>
                        {role}
                    </span>

                    {/* Premium/Plan Badges */}
                    {isPremium ? (
                        <>
                            <span className="inline-flex items-center gap-1 px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-md border bg-purple-500/10 border-purple-500/30 text-purple-400">
                                <Crown className="size-3" /> Premium
                            </span>
                        </>
                    ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-md border bg-amber-500/10 border-amber-500/20 text-amber-500">
                            Free
                        </span>
                    )}
                </div>
            </div>

            {/* ─── MIDDLE SECTION: ANALYTICS CARDS (Fully Responsive Grid) ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 relative z-10">
                {/* Card 1: Prompts Published */}
                <Card className="bg-[#030712]/50 border border-[#1e293b]/30 shadow-none rounded-2xl p-5 flex flex-row items-center gap-4">
                    <div className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 p-3 rounded-xl w-fit">
                        <FileCode2 className="size-5" />
                    </div>
                    <div>
                        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{title}</p>
                        <h4 className="text-2xl font-bold text-white mt-0.5">{myPrompts}</h4>
                    </div>
                </Card>

                {/* Card 2: Account Verification */}
                <Card className="bg-[#030712]/50 border border-[#1e293b]/30 shadow-none rounded-2xl p-5 flex flex-row items-center gap-4">
                    <div className={`p-3 rounded-xl w-fit border ${emailVerified
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                        : "bg-amber-500/10 border-amber-500/20 text-amber-500"
                        }`}>
                        {emailVerified ? <ShieldCheck className="size-5" /> : <AlertCircle className="size-5" />}
                    </div>
                    <div>
                        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Verification Status</p>
                        <h4 className={`text-base font-bold mt-0.5 ${emailVerified ? "text-emerald-400" : "text-amber-500"}`}>
                            {emailVerified ? "Verified Account" : "Verification Pending"}
                        </h4>
                    </div>
                </Card>
            </div>


          
            {role !== "admin" && warnings.length > 0 && (
                <div className="w-full border-t border-[#1e293b]/30 pt-4 space-y-3 relative z-10">
                    <h3 className="text-xs sm:text-sm font-bold tracking-wider text-rose-500 uppercase flex items-center gap-2">
                        <ShieldAlert className="size-4 animate-pulse" />
                        Account Compliance Notices ({warnings.length})
                    </h3>
                    <div className="space-y-2.5">
                        {warnings.map((warn) => {
                            const formattedDate = new Date(warn.date || new Date()).toLocaleDateString('en-US', {
                                month: 'short', day: 'numeric', year: 'numeric'
                            });
                            return (
                                <div key={warn._id} className="bg-rose-500/5 border border-rose-500/10 rounded-2xl p-4 transition-all hover:border-rose-500/20">
                                    <div className="flex items-start gap-3">
                                        <div className="p-1.5 bg-rose-500/10 rounded-lg text-rose-400 mt-0.5">
                                            <ShieldAlert className="size-3.5" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{warn.message}</p>
                                            <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-medium mt-2">
                                                <Calendar className="size-3" />
                                                Issued on {formattedDate}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* ─── LAST SECTION: PLAN UPGRADE OR PREMIUM SUCCESS CARD ─── */}
            <div className="relative z-10 w-full">
                {isPremium ? (
                    /* Premium Active Layout */
                    <div className="w-full bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
                        <div className="bg-emerald-500/10 p-3 rounded-xl text-emerald-400 shrink-0">
                            <CheckCircle2 className="size-6" />
                        </div>
                        <div>
                            <h4 className="text-base font-bold text-emerald-400 flex items-center gap-1.5">
                                Lifetime Premium Active
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                                Full access unlocked. Enjoy elite AI creation assets without limitations.
                            </p>
                        </div>
                    </div>
                ) : (
                    /* Free Tier Upgrade Layout (Fully Responsive Full Width Card) */
                    <Card className="w-full bg-gradient-to-br from-[#1e1b4b]/30 to-[#030712]/50 border border-purple-500/30 rounded-2xl relative overflow-hidden group shadow-none">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-500/20 transition-all duration-500" />

                        <div className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5">
                            <Card.Header className="p-0 flex flex-col items-start gap-1 bg-transparent">
                                <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-purple-400 mb-0.5">
                                    <Zap className="size-3 fill-purple-400" /> Unlock Pro
                                </span>
                                <Card.Title className="text-base sm:text-lg font-bold text-white tracking-tight">Upgrade to Premium</Card.Title>
                                <Card.Description className="text-xs sm:text-sm text-gray-400 mt-1 leading-relaxed max-w-xl">
                                    Get instant access to hidden premium prompt layers and advanced engineering variables.
                                </Card.Description>
                            </Card.Header>

                            <Card.Footer className="p-0 bg-transparent shrink-0 w-full md:w-auto">
                                <form action="/api/checkout_sessions" method="POST">
                                    <section>
                                        <input
                                            type="hidden"
                                            name="currentPage"
                                            value={typeof window !== "undefined" ? window.location.pathname : ""}
                                        />
                                        <button
                                            type="submit" role="link"
                                            className="group relative w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-semibold text-sm py-3 px-6 rounded-xl transition-all duration-300 hover:from-amber-400 hover:to-amber-500 active:scale-[0.98] shadow-[0_4px_20px_rgba(245,158,11,0.2)]"
                                        >
                                            <CreditCard size={16} className="transition-transform group-hover:scale-110" />
                                            <span>Unlock Lifetime Access — $10</span>
                                            <span className="absolute -top-2 -right-2 bg-slate-900 text-amber-400 text-[9px] font-bold px-2 py-0.5 rounded-md border border-amber-500/30 tracking-wider uppercase shadow-md">
                                                One-Time
                                            </span>
                                        </button>

                                    </section>
                                </form>

                            </Card.Footer>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
} 