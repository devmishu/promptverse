"use client";

import { useEffect, useState } from "react";
import { CreditCard, Sparkles, Infinity, ShieldAlert, Loader2 } from "lucide-react";
import AddPrompt from '../../_components/AddPrompt';
import { getPromptsByUser } from "@/lib/api/prompt";
import { useSession } from "@/lib/auth-client";

const AddPromptPage = () => {
    const session = useSession();
    const user = session?.data?.user;

   
    const isAuthLoading = session?.isPending;

    const [myPromptsCount, setMyPromptsCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const maxFreeLimit = 3;

    useEffect(() => {
        async function fetchUserPrompts() {
           
            if (isAuthLoading) return;

           
            if (!user?.id) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const userPrompts = await getPromptsByUser(user?.id);

                if (Array.isArray(userPrompts)) {
                    setMyPromptsCount(userPrompts.length);
                } else if (userPrompts && typeof userPrompts === "object") {
                    setMyPromptsCount(userPrompts.count || 0);
                }
            } catch (error) {
                console.error("Error fetching user prompts:", error);
            } finally {
               
                setLoading(false);
            }
        }

        fetchUserPrompts();
    }, [user?.id, isAuthLoading]); 

 
    if (isAuthLoading || loading) {
        return (
            <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-2 text-gray-400">
                <Loader2 className="animate-spin size-8 text-cyan-400" />
                <p className="text-xs font-mono">Verifying prompt allowance...</p>
            </div>
        );
    }


    if (!user) {
        return (
            <div className="w-full h-[50vh] flex flex-col items-center justify-center gap-2 text-gray-400">
                <p className="text-sm font-semibold text-rose-400">Please log in to add prompts.</p>
            </div>
        );
    }

    const progressPercentage = Math.min((myPromptsCount / maxFreeLimit) * 100, 100);
    const isLimitReached = user?.plan === "free" && myPromptsCount >= maxFreeLimit;

    return (
        <div className="w-full max-w-3xl mx-auto py-12 px-4">

      
            {user?.plan === "free" && !isLimitReached && (
                <div className="mb-8 p-5 bg-[#111827]/40 border border-[#1e293b]/60 rounded-2xl backdrop-blur-md">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Sparkles className="size-3.5 text-cyan-400" /> Free Plan Usage
                        </span>
                        <span className="text-xs font-mono font-bold text-cyan-400">
                            {myPromptsCount} / {maxFreeLimit} Prompts Used
                        </span>
                    </div>
                    <div className="w-full bg-[#030712] h-2.5 rounded-full overflow-hidden p-0.5 border border-[#1e293b]/40">
                        <div
                            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500"
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>
                </div>
            )}

         
            {isLimitReached ? (
                <div className="w-full bg-[#111827]/30 border-2 border-amber-500/20 rounded-3xl p-8 backdrop-blur-md shadow-2xl text-center flex flex-col items-center gap-6 relative overflow-hidden">
                    <div className="absolute -top-24 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

                    <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-2xl">
                        <ShieldAlert className="size-8" />
                    </div>

                    <div className="flex flex-col gap-1.5 max-w-md">
                        <h2 className="text-xl font-extrabold tracking-tight text-white">
                            Prompt Limit Reached
                        </h2>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            You have utilized all {maxFreeLimit} complimentary starter slots. Upgrade once to secure unrestricted access permanently.
                        </p>
                    </div>

                    <form action="/api/checkout_sessions" method="POST" className="w-full max-w-sm mt-2">
                        <section>
                            <input
                                type="hidden"
                                name="currentPage"
                                value={typeof window !== "undefined" ? window.location.pathname : ""}
                            />
                            <button
                                type="submit"
                                role="link"
                                className="cursor-pointer group relative w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm py-3.5 px-6 rounded-xl transition-all duration-300 hover:from-amber-400 hover:to-amber-500 active:scale-[0.98] shadow-[0_4px_20px_rgba(245,158,11,0.2)]"
                            >
                                <CreditCard size={16} className="transition-transform group-hover:scale-110" />
                                <span>Unlock Lifetime Access — $10</span>
                                <span className="absolute -top-2 -right-2 bg-slate-900 text-amber-400 text-[9px] font-bold px-2 py-0.5 rounded-md border border-amber-500/30 tracking-wider uppercase shadow-md">
                                    One-Time
                                </span>
                            </button>
                        </section>
                    </form>
                </div>
            ) : (
                
                <div className="relative">
                    {user?.plan === "premium" && (
                        <div className="mb-4 inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold">
                            <Infinity className="size-3.5" /> Premium Unlimited Access
                        </div>
                    )}
                    <AddPrompt submitBtn={"Post Prompt"} />
                </div>
            )}

        </div>
    );
};

export default AddPromptPage;