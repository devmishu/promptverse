"use client"
import { ReviewCard } from "@/components/cards/ReviewCard";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";

// 2. Infinite Auto-Scrolling Reviews Grid Component
export function UserReviewsGrid() {
    const fakeReviewsData = [
        {
            id: 1,
            name: "Danny Thomson",
            role: "Senior Frontend Engineer",
            rating: 5,
            reviewText: "The prompt layouts and dynamic component structures saved me hours of design iteration. Absolute game changer for React development.",
            avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80"
        },
        {
            id: 2,
            name: "Aisha Rahman",
            role: "UI/UX Designer",
            rating: 5,
            reviewText: "Extremely clean, modern, and highly adaptable. The HeroUI integration feels incredibly responsive on both desktop and mobile layouts.",
            avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
        },
        {
            id: 3,
            name: "Marc Edwards",
            role: "Full-Stack Developer",
            rating: 4,
            reviewText: "Implementing this dashboard design pattern made my code modular and scalable. Highly recommend for any modern web platform.",
            avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80"
        },
        {
            id: 4,
            name: "Sarah Jenkins",
            role: "AI Prompt Engineer",
            rating: 5,
            reviewText: "Finding high-quality Midjourney prompts used to be a mess. This marketplace streamlined my entire creative workflow flawlessly.",
            avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80"
        },
        {
            id: 5,
            name: "Arjun Mehta",
            role: "Technical Content Creator",
            rating: 5,
            reviewText: "The filtering system by AI tool and difficulty level is incredibly intuitive. It makes discovering niche ChatGPT engineering templates effortless.",
            avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
        }
    ];

    const controls = useAnimationControls();
    const [isPlaying, setIsPlaying] = useState(true);
    const shouldScroll = fakeReviewsData.length > 3;

    // Infinite looping animation arrangement
    useEffect(() => {
        if (shouldScroll && isPlaying) {
            controls.start({
                x: [0, -1960], // Moves exactly half the width of total duplicated data structure
                transition: {
                    ease: "linear",
                    duration: 25,
                    repeat: Infinity,
                },
            });
        } else {
            controls.stop();
        }
    }, [isPlaying, controls, shouldScroll]);

    return (
        <section className="w-full bg-[#030712] text-white py-16 overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 flex flex-col gap-8">

                {/* Section Header */}
                <div className="flex flex-col gap-2">
                    <h2 className="text-xs font-bold text-cyan-400 tracking-widest uppercase">
                        User Reviews
                    </h2>
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                        What Creators Say About Us
                    </h3>
                </div>

                {/* Carousel Framework Container */}
                <div
                    className="relative w-full flex overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,_black_10%,_black_90%,transparent_100%)]"
                    onMouseEnter={() => setIsPlaying(false)}
                    onMouseLeave={() => setIsPlaying(true)}
                >
                    {shouldScroll ? (
                        <motion.div
                            className="flex gap-6 pointer-events-auto cursor-pointer"
                            animate={controls}
                        >
                            {/* Render structural set 1 */}
                            {fakeReviewsData.map((review, idx) => (
                                <ReviewCard key={`set1-${review.id}-${idx}`} review={review} />
                            ))}
                            {/* Render identical duplicated structural set 2 for perfect seamless infinite looping wrap */}
                            {fakeReviewsData.map((review, idx) => (
                                <ReviewCard key={`set2-${review.id}-${idx}`} review={review} />
                            ))}
                        </motion.div>
                    ) : (
                        // Standard static alignment flex row when items count <= 3
                        <div className="flex flex-wrap lg:flex-nowrap gap-6 w-full">
                            {fakeReviewsData.map((review) => (
                                <ReviewCard key={review.id} review={review} />
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
}