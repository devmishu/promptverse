import { Avatar, Card, Button } from "@heroui/react";
import { Star, Eye } from "lucide-react";

// 1. Updated PromptCard with a modern 'View Details' Action Button
export function PromptCard({ prompt,author }) {
    const { title, copies, rating, thumbnail:iconUrl,  } = prompt;

    console.log("prompt.....",prompt);

    return (
        <Card className="w-full bg-[#111827]/40 border border-[#1e293b]/40 hover:border-cyan-500/30 transition-all p-5 rounded-2xl flex flex-col gap-4 backdrop-blur-sm group cursor-pointer">
            {/* Top Section: AI Tool Logo/Icon */}
            <div className="w-11 h-11 rounded-xl bg-[#1f2937] border border-gray-800 flex items-center justify-center p-2.5 overflow-hidden">
                <img
                    alt={`${title} tool icon`}
                    className="w-full h-full object-contain pointer-events-none select-none"
                    loading="lazy"
                    src={iconUrl}
                />
            </div>

            {/* Title Header Section */}
            <Card.Header className="p-0 flex flex-col items-start gap-1">
                <Card.Title className="text-[15px] font-semibold text-white tracking-tight line-clamp-2 leading-snug group-hover:text-cyan-400 transition-colors">
                    {title}
                </Card.Title>
            </Card.Header>

            {/* Footer Section: Author, Copy Count, and Rating Stars */}
            <Card.Footer className="p-0 flex flex-col gap-4 mt-auto pt-2">
                <div className="flex items-center justify-between w-full">
                    {/* Left Side: Avatar and Usage Info */}
                    <div className="flex items-center gap-2">
                        <Avatar aria-label={`${author?.name}'s profile picture`} className="w-5 h-5 border border-gray-800">
                            <Avatar.Image
                                alt={author?.name}
                                src={author?.avatarUrl}
                            />
                            <Avatar.Fallback className="text-[10px] bg-purple-500 text-white font-bold">
                                {author?.name?.charAt(0)}
                            </Avatar.Fallback>
                        </Avatar>
                        <span className="text-xs text-gray-400 font-medium tracking-tight">
                            {copies} copy
                        </span>
                    </div>

                    {/* Right Side: Visual Rating Stars */}
                    <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, index) => (
                            <Star
                                key={index}
                                size={12}
                                className={`${index < rating
                                    ? "fill-amber-400 text-amber-400"
                                    : "fill-gray-700 text-gray-700"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* View Details Action Button */}
                <Button
                    size="sm"
                    className="w-full h-9 rounded-xl bg-[#111827] hover:bg-[#1f2937] text-gray-300 font-medium text-xs border border-gray-800 hover:border-cyan-500/30 transition-all flex items-center justify-center gap-2"
                >
                    <Eye size={14} className="text-gray-400 group-hover:text-cyan-400 transition-colors" />
                    View Details
                </Button>
            </Card.Footer>
        </Card>
    );
}