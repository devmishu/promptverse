"use client";
import { FAQCard } from "@/components/cards/FAQCard";
import SectionHeader from "@/components/shared/SectionHeader";
import { motion } from "framer-motion";

export function FAQGrid() {
    // প্ল্যাটফর্মের জন্য ৫টি প্রাসঙ্গিক রিয়েল-লাইফ প্রশ্ন ও উত্তর ডাটা
    const faqData = [
        {
            question: "How do I purchase a prompt from Synapse?",
            answer: "Simply browse through our featured or top creator prompts, click on the prompt card to view details, and click the 'Buy' button. Once the payment is complete, you will unlock full access to the prompt text."
        },
        {
            question: "Can I sell my own AI prompts here?",
            answer: "Yes, absolutely! You can apply as a Creator from your dashboard. Once approved, you can start listing your high-performing prompts for ChatGPT, Midjourney, Claude, and more."
        },
        {
            question: "How do creators withdraw their earnings?",
            answer: "Creators can track their sales analytics directly from the Admin or Creator dashboard. Payouts are processed safely via our linked payment channels upon reaching the minimum withdrawal threshold."
        },
        {
            question: "Are the prompts tested before being approved?",
            answer: "Yes. Every single prompt submitted by creators undergoes an internal review process (Status: Pending -> Approved) to ensure quality, accuracy, and high efficiency before it goes live."
        },
        {
            question: "What is your refund policy if a prompt doesn't work?",
            answer: "Since prompts are digital goods, we generaly do not offer refunds. However, if a prompt is reported as broken or misleading, our admin team will review the report and take appropriate action."
        }
    ];

    return (
        <section className="w-full bg-[#030712] text-white py-16 px-6">
            <div className="max-w-[1024px] mx-auto flex flex-col gap-10">

                {/* Section Header matching layout rules */}
                <SectionHeader badge="Have Questions?" title="Frequently Asked Questions" description="Everything you need to know about buying, selling, and using premium AI prompts." />

                {/* 🚀 Simple Framer Motion Wrapper matching your layout architecture */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full"
                >
                    <FAQCard faqs={faqData} />
                </motion.div>
            </div>
        </section>
    );
}