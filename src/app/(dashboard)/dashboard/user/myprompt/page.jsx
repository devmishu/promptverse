import { PromptCard } from '@/components/cards/PromptCard';
import { getPromptsByUser } from '@/lib/api/prompt';
import { getUser } from '@/lib/core/session';
import React from 'react';



const MyPromptPage = async () => {
    const user = await getUser();
    const prompts = await getPromptsByUser(user?.id);

    console.log("myprompts..........", prompts, user);



    return (
        <div className="w-full  bg-[#030712] text-white sm:py-12 px-6">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {prompts.map((prompt, index) => (
                        <PromptCard key={index} prompt={prompt} author={user} />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default MyPromptPage;