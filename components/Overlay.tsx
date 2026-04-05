"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  // Section 1: "My Name. Creative Developer." (0% to 25% scroll)
  // Starts visible, fades out as we scroll to 25%
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.25], [0, -100]);

  // Section 2: "I build digital experiences." (30% to 55%)
  // Fades in at 30%, stays visible, fades out around 55%
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.3, 0.45, 0.55], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.55], [100, -100]);

  // Section 3: "Bridging design and engineering." (60% to 85%)
  const opacity3 = useTransform(scrollYProgress, [0.55, 0.6, 0.75, 0.85], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.55, 0.85], [100, -100]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none w-full h-full">
      {/* Section 1 */}
      <motion.div
        style={{ opacity: opacity1, y: y1 }}
        className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-2xl mb-4">
          Subhrajeet Dash.
        </h1>
        <p className="text-xl md:text-2xl text-zinc-300 font-light tracking-wide max-w-xl mx-auto drop-shadow-xl">
          Full Stack Developer & DevOps Engineer
        </p>
      </motion.div>

      {/* Section 2 */}
      <motion.div
        style={{ opacity: opacity2, y: y2 }}
        className="absolute inset-0 flex flex-col items-start justify-center p-8 md:p-24"
      >
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-6 drop-shadow-2xl">
            I build scalable <span className="text-zinc-400 italic font-serif">web applications.</span>
          </h2>
          <div className="h-1 w-24 bg-white/50 backdrop-blur-md rounded-full mb-6"></div>
          <p className="text-lg md:text-xl text-zinc-300 font-light leading-relaxed drop-shadow-md">
            Specializing in the MERN stack with hands-on experience designing RESTful APIs, architecting NoSQL schemas, and developing responsive React frontends.
          </p>
        </div>
      </motion.div>

      {/* Section 3 */}
      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="absolute inset-0 flex flex-col items-end justify-center p-8 md:p-24 text-right"
      >
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-6 drop-shadow-2xl">
            Bridging frontend &amp; <br /> backend architecture.
          </h2>
          <div className="h-1 w-24 bg-white/50 backdrop-blur-md rounded-full mb-6 ml-auto"></div>
          <p className="text-lg md:text-xl text-zinc-300 font-light leading-relaxed drop-shadow-md">
            Delivering robust full-stack solutions with clean component-driven design, JWT authentication, and secure data pipelines.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
