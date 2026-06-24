"use client";

import { usePathname } from "next/navigation";
import { Bell, Gear, House, Person } from "@gravity-ui/icons";
import { LayoutDashboard, Bookmark, Users, Building2, Banknote, Settings, PanelLeft } from "lucide-react";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import {
    PlusCircle,
    Terminal,
    User,
    MessageSquareQuote,
    Sparkles,
    CreditCard,
    AlertTriangle,
    BarChart3
} from "lucide-react";

export function DashboardSideBar() {
    const pathname = usePathname();
    const session = useSession();
    const user = session?.data?.user;

    console.log("dashboard user=+++++++++", user);



    const userNavLinks = [
        { icon: LayoutDashboard, label: "Dashboard", link: "/dashboard/user" },
        { icon: PlusCircle, label: "Add Prompt", link: "/dashboard/prompt/new" }, // যোগ করার জন্য PlusCircle
        { icon: Terminal, label: "My Prompts", link: "/dashboard/user/myprompt" }, // প্রম্পট টেমপ্লেটের জন্য Terminal
        { icon: Bookmark, label: "Saved Prompts", link: "/dashboard/user/savedprompt" },
        { icon: User, label: "Profile ", link: "/dashboard/user/profile" }, // প্রোফাইলের জন্য স্ট্যান্ডার্ড User
        { icon: MessageSquareQuote, label: "My Reviews", link: "/dashboard/user/reviews" }, // রিভিউ/কমেন্টের জন্য MessageSquareQuote
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
        { icon: Sparkles, label: "All Prompts", link: "/dashboard/admin/allprompts" }, // প্রম্পট ম্যানেজমেন্টের জন্য AI ভাইব দিতে Sparkles
        { icon: CreditCard, label: "All Payments", link: "/dashboard/admin/all_payments" }, // পেমেন্টের জন্য CreditCard
        { icon: AlertTriangle, label: "Reported Prompts", link: "/dashboard/admin/reported-prompts" }, // রিপোর্টের জন্য AlertTriangle
        { icon: BarChart3, label: "Analytics ", link: "/dashboard/admin/payments" }, // অ্যানালিটিক্স বা ট্র্যাকিংয়ের জন্য BarChart3
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
                // কারেন্ট ইউআরএল পাথের সাথে লিঙ্ক মিলছে কিনা চেক করা হচ্ছে
                const isActive = pathname === item.link;

                return (
                    <Link
                        href={item.link}
                        key={item.label}
                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 border border-transparent
                            ${isActive
                                ? "bg-[#111827] text-white border-[#1e293b]/40 font-medium"
                                : "text-gray-300 hover:bg-[#111827] hover:text-white"
                            }`}
                    >
                        <item.icon className={`size-5 transition-colors ${isActive ? "text-cyan-400" : "text-gray-500"}`} />
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

                {/* Mobile Menu Trigger */}
                <div className="sm:hidden mb-4">
                    <Drawer>
                        <Button className="sm:hidden bg-none text-gray-200" variant="secondary">
                            <PanelLeft size={18} />
                        </Button>
                        <Drawer.Backdrop>
                            <Drawer.Content placement="left" className="bg-[#030712] text-white border-r border-[#1e293b]/40">
                                <Drawer.Dialog>
                                    <Drawer.CloseTrigger />
                                    <Drawer.Header>
                                        <Drawer.Heading className="text-white">Navigation</Drawer.Heading>
                                    </Drawer.Header>
                                    <Drawer.Body>
                                        {navContent}
                                    </Drawer.Body>
                                </Drawer.Dialog>
                            </Drawer.Content>
                        </Drawer.Backdrop>
                    </Drawer>
                </div>

                {/* Dashboard Content goes here */}
            </div>
        </div>
    );
}