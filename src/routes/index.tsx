import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Github, Linkedin } from "lucide-react";
import { HeroBackground } from "@/components/HeroBackground";
import { Navbar } from "@/components/Navbar";
import { About, Skills, Projects, WorkingOn, Contact } from "@/components/Sections";
import { FrostParticles } from "@/components/FrostParticles";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anshuman Singh (Frosty) — Full Stack Developer & Student" },
      {
        name: "description",
        content:
          "Portfolio of Anshuman Singh (Frosty), a final-year Computer Science student passionate about Full Stack Development, AI, and building products that solve real problems.",
      },
      { property: "og:title", content: "Anshuman Singh (Frosty) — Full Stack Developer" },
      {
        property: "og:description",
        content:
          "Portfolio of Anshuman Singh (Frosty), a final-year Computer Science student passionate about Full Stack Development, AI, and building products that solve real problems.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="frostbite-bg bg-gradient-to-b from-[#F8FBFF] via-[#EDF7FF] to-[#E6F3FF] min-h-screen relative overflow-x-hidden">
      {/* Background Star, Snowflake, and Frost Shard Canvas */}
      <FrostParticles />
      <Navbar />

      {/* Top Right Corner Crystal Decoration */}
      <div className="absolute top-0 right-0 w-80 h-80 overflow-hidden pointer-events-none select-none z-0 opacity-[0.04] dark:opacity-[0.07] text-[#55CCFF] dark:text-[#7FDFFF]">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full fill-none stroke-current"
          strokeWidth="0.5"
        >
          <polygon points="50,0 80,30 100,0 100,50 80,45 50,25" />
          <line x1="100" y1="0" x2="50" y2="50" />
          <line x1="80" y1="30" x2="30" y2="80" />
          <polygon points="100,50 75,75 50,50" />
          <line x1="100" y1="50" x2="0" y2="50" />
          <line x1="100" y1="0" x2="100" y2="100" />
          <line x1="50" y1="0" x2="100" y2="50" />
          <line x1="75" y1="0" x2="100" y2="25" />
        </svg>
      </div>

      <HeroBackground>
        <div className="max-w-3xl mx-auto text-center relative z-20">
          <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
            {/* Light Mode Glow */}
            <div className="w-[480px] h-[480px] rounded-full bg-gradient-to-r from-[#DDF6FF] to-[#B8ECFF] opacity-[0.07] blur-[80px] pointer-events-none block dark:hidden" />
            {/* Dark Mode Radial Lighting */}
            <div
              className="w-[700px] h-[700px] rounded-full pointer-events-none hidden dark:block blur-[64px]"
              style={{
                background:
                  "radial-gradient(circle, rgba(127, 223, 255, 0.08) 0%, transparent 60%)",
              }}
            />
          </div>

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-xs uppercase tracking-[0.2em] text-orange-500 font-semibold mb-5"
          >
            FROSTY
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-sans font-bold tracking-tight text-4xl md:text-6xl lg:text-7xl text-neutral-900 dark:text-neutral-100 hero-glow"
          >
            Hi, I'm Anshuman Singh
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="relative z-20 mx-auto mt-4 text-lg md:text-2xl font-medium tracking-tight text-neutral-600 dark:text-neutral-300"
          >
            Most people online know me as{" "}
            <span className="relative inline-block font-bold bg-gradient-to-r from-[#0088EE] to-[#00D2FF] dark:from-[#55CCFF] dark:to-[#7FDFFF] bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(85,204,255,0.3)] dark:drop-shadow-[0_0_12px_rgba(127,223,255,0.45)]">
              Frosty
            </span>
            .
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.95 }}
            className="text-xs md:text-sm uppercase tracking-[0.18em] text-[#55CCFF] dark:text-[#7FDFFF] font-semibold mt-6"
          >
            Final Year Computer Science Student • Full Stack Developer • AI Enthusiast
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="relative z-20 mx-auto mt-4 max-w-xl text-base md:text-lg text-neutral-600 dark:text-neutral-300"
          >
            I build web applications, AI-powered tools, and digital experiences that solve real-world problems.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.25 }}
            className="mt-8 flex justify-center gap-3 relative z-30"
          >
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-5 py-2.5 rounded-md border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 text-sm font-semibold hover:bg-white dark:hover:bg-neutral-900 transition cursor-pointer"
            >
              Get in touch
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.4 }}
            className="mt-5 flex justify-center gap-4 relative z-30"
          >
            <motion.a
              whileHover={{ boxShadow: "0 0 10px rgba(127, 223, 255, 0.4)" }}
              href="https://github.com/AnshumanSingh11"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/10 dark:bg-neutral-900/20 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:border-[#55CCFF]/50 transition duration-300 cursor-pointer"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </motion.a>
            <motion.a
              whileHover={{ boxShadow: "0 0 10px rgba(127, 223, 255, 0.4)" }}
              href="https://www.linkedin.com/in/anshuman-singh-21776b287/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/10 dark:bg-neutral-900/20 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:border-[#55CCFF]/50 transition duration-300 cursor-pointer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </motion.a>
          </motion.div>
        </div>
      </HeroBackground>

      {/* Bottom Left Corner Crystal Decoration */}
      <div className="absolute bottom-24 left-0 w-96 h-96 overflow-hidden pointer-events-none select-none z-0 opacity-[0.016] dark:opacity-[0.028] text-[#55CCFF] dark:text-[#7FDFFF]">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full fill-none stroke-current"
          strokeWidth="0.5"
        >
          <polygon points="0,50 25,25 50,50 25,75" />
          <line x1="0" y1="50" x2="50" y2="50" />
          <line x1="25" y1="25" x2="25" y2="75" />
          <polygon points="0,100 40,60 50,100" />
          <line x1="0" y1="100" x2="100" y2="0" />
          <line x1="0" y1="50" x2="50" y2="100" />
          <line x1="0" y1="75" x2="25" y2="100" />
        </svg>
      </div>

      <About />
      <Skills />
      <Projects />
      <WorkingOn />
      <Contact />
    </main>
  );
}
