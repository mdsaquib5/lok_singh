import Hero from "@/components/ui/Hero";
import About from "@/components/ui/About";
import ParallaxBg from "@/components/ui/LokBg";
import Post from "@/components/ui/Post";
import Media from "@/components/ui/Media";
import Brands from "@/components/ui/Brands";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Brands />
      <Post />
      <Media />
      <ParallaxBg />
    </>
  );
}
