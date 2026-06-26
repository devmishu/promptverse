"use client";
import { Eye, ShoppingBag, Wallet, ArrowLeft, BarChart3 } from "lucide-react";
import { Button } from "@heroui/react";
import { AnalyticsCard } from "../_components/AnalyticsCard";

export default function AnalyticsPage() {
    const statsData = [
        {
            title: "Total Views",
            value: "1,245",
            icon: Eye,
            trend: { value: 12.5, isPositive: true }
        },
        {
            title: "Total Copies",
            value: "348",
            icon: ShoppingBag,
            trend: { value: 8.2, isPositive: true }
        },
        {
            title: "Total Earnings",
            value: "$1,840",
            icon: Wallet,
            trend: { value: 4.1, isPositive: true }
        }
    ];

    return (
        <main className="min-h-screen w-full bg-[#030712] text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1280px] mx-auto flex flex-col gap-8">

                {/* Dashboard Top Header Navigation */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1e293b]/40 pb-6">
                    <div className="flex items-center gap-3">
                        <Button
                            isIconOnly
                            variant="light"
                            className="text-gray-400 hover:text-white hover:bg-[#111827] rounded-xl border border-[#1e293b]/40"
                            aria-label="Go Back"
                        >
                            <ArrowLeft className="size-4" />
                        </Button>
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                                Performance Analytics
                            </h1>
                            <p className="text-xs text-gray-400 mt-0.5">
                                Real-time monitoring of your prompt exposure and creator revenue.
                            </p>
                        </div>
                    </div>

                    <div className="text-xs text-gray-400 bg-[#111827]/60 border border-[#1e293b]/60 px-3 py-1.5 rounded-xl font-medium self-start sm:self-center">
                        Live Metrics Updated
                    </div>
                </div>

                {/* 3-Column Reusable Analytics Cards Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {statsData.map((stat, index) => (
                        <AnalyticsCard
                            key={index}
                            title={stat.title}
                            value={stat.value}
                            icon={stat.icon}
                            trend={stat.trend}
                        />
                    ))}
                </div>

                {/* Main Detailed Chart Layout Section */}
                <div className="w-full bg-[#111827]/20 border border-[#1e293b]/50 rounded-2xl p-6 backdrop-blur-md shadow-2xl flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2">
                            <BarChart3 className="size-4 text-cyan-400" />
                            Traffic Overview
                        </h2>
                        <span className="text-xs text-cyan-400 font-medium">Last 30 Days</span>
                    </div>

                    {/* Chart Visualizer Canvas Container */}
                    <div className="w-full h-[300px] bg-[#030712]/50 border border-[#1e293b]/30 rounded-xl flex flex-col items-center justify-center text-center p-6 relative group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/[0.02] to-transparent pointer-events-none" />

                        <div className="p-3 bg-cyan-500/5 border border-cyan-500/10 text-cyan-500/60 rounded-full mb-3 group-hover:scale-105 transition-transform duration-300">
                            <BarChart3 className="size-6" />
                        </div>
                        <p className="text-sm font-medium text-gray-400">Audience Flow Data Map</p>
                        <p className="text-xs text-gray-500 max-w-xs mt-1">
                            Your dashboard graph visualization is ready to connect with dynamic backend time-series datasets.
                        </p>
                    </div>
                </div>

            </div>
        </main>
    );
}