import { PromptCard } from "@/components/cards/PromptCard";
import { getFeaturedPrompts } from "@/lib/api/prompt";

// 2. Grid Component rendering the list of static fake objects matching image_fc30cb.png
export async function FeaturedPromptsGrid() {
   
    const featuredPrompts = await getFeaturedPrompts();

    return (
        <section className="w-full bg-[#030712] text-white py-12 px-6">
            <div className="max-w-[1440px] mx-auto flex flex-col gap-6">
                {/* Section Heading matching image text */}
                <h2 className="text-xs font-bold text-gray-400 tracking-widest uppercase">
                    Featured Prompts
                </h2>

                {/* 3-Column Layout Dashboard Grid matching image layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredPrompts.map((prompt) => (
                        <PromptCard key={prompt.id} prompt={prompt} />
                    ))}
                </div>
            </div>
        </section>
    );
}