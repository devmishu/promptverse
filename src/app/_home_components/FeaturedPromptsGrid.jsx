"use client"; // 🚀 Framer motion ব্যবহারের জন্য client কম্পোনেন্ট করা হলো

import { PromptCard } from "@/components/cards/PromptCard";
import SectionHeader from "@/components/shared/SectionHeader";
import { motion } from "framer-motion";

// যেহেতু এটি ক্লায়েন্ট কম্পোনেন্ট, ডাটা সরাসরি এখানে async/await দিয়ে না এনে 
// প্যারেন্ট (Server Component) থেকে props হিসেবে পাস করা সবচেয়ে বেস্ট প্র্যাকটিস।
export function FeaturedPromptsGrid({ featuredPrompts = [] }) {

    // 🎨 রিভিউ সেকশনের সাথে ম্যাচিং অ্যানিমেশন ভ্যারিয়েন্টস
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12, // প্রতিটি প্রম্পট কার্ডের মাঝের Delay টাইম
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 24 }, // শুরুতে কার্ড কিছুটা নিচে এবং হাইড থাকবে
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 90, damping: 14 } // স্মুথ স্প্রিং ইফেক্ট দিয়ে অ্যানিমেশনটি থেমে যাবে
        },
    };

    return (
        <section className="w-full bg-[#030712] text-white py-12 px-6">
            <div className="max-w-[1440px] mx-auto flex flex-col gap-6">

                {/* Section Heading */}
                <h2 className="text-xs font-bold text-gray-400 tracking-widest uppercase">
                    Featured Prompts
                </h2>
                <SectionHeader  title="Featured Prompts"  />
                

                {/* 🚀 মোশন কন্টেইনার: স্ক্রিনে আসলেই একবার অ্যানিমেশন ট্রিগার হবে */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }} // একবারই অ্যানিমেট হবে, বারবার স্ক্রোল করলেও রিপিট হবে না
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