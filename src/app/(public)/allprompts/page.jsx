import { PromptCard } from "@/components/cards/PromptCard";


const AllPromptsPage = () => {
    // ২০ টি ফেইক ডাটা অবজেক্ট অ্যারে
    const allPromptsData = [
        {
            id: 1,
            title: "Ultimate Character Concept Generator",
            copies: "183K",
            rating: 4,
            iconUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo1.jpg",
            author: { name: "Sarah", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" }
        },
        {
            id: 2,
            title: "Strategic Content Calendar Planner",
            copies: "153K",
            rating: 5,
            iconUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo2.jpg",
            author: { name: "Alex", avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" }
        },
        {
            id: 3,
            title: "Simrorate AI Balaned Calendar Planner",
            copies: "238K",
            rating: 5,
            iconUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo1.jpg",
            author: { name: "Michael", avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80" }
        },
        {
            id: 4,
            title: "Midiounvo Kent Grerator",
            copies: "192K",
            rating: 4,
            iconUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo2.jpg",
            author: { name: "Emma", avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80" }
        },
        {
            id: 5,
            title: "Cooperate Prompt Planner",
            copies: "193K",
            rating: 4,
            iconUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo1.jpg",
            author: { name: "David", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" }
        },
        {
            id: 6,
            title: "Amazow Content Planner",
            copies: "131K",
            rating: 5,
            iconUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo2.jpg",
            author: { name: "Jessica", avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80" }
        },
        {
            id: 7,
            title: "Full-Stack Code Architect Pro",
            copies: "98K",
            rating: 5,
            iconUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo1.jpg",
            author: { name: "Ryan", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" }
        },
        {
            id: 8,
            title: "SaaS Cold Email Sequence Expert",
            copies: "74K",
            rating: 4,
            iconUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo2.jpg",
            author: { name: "Sophia", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" }
        },
        {
            id: 9,
            title: "Midjourney Photorealistic Portrait Master",
            copies: "312K",
            rating: 5,
            iconUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo1.jpg",
            author: { name: "Lucas", avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80" }
        },
        {
            id: 10,
            title: "SEO Article Outline Builder",
            copies: "145K",
            rating: 4,
            iconUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo2.jpg",
            author: { name: "Olivia", avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80" }
        },
        {
            id: 11,
            title: "UI/UX Micro-copy Generator",
            copies: "62K",
            rating: 4,
            iconUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo1.jpg",
            author: { name: "Ethan", avatarUrl: "https://images.unsplash.com/photo-1395603223567-f6d45e876f26?auto=format&fit=crop&w=100&q=80" }
        },
        {
            id: 12,
            title: "E-Commerce Product Description Wizard",
            copies: "119K",
            rating: 5,
            iconUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo2.jpg",
            author: { name: "Chloe", avatarUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=100&q=80" }
        },
        {
            id: 13,
            title: "Python Data Analysis Script Assistant",
            copies: "88K",
            rating: 5,
            iconUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo1.jpg",
            author: { name: "Liam", avatarUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=100&q=80" }
        },
        {
            id: 14,
            title: "YouTube Script Hook & Intro Optimizer",
            copies: "204K",
            rating: 4,
            iconUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo2.jpg",
            author: { name: "Zoe", avatarUrl: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=100&q=80" }
        },
        {
            id: 15,
            title: "Cyberpunk 3D Asset Prompt Architect",
            copies: "135K",
            rating: 5,
            iconUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo1.jpg",
            author: { name: "Marcus", avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80" }
        },
        {
            id: 16,
            title: "Financial Report Summarizer Prompt",
            copies: "41K",
            rating: 4,
            iconUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo2.jpg",
            author: { name: "Mia", avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80" }
        },
        {
            id: 17,
            title: "TypeScript Bug Finder & Refactor Engine",
            copies: "167K",
            rating: 5,
            iconUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo1.jpg",
            author: { name: "Daniel", avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" }
        },
        {
            id: 18,
            title: "Creative Storyboarding & Plot Twist Idea",
            copies: "92K",
            rating: 4,
            iconUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo2.jpg",
            author: { name: "Harper", avatarUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=100&q=80" }
        },
        {
            id: 19,
            title: "Social Media Hook Blueprint Generator",
            copies: "254K",
            rating: 5,
            iconUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo1.jpg",
            author: { name: "Owen", avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&q=80" }
        },
        {
            id: 20,
            title: "Minimalist Logo Design Prompt Engine",
            copies: "178K",
            rating: 5,
            iconUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo2.jpg",
            author: { name: "Lily", avatarUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=100&q=80" }
        }
    ];

    return (
        <div className="w-full min-h-screen bg-[#030712] text-white py-12 px-6">
            <div className="max-w-[1440px] mx-auto flex flex-col gap-8">

                {/* Header Information */}
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight uppercase">
                        All Prompts
                    </h1>
                    <p className="text-sm text-gray-500">
                        Explore our complete collection of high-quality, production-ready AI prompts.
                    </p>
                </div>

                {/* Grid Layout Layout: 
                    - Mobile / Small Devices: 1 Column
                    - Tablet Devices (sm): 2 Columns
                    - Standard Screens (md): 3 Columns
                    - Large/Desktop Screens (lg): 4 Columns 
                */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {allPromptsData.map((prompt) => (
                        <PromptCard key={prompt.id} prompt={prompt} />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default AllPromptsPage;