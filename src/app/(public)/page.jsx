
import { HeroBanner } from "../_home_components/HeroBanner";
import { FeaturedPromptsGrid } from "../_home_components/FeaturedPromptsGrid";
import { UserReviewsGrid } from "../_home_components/UserReviewsGrid";
import { WhyChooseUsGrid } from "../_home_components/WhyChooseUsGrid";
import { HowItWorksGrid } from "../_home_components/HowItWorksGrid";
import { getUser } from "@/lib/core/session";
import { TopCreatorsGrid } from "../_home_components/TopCreatorsGrid";

export default async function Home() {

  const user = await getUser();

  console.log("home user check-----", user);
  return (
    <div className=" flex flex-col  items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HeroBanner />
      <TopCreatorsGrid />
      <FeaturedPromptsGrid />
      <WhyChooseUsGrid />
      <HowItWorksGrid />
      <UserReviewsGrid />
    </div>
  );
}
