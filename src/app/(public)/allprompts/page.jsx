import { PromptCard } from "@/components/cards/PromptCard";
import { getAllPrompts } from "@/lib/api/prompt";
import { SlidersHorizontal } from "lucide-react";
import PromptFilterBar from "../_components/PromptFilterBar";

// Next.js সার্ভার কম্পোনেন্টে searchParams সরাসরি প্রপ্স হিসেবে রিসিভ হয়
const AllPromptsPage = async ({ searchParams }) => {



    const filters = await searchParams;
    console.log('search quary....,', filters);

    const quarySearch = new URLSearchParams(filters);
    const quaryString = quarySearch.toString();
    console.log("quaryString..........", quaryString);


    // আপনার getAllPrompts ফাংশনে কুয়েরি পাস করা হচ্ছে
    const allPromptsData = await getAllPrompts(quaryString);
    console.log("Filtered Server Prompts:", allPromptsData);

    return (
        <div className="w-full min-h-screen bg-[#030712] text-white py-12 px-6">
            <div className="max-w-[1440px] mx-auto flex flex-col gap-8">

                {/* Header Information */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1e293b]/30 pb-6">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight uppercase flex items-center gap-2.5">
                            <SlidersHorizontal className="size-6 text-purple-500" />
                            All Prompts Engine
                        </h1>
                        <p className="text-sm text-gray-500">
                            Explore our complete collection of high-quality, production-ready AI prompts.
                        </p>
                    </div>
                    <div className="text-xs font-mono bg-purple-500/10 border border-purple-500/20 text-purple-400 px-3 py-1.5 rounded-xl h-fit w-fit">
                        Total System Assets: {allPromptsData?.length || 0}
                    </div>
                </div>

                {/* 🎯 ইন্টিগ্রেটেড ক্লায়েন্ট ফিল্টার কন্ট্রোলার বার */}
                <PromptFilterBar />

                {/* Grid Layout Layout */}
                {allPromptsData && allPromptsData.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {allPromptsData.map((prompt) => (
                            <PromptCard key={prompt._id} prompt={prompt} />
                        ))}
                    </div>
                ) : (
                    /* নো ডাটা ফাউন্ড স্টেট */
                    <div className="w-full border border-dashed border-[#1e293b] rounded-3xl p-16 text-center flex flex-col items-center justify-center gap-2">
                        <p className="text-base text-gray-400 font-medium">No system prompts match your selected filters.</p>
                        <p className="text-xs text-gray-600">Try clearing your text input or resetting the model configurations.</p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default AllPromptsPage;