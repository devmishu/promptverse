"use client";

import React, { useState } from "react"; // 🚀 State ম্যানেজমেন্টের জন্য যোগ করা হয়েছে
import { usePathname } from "next/navigation";
import { LayoutDashboard, Bookmark, Users, Sparkles, CreditCard, AlertTriangle, BarChart3, PanelLeft, PlusCircle, Terminal, User, MessageSquareQuote } from "lucide-react";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

export function DashboardSideBar() {
    const pathname = usePathname();
    const session = useSession();
    const user = session?.data?.user;

    // 📱 মোবাইল ড্রয়ার ওপেন/ক্লোজ স্টেট কন্ট্রোল
    const [isOpen, setIsOpen] = useState(false);

    console.log("dashboard user=+++++++++", user);

    const userNavLinks = [
        { icon: User, label: "My Profile ", link: "/dashboard/user/profile" },
        { icon: PlusCircle, label: "Add Prompt", link: "/dashboard/prompt/new" },
        { icon: Terminal, label: "My Prompts", link: "/dashboard/user/myprompt" },
        { icon: Bookmark, label: "Saved Prompts", link: "/dashboard/user/savedprompt" },
        { icon: MessageSquareQuote, label: "My Reviews", link: "/dashboard/user/reviews" },

    ];

    const creatorNavLinks = [
        { icon: LayoutDashboard, label: "Dashboard", link: "/dashboard/creator" },
        { icon: PlusCircle, label: "Add Prompt", link: "/dashboard/prompt/new" },
        { icon: Terminal, label: "My Prompts", link: "/dashboard/creator/myprompt" },
        { icon: User, label: "Profile ", link: "/dashboard/creator/profile" },
    ];

    const adminNavLinks = [
        { icon: LayoutDashboard, label: "Dashboard", link: "/dashboard/admin" },
        { icon: Users, label: "All Users", link: "/dashboard/admin/allusers" },
        { icon: Sparkles, label: "All Prompts", link: "/dashboard/admin/allprompts" },
        { icon: CreditCard, label: "All Payments", link: "/dashboard/admin/all_payments" },
        { icon: AlertTriangle, label: "Reported Prompts", link: "/dashboard/admin/reported-prompts" },
        { icon: BarChart3, label: "Analytics ", link: "/dashboard/admin/payments" },
        { icon: User, label: "Profile ", link: "/dashboard/admin/profile" },
    ];

    const navLinksMaping = {
        user: userNavLinks,
        creator: creatorNavLinks,
        admin: adminNavLinks,
    };

    const navItems = navLinksMaping[user?.role || "user"] || [];

    const navContent = (
        <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
                const isActive = pathname === item.link;

                return (
                    <Link
                        href={item.link}
                        key={item.label}
                        onClick={() => setIsOpen(false)} // 💡 লিংকে ক্লিক করলে মোবাইল মেনু অটোমেটিক ক্লোজ হবে
                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 border
                            ${isActive
                                ? "bg-[#1e293b]/70 text-white border-[#334155]/60 font-semibold shadow-inner shadow-cyan-500/5" // 🎨 অ্যাক্টিভ কালারটি আরও রিচ ও ডার্ক করা হয়েছে
                                : "text-gray-400 border-transparent hover:bg-[#111827] hover:text-white"
                            }`}
                    >
                        <item.icon className={`size-5 transition-colors ${isActive ? "text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.4)]" : "text-gray-500"}`} />
                        {item.label}
                    </Link>
                );
            })}
        </nav>
    );

    return (
        <div className="flex flex-col bg-[#030712] text-white">
            {/* Main Content Area */}
            <div className="flex flex-1 max-w-360 w-full mx-auto px-6 py-6 gap-6">

                {/* Desktop Sidebar */}
                <aside className="hidden sm:block border-r border-[#1e293b]/40 pr-6 w-64 shrink-0">
                    {navContent}
                </aside>

                {/* Mobile Menu Trigger & Controlled Drawer */}
                <div className="sm:hidden mb-4">
                    {/* 💡 ১. বাটনটিকে ড্রয়ারের বাইরে রাখা হলো, এতে ক্লিক কনফ্লিক্ট পুরোপুরি দূর হবে */}
                    <Button
                        onClick={() => setIsOpen(!isOpen)}
                        className="cursor-pointer bg-transparent hover:bg-[#111827] border border-gray-800 text-gray-200 min-w-0 p-2 h-9 rounded-lg"
                    >
                        <PanelLeft size={18} />
                    </Button>

                    {/* 💡 ২. ড্রয়ার এখন ইন্ডিপেন্ডেন্টলি স্টেট দিয়ে ওপেন/ক্লোজ হ্যান্ডেল করবে */}
                    <Drawer isOpen={isOpen} onOpenChange={setIsOpen}>
                        <Drawer.Backdrop />
                        <Drawer.Content placement="left" className="bg-[#030712] text-white border-r border-[#1e293b]/40">
                            <Drawer.Dialog>
                                <Drawer.CloseTrigger onClick={() => setIsOpen(false)} />
                                <Drawer.Header>
                                    <Drawer.Heading className="text-white text-lg font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                        Navigation
                                    </Drawer.Heading>
                                </Drawer.Header>
                                <Drawer.Body className="pt-2">
                                    {navContent}
                                </Drawer.Body>
                            </Drawer.Dialog>
                        </Drawer.Content>
                    </Drawer>
                </div>

                {/* Dashboard Content goes here */}
            </div>
        </div>
    );
}