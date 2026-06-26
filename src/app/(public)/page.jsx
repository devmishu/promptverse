
import { HeroBanner } from "../_home_components/HeroBanner";
import { FeaturedPromptsGrid } from "../_home_components/FeaturedPromptsGrid";
import { UserReviewsGrid } from "../_home_components/UserReviewsGrid";
import { WhyChooseUsGrid } from "../_home_components/WhyChooseUsGrid";
import { HowItWorksGrid } from "../_home_components/HowItWorksGrid";
import { getUser } from "@/lib/core/session";
import { TopCreatorsGrid } from "../_home_components/TopCreatorsGrid";
import { getReviews } from "@/lib/api/review";
import { getFeaturedPrompts } from "@/lib/api/prompt";
import { FAQGrid } from "../_home_components/FAQGrid";
import { getTopCreators } from "@/lib/api/topcreator";

export default async function Home() {

  const user = await getUser();
  const featuredPrompts = await getFeaturedPrompts();
  const reviewsData = await getReviews();
  const creatorsData = await getTopCreators();

  console.log("home user check-----", user);
  return (
    <div className=" flex flex-col  items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HeroBanner />
      <TopCreatorsGrid creatorsData={creatorsData} />
      <FeaturedPromptsGrid featuredPrompts={featuredPrompts} />
      <WhyChooseUsGrid />
      <HowItWorksGrid />
      <UserReviewsGrid reviewsData={reviewsData} />
      <FAQGrid />
    </div>
  );
}
