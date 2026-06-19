import { Bell, Envelope, Gear, House, Magnifier, Person } from "@gravity-ui/icons";
import { LayoutDashboard, Bookmark, FileText, CreditCard, Users, Building2, Briefcase, Banknote, Settings } from "lucide-react";
import { Button, Drawer } from "@heroui/react";
import { PanelLeft } from "lucide-react";
import Link from "next/link";
import { getUser } from "@/lib/core/session";

export async function DashboardSideBar() {
    const user = await getUser();
    console.log("dashboard user......", user);

    const userNavLinks = [
        { icon: LayoutDashboard, label: "Dashboard", link: "/dashboard/user" },
        { icon: House, label: "Add Prompt", link: "/dashboard/prompt/new" },
        { icon: Bell, label: "My Prompts", link: "/dashboard/user/myprompt" },
        { icon: Bookmark, label: "Saved Prompts", link: "/dashboard" },
        { icon: Person, label: "Profile ", link: "/dashboard" },
        { icon: Gear, label: "My Reviews", link: "/dashboard" },
    ];

    const creatorNavLinks = [
        { icon: LayoutDashboard, label: "Dashboard", link: "/dashboard/creator" },
        { icon: House, label: "Add Prompt", link: "/dashboard/prompt/new" },
        { icon: Bell, label: "My Prompts", link: "/dashboard/creator/myprompt" },
    ];

    const adminNavLinks = [
        { icon: LayoutDashboard, label: "Dashboard", link: "/dashboard/admin" },
        { icon: Users, label: "All Users", link: "/dashboard/admin/allusers" },
        { icon: Building2, label: "All Prompts", link: "/dashboard/admin/allprompts" },
        { icon: Banknote, label: "All Payments", link: "/dashboard/admin/jobs" },
        { icon: Banknote, label: "Reported Prompts", link: "/dashboard/admin/payments" },
        { icon: Settings, label: "Analytics ", link: "/dashboard/admin/settings" },
    ];

    const navLinksMaping = {
        user: userNavLinks,
        creator: creatorNavLinks,
        admin: adminNavLinks,

    }
    const navItems = navLinksMaping[user?.role || "user"];

    const navContent = (
        <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
                <Link href={item.link}
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-300 transition-colors hover:bg-[#111827] hover:text-white"
                >
                    <item.icon className="size-5 text-gray-500" />
                    {item.label}
                </Link>
            ))}
        </nav>
    );

    return (
        <div className="flex flex-col bg-[#030712] text-white">
            {/* Top Navbar */}


            {/* Main Content Area */}
            <div className="flex flex-1 max-w-360 w-full mx-auto px-6 py-6 gap-6">
                {/* Desktop Sidebar */}
                <aside className="hidden sm:block border-r border-[#1e293b]/40 pr-6 w-64 shrink-0">
                    {navContent}
                </aside>

                {/* Main Dashboard Panel */}

                {/* Mobile Menu Trigger */}
                <div className="sm:hidden mb-4">
                    <Drawer>
                        <Button className="sm:hidden bg-none  text-gray-200" variant="secondary">
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

