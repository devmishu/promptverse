
import { PromptCard } from "@/components/cards/PromptCard";
import { getAllPrompts } from "@/lib/api/prompt";
import { SlidersHorizontal } from "lucide-react";
import PromptFilterBar from "../_components/PromptFilterBar";
import { PaginationWithSummary } from "@/components/shared/PaginationWithSummary";
import { getUser } from "@/lib/core/session";



const AllPromptsPage = async ({ searchParams }) => {

    const filters = await searchParams;

    const user = await getUser();





    const quarySearch = new URLSearchParams(filters);
    const quaryString = quarySearch.toString();


    const promptsData = await getAllPrompts(quaryString);
    const allPromptsData = promptsData.result;

    console.log("all prompts..",allPromptsData);


    return (
        <div className="w-full min-h-screen bg-[#030712] text-white py-12 px-6">
            <div className="max-w-[1440px] mx-auto flex flex-col gap-8">

                {/* Header Information */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1e293b]/30 pb-6">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight uppercase flex items-center gap-2.5">
                            All Prompts
                        </h1>
                        <p className=" text-gray-500">
                            Explore our complete collection of high-quality, production-ready AI prompts.
                        </p>
                    </div>
                </div>


                <PromptFilterBar filters={filters} />

                {/* Grid Layout */}
                {allPromptsData && allPromptsData.length > 0 ? (
                    <>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {allPromptsData.map((prompt) => (
                                <PromptCard key={prompt._id} prompt={prompt} author={user} />
                            ))}

                        </div>
                        <PaginationWithSummary promptsData={allPromptsData} filters={filters}
                            total={promptsData?.total} />
                    </>
                ) : (

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