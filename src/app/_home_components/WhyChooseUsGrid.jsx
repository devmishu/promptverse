"use client"; // 🚀 Framer motion ব্যবহারের জন্য ফাইলটিকে client কম্পোনেন্ট করা হলো

import { WhyChooseUsCard } from "@/components/cards/WhyChooseUsCard";
import SectionHeader from "@/components/shared/SectionHeader";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, Sparkles, Coins, Users, Flame } from "lucide-react";

// 2. Main Grid Component with Marketplace Platform Benefits
export function WhyChooseUsGrid() {
  const platformBenefits = [
    {
      id: 1,
      title: "Verified Top-Tier Prompts",
      description: "Every submitted prompt undergoes a strict admin moderation workflow to ensure absolute reliability, safety, and performance before hitting the public marketplace.",
      icon: ShieldCheck,
      highlightColor: "text-emerald-400"
    },
    {
      id: 2,
      title: "Multi-Model Engineering",
      description: "One single ecosystem built natively to discover, manage, and execute engineering prompts for ChatGPT, Midjourney, Claude, Gemini, and more seamlessly.",
      icon: Sparkles,
      highlightColor: "text-purple-400"
    },
    {
      id: 3,
      title: "One-Click Clipboard Engine",
      description: "Instantly copy optimized production-ready engineering instructions directly to your device clipboard while dynamically incrementing community analytics metrics.",
      icon: Zap,
      highlightColor: "text-cyan-400"
    },
    {
      id: 4,
      title: "Monetize Creative Prompts",
      description: "Transition smoothly from an active User to a verified Marketplace Creator. Gate high-value prompt parameters behind our premium system to start earning.",
      icon: Coins,
      highlightColor: "text-amber-400"
    },
    {
      id: 5,
      title: "Community Driven Ecosystem",
      description: "Collaborate directly through public ratings, structured user reviews, global bookmarking parameters, and transparent creator feedback mechanisms.",
      icon: Users,
      highlightColor: "text-blue-400"
    },
    {
      id: 6,
      title: "Advanced Trending Analytics",
      description: "Track prompt visibility performance parameters. Filter accurately by strict algorithmic difficulty levels, copy frequencies, and aggregate reviews.",
      icon: Flame,
      highlightColor: "text-rose-400"
    }
  ];

  // 🎨 অন্যান্য সেকশনের অ্যানিমেশনের সাথে হুবহু ম্যাচিং ভ্যারিয়েন্টস
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // কার্ডগুলোর মাঝের Delay টাইম (০.১ সেকেন্ড)
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24 }, // শুরুতে কার্ড কিছুটা নিচে এবং হাইড থাকবে
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 90, damping: 14 } // স্মুথ স্প্রিং ইফেক্ট দিয়ে একবারই অ্যানিমেট হবে
    },
  };

  return (
    <section className="w-full bg-[#030712] text-white py-20 px-6 border-t border-[#1e293b]/30">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-12">

        <SectionHeader
          badge="Platform Security & Value"
          title="Why Choose Our Prompt Ecosystem"
          description="Discover how our secure architectural setup connects engineering experts, automated moderation pipelines, and AI developers in one streamlined marketplace."
        />

        {/* 🚀 মোশন কন্টেইনার: স্ক্রিনে আসলেই কার্ডগুলো একটার পর একটা স্ট্যাগার ইফেক্টে অ্যানিমেট হবে */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }} // একবারই অ্যানিমেট হবে, বারবার স্ক্রোল করলেও রিপিট হবে না
        >
          {platformBenefits.map((benefit) => (
            <motion.div key={benefit.id} variants={cardVariants}>
              <WhyChooseUsCard benefit={benefit} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}