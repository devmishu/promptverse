"use client";
import { Users, Terminal, Copy, MessageSquare, ArrowLeft, BarChart3, TrendingUp } from "lucide-react";
import { Button } from "@heroui/react";
import { AnalyticsCard } from "../../_components/AnalyticsCard";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid } from "recharts";

export default function AdminAnalyticsGrid({ analyticsData }) {

    // সরাসরি রুট লেভেলের ডেটা রিড করা হচ্ছে
    const statsData = [
        {
            id: "stat-users",
            title: "Total Users",
            value: analyticsData?.totalUsers || 0,
            icon: Users,
        },
        {
            id: "stat-prompts",
            title: "Total Prompts",
            value: analyticsData?.totalPrompts || 0,
            icon: Terminal,
        },
        {
            id: "stat-copies",
            title: "Total Copies",
            value: analyticsData?.totalCopies || 0,
            icon: Copy,
        },
        {
            id: "stat-reviews",
            title: "Total Reviews",
            value: analyticsData?.totalReviews || 0,
            icon: MessageSquare,
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
                                Admin Analytics
                            </h1>
                        </div>
                    </div>
                </div>

                {/* 4-Column Analytics Cards Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statsData.map((stat, index) => (
                        <AnalyticsCard
                            key={index}
                            title={stat.title}
                            value={stat.value}
                            icon={stat.icon}
                        />
                    ))}
                </div>

                {/* 📈 Dual Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Chart 1: User Growth (Area Chart) */}
                    <div className="w-full bg-[#111827]/20 border border-[#1e293b]/50 rounded-2xl p-6 backdrop-blur-md shadow-2xl flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2">
                                <TrendingUp className="size-4 text-cyan-400" />
                                User Registration Growth
                            </h2>
                        </div>
                        <div className="w-full h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={analyticsData?.userGrowthData || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="userColor" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.1} vertical={false} />
                                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
                                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff' }} />
                                    <Area type="monotone" dataKey="users" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#userColor)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Chart 2: Top Performance Prompts (Bar Chart) */}
                    <div className="w-full bg-[#111827]/20 border border-[#1e293b]/50 rounded-2xl p-6 backdrop-blur-md shadow-2xl flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2">
                                <BarChart3 className="size-4 text-emerald-400" />
                                Top Copied Prompts
                            </h2>
                        </div>
                        <div className="w-full h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={analyticsData?.topPromptsData || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.1} vertical={false} />
                                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
                                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff' }} />
                                    <Bar dataKey="copies" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                </div>

            </div>
        </main>
    );
}