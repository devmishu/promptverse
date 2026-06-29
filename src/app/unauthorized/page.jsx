"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert, Lock, ArrowLeft } from "lucide-react";
import { Button } from "@heroui/react";

export default function UnauthorizedPage() {
    const router = useRouter();

    return (
        <main className="min-h-screen w-full bg-[#030712] text-white flex flex-col items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8">

         
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-amber-500/[0.02] rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-rose-500/[0.01] rounded-full blur-[100px] pointer-events-none" />

            
            <div className="max-w-md w-full text-center flex flex-col items-center gap-6 relative z-10">

               
                <div className="relative p-4 bg-[#111827]/30 border border-amber-500/10 backdrop-blur-md rounded-2xl shadow-2xl mb-2 group">
                    <Lock className="size-8 text-amber-500/80 group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute -inset-0.5 bg-amber-500/10 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300 pointer-events-none" />
                </div>

             
                <div className="flex flex-col gap-1">
                    <h1 className="text-6xl sm:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/20 select-none">
                        401
                    </h1>
                    <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-gray-200 flex items-center justify-center gap-2">
                        <ShieldAlert className="size-5 text-amber-500/80" />
                        Access Denied
                    </h2>
                </div>

              
                <p className="text-xs sm:text-sm text-gray-400 max-w-xs leading-relaxed">
                    You do not have the necessary permissions to view this dashboard. Please log in with an authorized admin account.
                </p>

             
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full mt-4">
                    <Button
                        onClick={() => router.back()}
                        variant="bordered"
                        className="w-full sm:w-1/2 border-[#1e293b] hover:border-gray-500 text-gray-300 hover:text-white bg-[#111827]/20 hover:bg-[#111827]/50 transition-all duration-300 font-medium text-xs sm:text-sm h-11 rounded-xl flex items-center justify-center gap-2"
                    >
                        <ArrowLeft className="size-4" />
                        Go Back
                    </Button>

                    <Button
                        onClick={() => router.push("/login")}
                        className="w-full sm:w-1/2 bg-white hover:bg-gray-200 text-black font-semibold text-xs sm:text-sm h-11 rounded-xl shadow-lg shadow-white/[0.02] transition-all duration-300"
                    >
                        Login as Admin
                    </Button>
                </div>

            </div>

      
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-widest uppercase text-gray-600 select-none font-medium">
                Security Shield // Auth Refused
            </div>
        </main>
    );
}