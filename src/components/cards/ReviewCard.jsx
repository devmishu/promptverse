import { Avatar, Card } from "@heroui/react";
import { Star } from "lucide-react";


export function ReviewCard({ review }) {
    const { userName, role, reviewText, rating, userImage,userImail } = review;
    console.log("Review", review);
    return (
        <Card className=" shrink-0 bg-[#111827]/40 border border-[#1e293b]/50 p-6 rounded-2xl flex flex-col gap-4 backdrop-blur-sm select-none">
            {/* Header Section: User Profile & Rating Stars */}
            <Card.Header className="p-0 flex items-start justify-between w-full">
                <div className="flex items-center gap-3">
                    <Avatar aria-label={`${userName}'s profile picture`} className="w-10 h-10 border border-gray-800">
                        <Avatar.Image alt={userName} src={userImage} />
                        <Avatar.Fallback className="text-sm bg-cyan-500 text-white font-bold">
                            {userName.charAt(0)}
                        </Avatar.Fallback>
                    </Avatar>

                    <div className="flex flex-col items-start">
                        <Card.Title className="text-sm font-semibold text-white leading-tight">
                            {userName}
                        </Card.Title>
                        <Card.Description className="text-xs text-gray-500 font-medium">
                            {review?.userEmail || userImail}
                        </Card.Description>
                    </div>
                </div>

                {/* Dynamic Star Ratings */}
                <div className="flex items-center gap-0.5 mt-1">
                    {[...Array(5)].map((_, index) => (
                        <Star
                            key={index}
                            size={12}
                            className={`${index < rating ? "fill-amber-400 text-amber-400" : "fill-gray-700 text-gray-700"
                                }`}
                        />
                    ))}
                </div>
            </Card.Header>

            {/* Footer Section: Displaying the Actual Feedback/Comment */}
            <Card.Footer className="p-0 flex flex-col items-start">
                <p className="text-sm text-gray-300 leading-relaxed font-normal tracking-tight text-left">
                    <span className="font-serif text-gray-500 mr-1 text-base">“</span>
                    {reviewText}
                    <span className="font-serif text-gray-500 ml-1 text-base">”</span>
                </p>
            </Card.Footer>
        </Card>
    );
}