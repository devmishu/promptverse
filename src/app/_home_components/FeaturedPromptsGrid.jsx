import { PromptCard } from "@/components/cards/PromptCard";

// 2. Grid Component rendering the list of static fake objects matching image_fc30cb.png
export function FeaturedPromptsGrid() {
    const fakePromptsData = [
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
        }
    ];

    return (
        <section className="w-full bg-[#030712] text-white py-12 px-6">
            <div className="max-w-[1440px] mx-auto flex flex-col gap-6">
                {/* Section Heading matching image text */}
                <h2 className="text-xs font-bold text-gray-400 tracking-widest uppercase">
                    Featured Prompts
                </h2>

                {/* 3-Column Layout Dashboard Grid matching image layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {fakePromptsData.map((prompt) => (
                        <PromptCard key={prompt.id} prompt={prompt} />
                    ))}
                </div>
            </div>
        </section>
    );
}