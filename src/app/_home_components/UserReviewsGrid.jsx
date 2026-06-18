import { ReviewCard } from "@/components/cards/ReviewCard";

// 2. Grid Component Rendering the List of Fake Review Objects
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
        }
    ];

    return (
        <section className="w-full bg-[#030712] text-white py-16 px-6">
            <div className="max-w-[1440px] mx-auto flex flex-col gap-8">

                {/* Section Title */}
                <div className="flex flex-col gap-2">
                    <h2 className="text-xs font-bold text-cyan-400 tracking-widest uppercase">
                        User Reviews
                    </h2>
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                        What Creators Say About Us
                    </h3>
                </div>

                {/* Responsive Layout Grid Mapping the Fake Data */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {fakeReviewsData.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                </div>

            </div>
        </section>
    );
}