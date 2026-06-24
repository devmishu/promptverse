import { CreatorCard } from "@/components/cards/CreatorCard";


export function TopCreatorsGrid() {
    // 🌟 ফ্রন্টএন্ড লেআউট ও ইউআই টেস্ট করার জন্য ফেক ডাটা অ্যারে
    const fakeCreatorsData = [
        {
            userId: "6a34c7584837dc28065cd495",
            name: "Sarah Jenkins",
            avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
            totalPromptsCreated: 142,
            totalCopies: 183000,
            topAiTool: "ChatGPT",
            mainCategory: "development"
        },
        {
            userId: "6a34c7584837dc28065cd496",
            name: "Alex Rivera",
            avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
            totalPromptsCreated: 98,
            totalCopies: 153000,
            topAiTool: "Midjourney",
            mainCategory: "design"
        },
        {
            userId: "6a34c7584837dc28065cd497",
            name: "Michael Chen",
            avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
            totalPromptsCreated: 87,
            totalCopies: 238000,
            topAiTool: "Claude",
            mainCategory: "writing"
        },
        {
            userId: "6a34c7584837dc28065cd498",
            name: "Emma Watson",
            avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
            totalPromptsCreated: 74,
            totalCopies: 192000,
            topAiTool: "Gemini",
            mainCategory: "marketing"
        },
        {
            userId: "6a34c7584837dc28065cd499",
            name: "David Miller",
            avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
            totalPromptsCreated: 65,
            totalCopies: 193000,
            topAiTool: "ChatGPT",
            mainCategory: "development"
        },
        {
            userId: "6a34c7584837dc28065cd500",
            name: "Jessica Taylor",
            avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
            totalPromptsCreated: 52,
            totalCopies: 131000,
            topAiTool: "Midjourney",
            mainCategory: "design"
        }
    ];



    return (
        <section className="w-full bg-[#030712] text-white py-12 px-6">
            <div className="max-w-[1440px] mx-auto flex flex-col gap-6">

                {/* Section Heading */}
                <h2 className="text-xs font-bold text-gray-400 tracking-widest uppercase">
                    Top Prompts Creators
                </h2>

                {/* 3-Column Layout Dashboard Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {fakeCreatorsData.map((creator, index) => (
                        <CreatorCard
                            key={creator.userId}
                            creator={creator}
                            rank={index + 1}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}