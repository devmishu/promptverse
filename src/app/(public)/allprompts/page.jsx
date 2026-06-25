
import { PromptCard } from "@/components/cards/PromptCard";
import { getAllPrompts } from "@/lib/api/prompt";
import { SlidersHorizontal } from "lucide-react";
import PromptFilterBar from "../_components/PromptFilterBar";
import { PaginationWithSummary } from "@/components/shared/PaginationWithSummary";

// Next.js সার্ভার কম্পোনেন্টে searchParams হ্যান্ডেল করার স্ট্যান্ডার্ড উপায়
const AllPromptsPage = async ({ searchParams }) => {
    // searchParams প্রপ্স অবজেক্টটি সরাসরি রিসিভ করা হলো
    const filters = await searchParams;


    // URLSearchParams-এ অবজেক্ট পাস করে কুয়েরি স্ট্রিং জেনারেট করা হচ্ছে
    const quarySearch = new URLSearchParams(filters);
    const quaryString = quarySearch.toString();

    // ডাটাবেজ থেকে ফিল্টার করা প্রম্পট নিয়ে আসা হচ্ছে
    const promptsData = await getAllPrompts(quaryString);
    const allPromptsData = promptsData.result;

    console.log(promptsData);

    return (
        <div className="w-full min-h-screen bg-[#030712] text-white py-12 px-6">
            <div className="max-w-[1440px] mx-auto flex flex-col gap-8">

                {/* Header Information */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1e293b]/30 pb-6">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight uppercase flex items-center gap-2.5">
                            <SlidersHorizontal className="size-6 text-purple-500" />
                            All Prompts Engine {promptsData?.total}
                        </h1>
                        <p className="text-sm text-gray-500">
                            Explore our complete collection of high-quality, production-ready AI prompts.
                        </p>
                    </div>
                    <div className="text-xs font-mono bg-purple-500/10 border border-purple-500/20 text-purple-400 px-3 py-1.5 rounded-xl h-fit w-fit">
                        Total System Assets: {allPromptsData?.length || 0}
                    </div>
                </div>

                {/* 🎯 ক্লায়েন্ট ফিল্টার বার-এ সরাসরি ফিল্টার অবজেক্ট প্রপ্স হিসেবে পাস করে দিন */}
                {/* যাতে ফিল্টার বার বুঝতে পারে যে অলরেডি ইউআরএল-এ সার্চ বা কুয়েরি ডাটা আছে এবং সে যেন ওল্ড ডাটা রিমুভ না করে */}
                <PromptFilterBar filters={filters} />

                {/* Grid Layout */}
                {allPromptsData && allPromptsData.length > 0 ? (
                    <>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {allPromptsData.map((prompt) => (
                                <PromptCard key={prompt._id} prompt={prompt} />
                            ))}

                        </div>
                        <PaginationWithSummary promptsData={allPromptsData} filters={filters}
                            total={promptsData?.total} />
                    </>
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