import { WhyChooseUsCard } from "@/components/cards/WhyChooseUsCard"; 
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

  return (
    <section className="w-full bg-[#030712] text-white py-20 px-6 border-t border-[#1e293b]/30">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-12">
        
        {/* Section Heading with Recruitment-Friendly Topography & Contrast */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto gap-3">
          <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            Platform Security & Value
          </span>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white mt-1">
            Why Choose Our Prompt Ecosystem
          </h2>
          <p className="text-sm md:text-base text-gray-500 font-medium leading-relaxed">
            Discover how our secure architectural setup connects engineering experts, automated moderation pipelines, and AI developers in one streamlined marketplace.
          </p>
        </div>

        {/* 3-Column Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platformBenefits.map((benefit) => (
            <WhyChooseUsCard key={benefit.id} benefit={benefit} />
          ))}
        </div>

      </div>
    </section>
  );
}