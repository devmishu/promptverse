"use client";

import { useEffect, useState } from "react";
import { Search, ArrowUpDown, Cpu, Layers, Gauge } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PromptFilterBar({ filters }) {
    const router = useRouter();

    // 🌟 ফিল্টার স্টেটস
    const [searchQuery, setSearchQuery] = useState(filters?.search || "");
    const [selectedSort, setSelectedSort] = useState(filters?.sort || "all");
    const [selectedAiTool, setSelectedAiTool] = useState(filters?.aiTool || "all");
    const [selectedCategory, setSelectedCategory] = useState(filters?.category || "all");
    const [selectedDifficulty, setSelectedDifficulty] = useState(filters?.difficulty || "all");

   
    useEffect(() => {
        const sp = new URLSearchParams();

        if (selectedSort && selectedSort !== 'all') sp.set('sort', selectedSort);
        else sp.delete('sort');

        if (selectedAiTool && selectedAiTool !== 'all') sp.set('aiTool', selectedAiTool);
        else sp.delete('aiTool');

        if (selectedCategory && selectedCategory !== 'all') sp.set('category', selectedCategory);
        else sp.delete('category');

        if (selectedDifficulty && selectedDifficulty !== 'all') sp.set('difficulty', selectedDifficulty);
        else sp.delete('difficulty');

        if (searchQuery) sp.set('search', searchQuery);
        else sp.delete('search');

        const searchString = sp.toString();
        const path = searchString ? `?${searchString}` : window.location.pathname;

        router.push(path, { scroll: false });
    }, [searchQuery, selectedSort, selectedAiTool, selectedCategory, selectedDifficulty, router]);

   
    const selectClass = "w-full pl-10 pr-4 bg-[#0d1117] border border-[#30363d] hover:border-purple-500/50 text-sm text-gray-200 rounded-xl outline-none transition-all appearance-none cursor-pointer focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30";
    const optionClass = "bg-[#0d1117] text-gray-200 my-1 py-2 rounded-xl checked:bg-purple-600 checked:text-white";

    return (
        <div className="w-full bg-[#111827]/20 border border-[#1e293b]/50 rounded-3xl backdrop-blur-md p-4 sm:p-5 shadow-xl flex flex-col gap-4 relative z-30">

           
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">

               
                <div className="md:col-span-3 relative flex items-center w-full">
                    <Search className="absolute left-3 size-4 text-gray-400 pointer-events-none" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search prompts by title, keywords or tech stack..."
                        className="w-full pl-10 pr-4 h-11 bg-[#030712]/60 border border-[#1e293b]/50 hover:border-purple-500/50 focus:border-purple-500 text-sm text-white rounded-xl outline-none transition-all placeholder-gray-500"
                    />
                </div>

               
                <div className="relative flex items-center w-full">
                    <ArrowUpDown className="absolute left-3 size-4 text-purple-400 pointer-events-none" />
                    <select
                        value={selectedSort}
                        onChange={(e) => setSelectedSort(e.target.value)}
                        className={`${selectClass} h-11`}
                    >
                        <option value="all" className={optionClass}>Sort By</option>
                        <option value="latest" className={optionClass}>Latest Releases</option>
                        <option value="most-copied" className={optionClass}>Most Copied</option>
                        <option value="most-popular" className={optionClass}>Most Popular</option>
                    </select>
                </div>
            </div>

           
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-[#1e293b]/30 pt-4">

                
                <div className="relative flex items-center w-full">
                    <Cpu className="absolute left-3 size-4 text-cyan-400 pointer-events-none" />
                    <select
                        value={selectedAiTool}
                        onChange={(e) => setSelectedAiTool(e.target.value)}
                        className={`${selectClass} h-10`}
                    >
                        <option value="all" className={optionClass}>AI Model / Tool</option>
                        <option value="chatgpt" className={optionClass}>ChatGPT</option>
                        <option value="gemini" className={optionClass}>Gemini</option>
                        <option value="midjourney" className={optionClass}>Midjourney</option>
                        <option value="claude" className={optionClass}>Claude</option>
                    </select>
                </div>

               
                <div className="relative flex items-center w-full">
                    <Layers className="absolute left-3 size-4 text-indigo-400 pointer-events-none" />
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className={`${selectClass} h-10`}
                    >
                        <option value="all" className={optionClass}>All Categories</option>
                        <option value="development" className={optionClass}>Web Development</option>
                        <option value="marketing" className={optionClass}>Marketing</option>
                        <option value="writing" className={optionClass}>Creative Writing</option>
                        <option value="design" className={optionClass}>UI/UX Design</option>
                    </select>
                </div> 

                
                <div className="relative flex items-center w-full">
                    <Gauge className="absolute left-3 size-4 text-rose-400 pointer-events-none" />
                    <select
                        value={selectedDifficulty}
                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                        className={`${selectClass} h-10`}
                    >
                        <option value="all" className={optionClass}>Difficulty Level</option>
                        <option value="beginner" className={optionClass}>Beginner</option>
                        <option value="intermediate" className={optionClass}>Intermediate</option>
                        <option value="pro" className={optionClass}>Pro</option>
                    </select>
                </div>

            </div>
        </div>
    );
}