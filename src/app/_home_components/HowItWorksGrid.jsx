import { Card } from "@heroui/react";
import { UserPlus, Copy, Rocket } from "lucide-react";

export function HowItWorksGrid() {
    const steps = [
        {
            id: "01",
            title: "Create Account",
            description: "Sign up securely using JWT or Google authentication and set up your dynamic profile as a prompt user or professional creator.",
            icon: UserPlus,
            color: "from-cyan-500 to-blue-500"
        },
        {
            id: "02",
            title: "Discover & Test",
            description: "Search or filter by category, AI tools (ChatGPT, Midjourney), or difficulty. Bookmark favorites or copy optimized prompts with a single click.",
            icon: Copy,
            color: "from-purple-500 to-pink-500"
        },
        {
            id: "03",
            title: "Monetize & Share",
            description: "Submit your engineering prompts. Once approved by our moderation team, push them live as premium assets to earn recurring value.",
            icon: Rocket,
            color: "from-amber-500 to-orange-500"
        }
    ];

    return (
        <section className="w-full bg-[#030712] text-white py-20 px-6 border-t border-[#1e293b]/30">
            <div className="max-w-[1440px] mx-auto flex flex-col gap-12">

                {/* Section Heading */}
                <div className="flex flex-col items-center text-center max-w-2xl mx-auto gap-2">
                    <span className="text-xs font-bold text-purple-400 tracking-widest uppercase bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                        Workflow Process
                    </span>
                    <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white mt-1">
                        How Synapse Works
                    </h2>
                    <p className="text-sm text-gray-500 font-medium">
                        Get started in minutes whether you are looking to accelerate your workflow or monetize engineering structures.
                    </p>
                </div>

                {/* 3-Column Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {steps.map((step) => {
                        const Icon = step.icon;
                        return (
                            <Card key={step.id} className="relative bg-[#111827]/40 border border-[#1e293b]/50 p-8 rounded-2xl flex flex-col gap-4 backdrop-blur-sm group hover:border-purple-500/30 transition-all duration-300">
                                {/* Step Number Badge */}
                                <span className={`absolute top-4 right-6 text-4xl font-extrabold font-mono bg-gradient-to-br ${step.color} bg-clip-text text-transparent opacity-20 group-hover:opacity-40 transition-opacity`}>
                                    {step.id}
                                </span>

                                {/* Icon wrapper */}
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${step.color} p-0.5 shadow-lg`}>
                                    <div className="w-full h-full bg-[#111827] rounded-[10px] flex items-center justify-center">
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>
                                </div>

                                <Card.Header className="p-0 mt-2">
                                    <Card.Title className="text-lg font-semibold text-white tracking-tight">
                                        {step.title}
                                    </Card.Title>
                                </Card.Header>

                                <Card.Footer className="p-0">
                                    <p className="text-sm text-gray-400 leading-relaxed text-left">
                                        {step.description}
                                    </p>
                                </Card.Footer>
                            </Card>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}