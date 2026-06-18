import Image from "next/image";
import { HeroBanner } from "../_home_components/HeroBanner";
import { FeaturedPromptsGrid } from "../_home_components/FeaturedPromptsGrid";
import { UserReviewsGrid } from "../_home_components/UserReviewsGrid";
import { WhyChooseUsGrid } from "../_home_components/WhyChooseUsGrid";
import { HowItWorksGrid } from "../_home_components/HowItWorksGrid";

export default function Home() {
  return (
    <div className=" flex flex-col  items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HeroBanner />
      <FeaturedPromptsGrid />
      <WhyChooseUsGrid />
      <HowItWorksGrid />
      <UserReviewsGrid />
    </div>
  );
}
