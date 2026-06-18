import { Bell, Envelope, Gear, House, Magnifier, Person } from "@gravity-ui/icons";
import { Button, Drawer, Avatar } from "@heroui/react";
import { PanelLeft } from "lucide-react";
import Link from "next/link";

export async function DashboardSideBar() {

    const navItems = [
        { icon: House, label: "Add Prompt", link: "/dashboard" },
        { icon: Bell, label: "My Prompts", link: "/dashboard" },
        { icon: Envelope, label: "Saved Prompts", link: "/dashboard" },
        { icon: Person, label: "Profile ", link: "/dashboard" },
        { icon: Gear, label: "My Reviews", link: "/dashboard" },
        { icon: Magnifier, label: "....", link: "/dashboard" },
    ];


    const navContent = (
        <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
                <Link href={item.link}
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                </Link>
            ))}
        </nav>
    );

    return (
        <div className="flex flex-col min-h-screen">
            {/* Top Navbar */}


            {/* Main Content Area */}
            <div className="flex flex-1 max-w-[1440px] w-full mx-auto px-6 py-6 gap-6">
                {/* Desktop Sidebar */}
                <aside className="hidden sm:block border-r border-divider pr-6 w-64 shrink-0">
                    {navContent}
                </aside>

                {/* Main Dashboard Panel */}
                <main className="flex-1">
                    {/* Mobile Menu Trigger */}
                    <div className="sm:hidden mb-4">
                        <Drawer>
                            <Button className="sm:hidden" variant="secondary">
                                <PanelLeft size={18} />
                                Menu
                            </Button>
                            <Drawer.Backdrop>
                                <Drawer.Content placement="left">
                                    <Drawer.Dialog>
                                        <Drawer.CloseTrigger />
                                        <Drawer.Header>
                                            <Drawer.Heading>Navigation</Drawer.Heading>
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
                </main>
            </div>
        </div>
    );
}