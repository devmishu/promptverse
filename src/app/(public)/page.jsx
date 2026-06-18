import Image from "next/image";
import { HeroBanner } from "../_home_components/HeroBanner";
import { FeaturedPromptsGrid } from "../_home_components/FeaturedPromptsGrid";

export default function Home() {
  return (
    <div className=" flex flex-col  items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HeroBanner />
      <FeaturedPromptsGrid />
    </div>
  );
}
