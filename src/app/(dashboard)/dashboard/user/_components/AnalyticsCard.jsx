"use client";

import { Card } from "@heroui/react";

export function AnalyticsCard({ title, value, icon: Icon, trend }) {
    return (
        <Card className="relative overflow-hidden bg-[#111827]/40 border border-[#1e293b]/60 p-6 rounded-2xl flex flex-col gap-4 backdrop-blur-md group hover:border-cyan-500/30 transition-all duration-300 shadow-xl text-white">

            {/* Top Row: Icon & Trend */}
            <Card.Header className="p-0 flex items-center justify-between w-full bg-transparent flex-row">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-cyan-500/5 border border-cyan-500/20 text-cyan-400 shadow-inner group-hover:bg-cyan-500/10 group-hover:text-cyan-300 transition-colors">
                    {Icon && <Icon className="w-5 h-5" />}
                </div>

                {trend && (
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${trend.isPositive
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                        }`}>
                        {trend.isPositive ? "+" : ""}{trend.value}%
                    </span>
                )}
            </Card.Header>

            {/* Bottom Row: Data Labels (Using official layout patterns) */}
            <div className="p-0 flex flex-col gap-0.5 mt-2 bg-transparent">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {title}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-sans">
                    {value}
                </h3>
            </div>

            {/* Soft decorative glow on hover */}
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl group-hover:bg-cyan-500/10 transition-all duration-300 pointer-events-none" />
        </Card>
    );
}