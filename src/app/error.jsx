"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { RefreshCw, Home, AlertCircle } from "lucide-react";
import { Button } from "@heroui/react";

export default function Error({ error, reset }) {
    const router = useRouter();

  
    const handleRefresh = () => {
        if (typeof window !== "undefined") {
            window.location.reload();
        }
    };

    return (
        <main className="min-h-screen w-full bg-[#030712] text-white flex flex-col items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8">

           
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-rose-500/[0.02] rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-amber-500/[0.01] rounded-full blur-[100px] pointer-events-none" />

           
            <div className="max-w-md w-full text-center flex flex-col items-center gap-6 relative z-10">

                
                <div className="p-4 bg-[#111827]/30 border border-rose-500/20 backdrop-blur-md rounded-2xl shadow-xl mb-2">
                    <AlertCircle className="size-8 text-rose-500" />
                </div>

                
                <div className="flex flex-col gap-1">
                    <h1 className="text-5xl sm:text-6xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/20 select-none">
                        Oops!
                    </h1>
                    <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-gray-200">
                        Something went wrong
                    </h2>
                </div>

               
                <p className="text-xs sm:text-sm text-gray-400 max-w-xs leading-relaxed">
                    An unexpected error occurred. Please try refreshing the page or contact support if the issue persists.
                </p>

              
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full mt-4">
                    <Button
                        onClick={handleRefresh}
                        variant="bordered"
                        className="w-full sm:w-1/2 border-[#1e293b] hover:border-gray-500 text-gray-300 hover:text-white bg-[#111827]/20 hover:bg-[#111827]/50 transition-all duration-300 font-medium text-xs sm:text-sm h-11 rounded-xl flex items-center justify-center gap-2"
                    >
                        <RefreshCw className="size-4" />
                        Refresh Page
                    </Button>

                    <Button
                        onClick={() => router.push("/")}
                        className="w-full sm:w-1/2 bg-white hover:bg-gray-200 text-black font-semibold text-xs sm:text-sm h-11 rounded-xl shadow-lg shadow-white/[0.02] transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <Home className="size-4" />
                        Back to Home
                    </Button>
                </div>

            </div>

           
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-widest uppercase text-gray-600 select-none font-medium">
                Runtime Error // Code 0x500
            </div>
        </main>
    );
}