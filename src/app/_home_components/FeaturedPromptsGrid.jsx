"use client"; 

import { PromptCard } from "@/components/cards/PromptCard";
import SectionHeader from "@/components/shared/SectionHeader";
import { motion } from "framer-motion";


export function FeaturedPromptsGrid({ featuredPrompts = [] }) {

    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12, 
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 24 }, 
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 90, damping: 14 } 
        },
    };

    return (
        <section className="w-full bg-[#030712] text-white py-12 px-6">
            <div className="max-w-[1440px] mx-auto flex flex-col gap-6">

                <SectionHeader  title="Featured Prompts"  />
                

               
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }} 
                >
                    {featuredPrompts.map((prompt, idx) => (
                        <motion.div key={prompt._id || idx} variants={cardVariants}>
                            <PromptCard prompt={prompt} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}