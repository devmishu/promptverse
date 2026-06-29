import { Card } from "@heroui/react";
import { Zap, ShieldCheck, Sparkles, Coins, Users, Flame } from "lucide-react";


export function WhyChooseUsCard({ benefit }) {
    const { title, description, icon: Icon, highlightColor } = benefit;

    return (
        <Card className="w-full bg-[#111827]/40 border border-[#1e293b]/50 p-6 rounded-2xl flex flex-col gap-3 backdrop-blur-sm hover:border-cyan-500/30 hover:bg-[#111827]/60 transition-all duration-300 group">
            {/* Icon Wrapper with Dynamic Highlight */}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border border-[#1e293b] bg-[#1f2937]/50 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`w-6 h-6 ${highlightColor}`} />
            </div>

            {/* Header Section */}
            <Card.Header className="p-0 flex flex-col items-start gap-1 mt-2">
                <Card.Title className="text-base font-semibold text-white tracking-tight group-hover:text-cyan-400 transition-colors">
                    {title}
                </Card.Title>
            </Card.Header> 

            {/* Footer Section holding the feature description */}
            <Card.Footer className="p-0 flex flex-col items-start">
                <p className="text-sm text-gray-400 leading-relaxed font-normal tracking-tight text-left">
                    {description}
                </p>
            </Card.Footer>
        </Card>
    );
}