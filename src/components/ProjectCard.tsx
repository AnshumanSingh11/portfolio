import { motion } from "motion/react";
import { Github, ExternalLink, User, Users } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface ProjectCardProps {
  title: string;
  subtitle: string; // Category label
  desc: string; // Short Description
  tags: string[]; // Tech Stack Badges
  github: string;
  liveDemo?: string;
  projectType: string; // e.g. "Individual Project"
}

export function ProjectCard({
  title,
  subtitle,
  desc,
  tags,
  github,
  liveDemo,
  projectType,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const active = isHovered || isTapped;

  // Handle outside click to collapse on mobile
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (isTapped && cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setIsTapped(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isTapped]);

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a, button")) {
      return;
    }
    const isMobile = window.matchMedia("(hover: none)").matches;
    if (isMobile) {
      setIsTapped(!isTapped);
    }
  };

  const isTeamProject = projectType.toLowerCase().includes("team");

  // Vercel/Linear cubic-bezier easing curve
  const vercelEase = [0.25, 1, 0.5, 1];

  // Primary action link (defaults to liveDemo, fallback to github)
  const projectLink = liveDemo && liveDemo !== "#" ? liveDemo : github;

  return (
    <motion.div
      ref={cardRef}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        y: active ? -6 : 0,
      }}
      transition={{
        duration: 0.3,
        ease: vercelEase,
      }}
      className={`group relative rounded-xl overflow-hidden border transition-all select-none flex flex-col justify-between bg-white/50 dark:bg-neutral-900/60 backdrop-blur-sm ${
        active
          ? "border-[#55CCFF]/50 shadow-[0_12px_24px_rgba(0,0,0,0.45),0_0_15px_rgba(85,204,255,0.06)]"
          : "border-neutral-200 dark:border-neutral-800 shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
      }`}
    >
      <div className="p-6 flex flex-col gap-2">
        {/* Category Label (Uppercase, Frosty blue) */}
        <span className="text-[10px] font-bold text-[#55CCFF] uppercase tracking-wider">
          {subtitle}
        </span>
        
        {/* Project Name */}
        <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
          {title}
        </h3>

        {/* Collapsible Details Container */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: active ? "auto" : 0,
            opacity: active ? 1 : 0,
          }}
          transition={{
            duration: 0.3,
            ease: vercelEase,
          }}
          className="overflow-hidden"
        >
          <div className="pt-3 pb-1 space-y-4">
            {/* Short Description */}
            <p className="text-sm text-neutral-400 leading-relaxed">
              {desc}
            </p>

            {/* Tech Stack Tags */}
            <div className="flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-neutral-900/40 text-[#7FDFFF] border border-[#7FDFFF]/12 shadow-[0_1px_2px_rgba(0,0,0,0.1)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Card Footer: Always visible */}
      <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between bg-neutral-950/15 mt-auto">
        {/* Left Side: GitHub icon/link + Project Type */}
        <div className="flex items-center gap-3">
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white transition-colors"
            aria-label="GitHub Repository"
          >
            <Github className="h-4.5 w-4.5" />
          </motion.a>

          <div className="flex items-center gap-1.5 text-xs text-neutral-500 border-l border-white/10 pl-3">
            {isTeamProject ? (
              <Users className="h-3.5 w-3.5 text-neutral-500" />
            ) : (
              <User className="h-3.5 w-3.5 text-neutral-500" />
            )}
            <span>{projectType}</span>
          </div>
        </div>

        {/* Right Side: View Project button */}
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={projectLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1 text-[11px] font-semibold px-3.5 py-1.5 rounded-lg bg-[#55CCFF] hover:bg-[#7FDFFF] text-neutral-950 transition-all cursor-pointer shadow-md shadow-[#55CCFF]/10"
        >
          <span>View Project</span>
          <ExternalLink className="h-3 w-3 ml-0.5" />
        </motion.a>
      </div>
    </motion.div>
  );
}
