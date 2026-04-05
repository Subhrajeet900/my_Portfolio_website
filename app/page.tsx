import ScrollyCanvas from "@/components/ScrollyCanvas";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="w-full bg-[#0a0a0a] min-h-screen">
      {/* 
        The ScrollyCanvas is 500vh tall to allow for a long scroll.
        It contains the sticky canvas and the overlay text.
      */}
      <ScrollyCanvas />
      
      {/* 
        The Projects grid appears right after the 500vh scroll animation ends,
        acting as the rest of the website.
      */}
      <Projects />
    </main>
  );
}
