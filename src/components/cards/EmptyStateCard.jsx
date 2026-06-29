"use client";
import React from "react";

export default function EmptyStateCard({
    title = "No data found",
    description = "Items you add will appear here.",
    icon: Icon,
    className,
}) {
    return (
        <div className={`${className} w-full min-h-[180px] sm:min-h-[200px] bg-[#111827]/10 border border-dashed border-[#1e293b] rounded-2xl p-6 backdrop-blur-sm flex flex-col items-center justify-center text-center relative group overflow-hidden`}>

            
            <div className="absolute inset-0 bg-gradient-to-t from-[#06b6d4]/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="flex flex-col items-center gap-2 max-w-xs relative z-10">

               
                {Icon && (
                    <div className="p-2.5 bg-[#111827]/40 border border-[#1e293b]/60 text-gray-500 group-hover:text-cyan-400 group-hover:border-cyan-500/30 rounded-xl mb-1 transition-all duration-300">
                        <Icon className="size-5" />
                    </div>
                )}

               
                <h3 className="text-sm font-semibold tracking-tight text-gray-200 group-hover:text-white transition-colors duration-300">
                    {title}
                </h3>

                
                <p className="text-xs text-gray-500 leading-relaxed">
                    {description}
                </p>

            </div>
        </div>
    );
}