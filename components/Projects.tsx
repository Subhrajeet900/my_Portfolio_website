import { ArrowUpRight } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "Flamingo",
      category: "Multi-Modal Travel Planning Application",
      year: "2025",
      description: "Full-stack MERN travel platform featuring a custom route optimization engine that computes multi-modal travel itineraries across four trade-off modes: Cheapest, Perfect, Comfort, and Fastest.",
    },
    {
      id: 2,
      title: "Calorie Calculator",
      category: "Health & Nutrition Tracker",
      year: "2025",
      description: "MERN nutrition tracking application enabling users to log meals and automatically compute nutritional values per serving, utilizing Chart.js for data visualization.",
    },
    {
      id: 3,
      title: "TruthLens AI",
      category: "Fake News Detection System",
      year: "2025",
      description: "MERN application that integrates the Hugging Face Inference API to classify news articles as real or fake, returning confidence-scored verdicts in real-time.",
    }
  ];

  return (
    <section className="relative w-full bg-[#0a0a0a] py-32 px-6 md:px-12 lg:px-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Selected Work
          </h2>
          <p className="text-xl text-zinc-400 font-light max-w-xl">
            A curated collection of digital experiences focusing on intersection of design and engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative flex flex-col justify-between overflow-hidden p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors duration-500 min-h-[400px] ${
                index === 1 || index === 2 ? 'md:mt-16' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <span className="text-zinc-500 font-mono text-sm uppercase tracking-wider">
                  {project.category}
                </span>
                <span className="text-zinc-600 font-mono text-sm">
                  {project.year}
                </span>
              </div>

              <div className="mt-24 z-10 relative">
                <h3 className="text-3xl font-semibold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-500 transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-zinc-400 font-light text-lg mb-8 max-w-sm">
                  {project.description}
                </p>
                <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors backdrop-blur-md">
                  <span className="text-sm font-medium tracking-wide">View Project</span>
                  <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>

              {/* Decorative abstract glow gradient specific to dark theme */}
              <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-to-tl from-white/[0.03] to-transparent rounded-full blur-3xl group-hover:from-white/[0.06] transition-colors duration-1000"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
