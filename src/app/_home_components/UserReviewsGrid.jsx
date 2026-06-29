"use client";
import { ReviewCard } from "@/components/cards/ReviewCard";
import SectionHeader from "@/components/shared/SectionHeader";
import { motion } from "framer-motion";

export function UserReviewsGrid({ reviewsData }) {

    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15, 
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 }, 
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 15 } 
        },
    };

    return (
        <section className="w-full bg-[#030712] text-white py-16 overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 flex flex-col gap-8">


                <SectionHeader badge=" User Reviews" title="What Creators Say About Us" />

               
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }} 
                >
                    {reviewsData.map((review) => (
                        <motion.div key={review._id} variants={cardVariants}>
                            <ReviewCard review={review} />
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}