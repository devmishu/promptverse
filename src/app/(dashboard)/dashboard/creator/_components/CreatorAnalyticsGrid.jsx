"use client";
import { Terminal, Copy, Bookmark, ArrowLeft, BarChart3, TrendingUp } from "lucide-react";
import { Button } from "@heroui/react";
import { AnalyticsCard } from "../../_components/AnalyticsCard";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    AreaChart, Area
} from 'recharts';

export default function CreatorAnalyticsGrid({ analyticsData }) {

    // ইউনিক ID ও পারফেক্ট আইকনসহ স্ট্যাটাস ডাটা 
    const statsData = [
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
            id: "stat-bookmarks",
            title: "Total Bookmarks",
            value: analyticsData?.totalBookmarks || 0,
            icon: Bookmark,
        }
    ];

    // ব্যাকএন্ড থেকে চার্টের ডাটা না আসলে দেখানোর জন্য ডামি ডাটা (সেফটি ফলব্যাক)
    const fallbackCopiesData = [
        { name: 'Dolore error nisi at', copies: 421 },
        { name: 'Eiusmod tempor', copies: 385 },
        { name: 'Labore et dolore', copies: 310 },
        { name: 'Ut enim ad minim', copies: 291 },
    ];

    const fallbackGrowthData = [
        { month: 'Jan', prompts: 10 },
        { month: 'Feb', prompts: 18 },
        { month: 'Mar', prompts: 25 },
        { month: 'Apr', prompts: 42 },
        { month: 'May', prompts: 55 },
        { month: 'Jun', prompts: 70 },
    ];

    const finalCopiesData = analyticsData?.copiesChartData ;
    const finalGrowthData = analyticsData?.growthChartData ;

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
                    {statsData.map((stat) => (
                        <AnalyticsCard
                            key={stat.id}
                            title={stat.title}
                            value={stat.value}
                            icon={stat.icon}
                            trend={stat.trend}
                        />
                    ))}
                </div>

                {/* Main Detailed Charts Layout Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* ১. Total Copies Chart (Horizontal Bar Chart) */}
                    <div className="w-full bg-[#111827]/20 border border-[#1e293b]/50 rounded-2xl p-6 backdrop-blur-md shadow-2xl flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2">
                                <BarChart3 className="size-4 text-cyan-400" />
                                Total Copies Per Prompt
                            </h2>
                            <span className="text-xs text-cyan-400 font-medium">All Time</span>
                        </div>

                        <div className="w-full h-[320px] bg-[#030712]/30 border border-[#1e293b]/20 rounded-xl p-4 relative overflow-hidden">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={finalCopiesData} layout="vertical" margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#161b26" horizontal={true} vertical={false} />
                                    <XAxis type="number" stroke="#4b5563" fontSize={11} tickLine={false} axisLine={false} />
                                    <YAxis dataKey="name" type="category" stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} width={100} />
                                    <Tooltip
                                        cursor={{ fill: '#111827', opacity: 0.4 }}
                                        contentStyle={{ backgroundColor: '#030712', borderColor: '#1e293b', borderRadius: '12px' }}
                                        itemStyle={{ color: '#2dd4bf', fontSize: '13px' }}
                                        labelStyle={{ color: '#9ca3af', fontSize: '12px' }}
                                    />
                                    <Bar dataKey="copies" fill="#2dd4bf" radius={[0, 4, 4, 0]} maxBarSize={16} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* ২. Prompt Growth Chart (Smooth Area Chart) */}
                    <div className="w-full bg-[#111827]/20 border border-[#1e293b]/50 rounded-2xl p-6 backdrop-blur-md shadow-2xl flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2">
                                <TrendingUp className="size-4 text-purple-400" />
                                Prompt Growth Trends
                            </h2>
                            <span className="text-xs text-purple-400 font-medium">Monthly Updates</span>
                        </div>

                        <div className="w-full h-[320px] bg-[#030712]/30 border border-[#1e293b]/20 rounded-xl p-4 relative overflow-hidden">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={finalGrowthData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="creatorGlow" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#a855f7" stopOpacity={0.25} />
                                            <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#161b26" horizontal={true} vertical={false} />
                                    <XAxis dataKey="month" stroke="#4b5563" fontSize={11} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#4b5563" fontSize={11} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#030712', borderColor: '#1e293b', borderRadius: '12px' }}
                                        itemStyle={{ color: '#c084fc', fontSize: '13px' }}
                                        labelStyle={{ color: '#9ca3af', fontSize: '12px' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="prompts"
                                        stroke="#a855f7"
                                        strokeWidth={2.5}
                                        fillOpacity={1}
                                        fill="url(#creatorGlow)"
                                        dot={{ r: 3, strokeWidth: 1, stroke: '#030712', fill: '#a855f7' }}
                                        activeDot={{ r: 5, strokeWidth: 0 }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                </div>

            </div>
        </main>
    );
}