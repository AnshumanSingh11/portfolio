import { useState, useEffect, useMemo } from "react";
import { Code2, FileText } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#working-on", label: "Working On" },
  { href: "#contact", label: "Contact" },
];

interface HoverParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
}

function ThemeToggleButton4({
  theme,
  toggleTheme,
}: {
  theme: "light" | "dark";
  toggleTheme: () => void;
}) {
  const isDark = theme === "dark";
  const [isHovered, setIsHovered] = useState(false);
  const [hoverParticles, setHoverParticles] = useState<HoverParticle[]>([]);

  // Update hover particles dynamically
  useEffect(() => {
    if (hoverParticles.length === 0) return;
    let animId = requestAnimationFrame(function update() {
      setHoverParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            rotation: p.rotation + p.rotSpeed,
            opacity: p.opacity - 0.016, // Fades out in ~56 frames (0.9 seconds)
          }))
          .filter((p) => p.opacity > 0),
      );
      animId = requestAnimationFrame(update);
    });
    return () => cancelAnimationFrame(animId);
  }, [hoverParticles]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Emit one tiny snowflake particle drifting down-left
    const speed = Math.random() * 0.25 + 0.35; // Slow drift
    const angle = (Math.random() * 10 + 35) * (Math.PI / 180); // 35° - 45° angle
    const pvx = -speed * Math.cos(angle);
    const pvy = speed * Math.sin(angle);

    const newParticle: HoverParticle = {
      id: Date.now() + Math.random(),
      x: 12,
      y: 12,
      vx: pvx,
      vy: pvy,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02,
      opacity: 0.9,
    };
    setHoverParticles((prev) => [...prev, newParticle]);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <motion.button
      whileHover={{
        scale: 1.035,
        boxShadow: "0 0 14px rgba(127, 223, 255, 0.1)",
      }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={toggleTheme}
      className="relative flex items-center justify-center p-1.5 rounded-full cursor-pointer focus:outline-none transition-colors duration-200"
      aria-label="Toggle theme"
    >
      {/* Light Mode Glow Bloom Backdrop */}
      {!isDark && (
        <motion.div
          animate={{
            opacity: isHovered ? 0.38 : 0,
            scale: isHovered ? 1.55 : 0.8,
          }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(127,223,255,0.85) 0%, rgba(85,204,255,0.45) 55%, rgba(85,204,255,0) 80%)",
            filter: "blur(8px)",
          }}
        />
      )}

      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="overflow-visible"
      >
        {/* Outer frame circle */}
        <motion.circle
          cx="12"
          cy="12"
          r="10"
          animate={{
            stroke: isDark
              ? "rgba(125, 211, 252, 0.85)"
              : isHovered
                ? "rgba(85, 204, 255, 0.95)"
                : "rgba(115, 115, 115, 0.55)",
            filter: isDark
              ? isHovered
                ? "drop-shadow(0 0 7px rgba(125, 211, 252, 0.75))"
                : "drop-shadow(0 0 4px rgba(125, 211, 252, 0.45))"
              : isHovered
                ? "drop-shadow(0 0 6px rgba(85, 204, 255, 0.65))"
                : "none",
          }}
          transition={{ duration: 0.28 }}
        />

        {/* Pivot bulb group (bulb rotates slightly on hover while circle and rays stay static) */}
        <motion.g
          animate={{ rotate: isHovered ? 10 : 0 }}
          style={{ originX: "12px", originY: "12px" }}
          transition={{ type: "spring", stiffness: 180, damping: 14 }}
        >
          {/* Bulb glass body */}
          <motion.path
            d="M12 5a4.5 4.5 0 0 0-4.5 4.5c0 2.2 1.3 3.5 2 4.5h5c.7-1 2-2.3 2-4.5A4.5 4.5 0 0 0 12 5z"
            animate={{
              stroke: isDark
                ? "rgba(220, 245, 255, 0.95)"
                : isHovered
                  ? "rgba(85, 204, 255, 1.0)"
                  : "rgba(115, 115, 115, 0.8)",
              fill: isDark
                ? "rgba(125, 211, 252, 0.15)"
                : isHovered
                  ? "rgba(127, 223, 255, 0.12)"
                  : "rgba(0, 0, 0, 0)",
              filter: isDark
                ? isHovered
                  ? "drop-shadow(0 0 8px rgba(103, 232, 249, 0.85))"
                  : "drop-shadow(0 0 5px rgba(103, 232, 249, 0.55))"
                : isHovered
                  ? "drop-shadow(0 0 5px rgba(85, 204, 255, 0.75))"
                  : "none",
            }}
            transition={{ duration: 0.28 }}
          />

          {/* Bulb thread bases */}
          <motion.path
            d="M10.5 16h3M10.5 18h3M11 20h2"
            animate={{
              stroke: isDark
                ? "rgba(220, 245, 255, 0.95)"
                : isHovered
                  ? "rgba(85, 204, 255, 1.0)"
                  : "rgba(115, 115, 115, 0.8)",
            }}
            transition={{ duration: 0.28 }}
          />

          {/* Filament lines */}
          <motion.path
            d="M10 10.5a1 1 0 0 1 1.7-.7l.6.6c.1.1.2.2.3.2s.2-.1.3-.2l.6-.6A1 1 0 0 1 14 10.5"
            animate={{
              stroke: isDark
                ? "rgba(255, 255, 255, 1)"
                : isHovered
                  ? "rgba(255, 255, 255, 1)"
                  : "rgba(115, 115, 115, 0.85)",
              filter: isDark
                ? "drop-shadow(0 0 2px rgba(255, 255, 255, 1))"
                : isHovered
                  ? "drop-shadow(0 0 2px rgba(85, 204, 255, 1.0))"
                  : "none",
            }}
            transition={{ duration: 0.28 }}
          />
        </motion.g>

        {/* Radiating light rays inside the circle border */}
        <AnimatePresence>
          {isDark && (
            <>
              {/* Top ray */}
              <motion.line
                x1="12"
                y1="1.5"
                x2="12"
                y2="3"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 0.9 }}
                exit={{ scaleY: 0, opacity: 0 }}
                style={{ originX: "12px", originY: "3px" }}
                transition={{ duration: 0.2 }}
                stroke="rgba(103, 232, 249, 0.9)"
              />
              {/* Left-top ray */}
              <motion.line
                x1="4.5"
                y1="4.5"
                x2="5.5"
                y2="5.5"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.9 }}
                exit={{ scale: 0, opacity: 0 }}
                style={{ originX: "5.5px", originY: "5.5px" }}
                transition={{ duration: 0.2 }}
                stroke="rgba(103, 232, 249, 0.9)"
              />
              {/* Right-top ray */}
              <motion.line
                x1="19.5"
                y1="4.5"
                x2="18.5"
                y2="5.5"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.9 }}
                exit={{ scale: 0, opacity: 0 }}
                style={{ originX: "18.5px", originY: "5.5px" }}
                transition={{ duration: 0.2 }}
                stroke="rgba(103, 232, 249, 0.9)"
              />
              {/* Left ray */}
              <motion.line
                x1="1.5"
                y1="12"
                x2="3"
                y2="12"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 0.9 }}
                exit={{ scaleX: 0, opacity: 0 }}
                style={{ originX: "3px", originY: "12px" }}
                transition={{ duration: 0.2 }}
                stroke="rgba(103, 232, 249, 0.9)"
              />
              {/* Right ray */}
              <motion.line
                x1="21"
                y1="12"
                x2="22.5"
                y2="12"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 0.9 }}
                exit={{ scaleX: 0, opacity: 0 }}
                style={{ originX: "21px", originY: "12px" }}
                transition={{ duration: 0.2 }}
                stroke="rgba(103, 232, 249, 0.9)"
              />
            </>
          )}
        </AnimatePresence>

        {/* Hover emitted snowflakes */}
        {hoverParticles.map((p) => (
          <g
            key={p.id}
            style={{
              transform: `translate(${p.x}px, ${p.y}px) rotate(${p.rotation}rad)`,
              transformOrigin: "center",
            }}
          >
            <line
              x1="-2.5"
              y1="0"
              x2="2.5"
              y2="0"
              stroke={
                isDark ? `rgba(220, 245, 255, ${p.opacity})` : `rgba(85, 204, 255, ${p.opacity})`
              }
              strokeWidth="0.8"
            />
            <line
              x1="0"
              y1="-2.5"
              x2="0"
              y2="2.5"
              stroke={
                isDark ? `rgba(220, 245, 255, ${p.opacity})` : `rgba(85, 204, 255, ${p.opacity})`
              }
              strokeWidth="0.8"
            />
            <line
              x1="-1.8"
              y1="-1.8"
              x2="1.8"
              y2="1.8"
              stroke={
                isDark
                  ? `rgba(103, 232, 249, ${p.opacity * 0.8})`
                  : `rgba(0, 153, 255, ${p.opacity * 0.8})`
              }
              strokeWidth="0.8"
            />
            <line
              x1="-1.8"
              y1="1.8"
              x2="1.8"
              y2="-1.8"
              stroke={
                isDark
                  ? `rgba(103, 232, 249, ${p.opacity * 0.8})`
                  : `rgba(0, 153, 255, ${p.opacity * 0.8})`
              }
              strokeWidth="0.8"
            />
          </g>
        ))}
      </svg>
    </motion.button>
  );
}

const SnowflakeIcon = ({
  size,
  className,
  strokeWidth = 2.5,
}: {
  size: number;
  className?: string;
  strokeWidth?: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    className={className}
  >
    <path d="M12 2v20" />
    <path d="M2 12h20" />
    <path d="M5 5l14 14" />
    <path d="M19 5L5 19" />
    <path d="m9 4 3 3-3 3" />
    <path d="m15 4-3 3 3 3" />
    <path d="m15 20-3-3 3-3" />
    <path d="m9 20 3-3-3-3" />
  </svg>
);

interface LogoWithSnowProps {
  isDark: boolean;
}

function LogoWithSnow({ isDark }: LogoWithSnowProps) {
  const [isHovered, setIsHovered] = useState(false);

  const particles = useMemo(() => {
    const list = [];
    for (let i = 0; i < 21; i++) {
      // Reduced particle count by 10% (from 24 to 21)
      const r = Math.random();
      let type: "tiny" | "medium" | "large" = "tiny";
      let size = 1.5;
      if (r > 0.8) {
        if (r > 0.95) {
          type = "large";
          size = Math.random() * 1.5 + 6; // 6-7.5px
        } else {
          type = "medium";
          size = Math.random() * 1.3 + 3.2; // 3.2-4.5px
        }
      } else {
        type = "tiny";
        size = Math.random() * 0.8 + 1.2; // 1.2-2.0px
      }

      list.push({
        id: i,
        type,
        size,
        startX: Math.random() * 95 + 2.5,
        endXOffset: (Math.random() - 0.5) * 12,
        duration: Math.random() * 2.8 + 2.8, // Slightly slower, more elegant movement
        delay: -Math.random() * 5.6,
        swayDuration: Math.random() * 1.8 + 1.8,
        swayOffset: (Math.random() - 0.5) * 6,
        rotateDuration: Math.random() * 3.5 + 3.5,
        rotateDirection: Math.random() > 0.5 ? 360 : -360,
        opacity: type === "tiny" ? Math.random() * 0.3 + 0.35 : Math.random() * 0.25 + 0.55,
      });
    }
    return list;
  }, []);

  const sparklesList = [
    { id: 1, x: "28%", y: "16%", delay: 1.2, repeatDelay: 6.5 },
    { id: 2, x: "58%", y: "36%", delay: 3.5, repeatDelay: 8.0 },
    { id: 3, x: "85%", y: "22%", delay: 5.8, repeatDelay: 7.2 },
  ];

  return (
    <motion.a
      href="#"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex items-center justify-start h-9 w-[160px] relative select-none cursor-pointer overflow-visible"
      style={{ contentVisibility: "auto" } as React.CSSProperties}
    >
      {/* 1. Backdrop Soft Icy Aura Glow */}
      <motion.div
        className="absolute inset-0 -m-4 rounded-full pointer-events-none select-none blur-xl"
        animate={{
          background: isDark
            ? isHovered
              ? "radial-gradient(circle, rgba(160,225,255,0.14) 0%, rgba(127,223,255,0.04) 55%, rgba(127,223,255,0) 80%)"
              : "radial-gradient(circle, rgba(160,225,255,0.09) 0%, rgba(127,223,255,0.02) 55%, rgba(127,223,255,0) 80%)"
            : isHovered
              ? "radial-gradient(circle, rgba(127,223,255,0.12) 0%, rgba(145,212,255,0.03) 55%, rgba(145,212,255,0) 80%)"
              : "radial-gradient(circle, rgba(127,223,255,0.07) 0%, rgba(145,212,255,0.01) 55%, rgba(145,212,255,0) 80%)",
          scale: isHovered ? [1, 1.04, 1] : 1,
        }}
        transition={{
          scale: { repeat: Infinity, duration: 4, ease: "easeInOut" },
        }}
      />

      {/* 2. Unified SVG Canvas */}
      <svg
        className="w-full h-full overflow-visible z-10 select-none pointer-events-none"
        viewBox="0 0 160 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Icy typography text body gradient */}
          {/* Icy typography text body gradient */}
          <linearGradient id="ice-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#e2f5ff" />
            <stop offset="70%" stopColor="#a3ddff" />
            <stop offset="100%" stopColor="#6ec8ff" />
          </linearGradient>

          {/* Snow cap fluffy body gradient */}
          <linearGradient id="snow-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#f2f9ff" />
            <stop offset="100%" stopColor="#bedeff" />
          </linearGradient>

          {/* Icicle drip gradient (transparency + light refraction stops) */}
          <linearGradient id="drip-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#bce5ff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#6dc6ff" stopOpacity="0.15" />
          </linearGradient>

          {/* Orange-to-gold gradient with frosty glow for brackets */}
          <linearGradient id="bracket-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff782b" />
            <stop offset="100%" stopColor="#ffae19" />
          </linearGradient>

          {/* Displacement map filter for carved icy edges (+15% sharper texture) */}
          <filter id="ice-edge" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.15" numOctaves="3" result="noise" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="1.45"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          {/* Blur filter for soft snow shadows */}
          <filter id="snow-shadow-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.6" />
          </filter>

          {/* Text glow drop shadow */}
          <filter id="text-shadow-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="1.5"
              stdDeviation="1.2"
              floodColor="#001833"
              floodOpacity={isDark ? "0.65" : "0.25"}
            />
          </filter>
        </defs>

        {/* ============================================================== */}
        {/* SECTION A: CODE BRACKETS (LUCIDE CODE2 EQUIVALENT) */}
        {/* ============================================================== */}
        <g
          transform="translate(4, 6) scale(1.05)"
          stroke="url(#bracket-grad)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          {/* Left Bracket */}
          <path d="M6 8v8H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2z" />
          {/* Right Bracket */}
          <path d="M18 16V8h2a2 2 0 0 1 2-2v4a2 2 0 0 1-2 2h-2z" />
          {/* Slash */}
          <path d="m14.5 4-5 16" />
        </g>

        {/* Code Brackets Snow Accumulation (Slight overlay) */}
        <g filter="url(#ice-edge)">
          {/* Snow on Left bracket */}
          <path d="M 6.8 14.2 Q 9 12.8 11.2 13.8 Z" fill="url(#snow-grad)" />
          <path d="M 6.8 14.2 Q 9 12.8 11.2 13.8" stroke="#ffffff" strokeWidth="0.4" fill="none" />
          {/* Snow on Right bracket */}
          <path d="M 23.8 14.2 Q 26 12.8 28.2 13.8 Z" fill="url(#snow-grad)" />
          <path
            d="M 23.8 14.2 Q 26 12.8 28.2 13.8"
            stroke="#ffffff"
            strokeWidth="0.4"
            fill="none"
          />
          {/* Snow on Slash tip */}
          <path d="M 18 10 Q 19.5 8.8 21 9.8 Z" fill="url(#snow-grad)" />
        </g>

        {/* ============================================================== */}
        {/* SECTION B: TYPOGRAPHY (frosty.dev) CARVED FROM ICE */}
        {/* ============================================================== */}

        {/* 1. Deep contrasting backdrop shadow stroke (for readability) */}
        <g filter="url(#text-shadow-filter)">
          <text
            x="35"
            y="25"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="20px"
            fill="none"
            stroke={isDark ? "rgba(5, 15, 30, 0.9)" : "rgba(10, 30, 50, 0.45)"}
            strokeWidth="3.2"
            strokeLinejoin="round"
          >
            f
          </text>
          <text
            x="46"
            y="25"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="20px"
            fill="none"
            stroke={isDark ? "rgba(5, 15, 30, 0.9)" : "rgba(10, 30, 50, 0.45)"}
            strokeWidth="3.2"
            strokeLinejoin="round"
          >
            r
          </text>
          <text
            x="55"
            y="25"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="20px"
            fill="none"
            stroke={isDark ? "rgba(5, 15, 30, 0.9)" : "rgba(10, 30, 50, 0.45)"}
            strokeWidth="3.2"
            strokeLinejoin="round"
          >
            o
          </text>
          <text
            x="67"
            y="25"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="20px"
            fill="none"
            stroke={isDark ? "rgba(5, 15, 30, 0.9)" : "rgba(10, 30, 50, 0.45)"}
            strokeWidth="3.2"
            strokeLinejoin="round"
          >
            s
          </text>
          <text
            x="77"
            y="25"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="20px"
            fill="none"
            stroke={isDark ? "rgba(5, 15, 30, 0.9)" : "rgba(10, 30, 50, 0.45)"}
            strokeWidth="3.2"
            strokeLinejoin="round"
          >
            t
          </text>
          <text
            x="85"
            y="25"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="20px"
            fill="none"
            stroke={isDark ? "rgba(5, 15, 30, 0.9)" : "rgba(10, 30, 50, 0.45)"}
            strokeWidth="3.2"
            strokeLinejoin="round"
          >
            y
          </text>
          <text
            x="97"
            y="25"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="20px"
            fill="none"
            stroke={isDark ? "rgba(5, 15, 30, 0.9)" : "rgba(10, 30, 50, 0.45)"}
            strokeWidth="3.2"
            strokeLinejoin="round"
          >
            .
          </text>
          <text
            x="102"
            y="25"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="20px"
            fill="none"
            stroke={isDark ? "rgba(5, 15, 30, 0.9)" : "rgba(10, 30, 50, 0.45)"}
            strokeWidth="3.2"
            strokeLinejoin="round"
          >
            d
          </text>
          <text
            x="114"
            y="25"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="20px"
            fill="none"
            stroke={isDark ? "rgba(5, 15, 30, 0.9)" : "rgba(10, 30, 50, 0.45)"}
            strokeWidth="3.2"
            strokeLinejoin="round"
          >
            e
          </text>
          <text
            x="125"
            y="25"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="20px"
            fill="none"
            stroke={isDark ? "rgba(5, 15, 30, 0.9)" : "rgba(10, 30, 50, 0.45)"}
            strokeWidth="3.2"
            strokeLinejoin="round"
          >
            v
          </text>
        </g>

        {/* 2. Frosted glass gradient fill (with displacement mapping for carved edge effect) */}
        <g filter="url(#ice-edge)">
          <text
            x="35"
            y="25"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="20px"
            fill="url(#ice-grad)"
          >
            f
          </text>
          <text
            x="46"
            y="25"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="20px"
            fill="url(#ice-grad)"
          >
            r
          </text>
          <text
            x="55"
            y="25"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="20px"
            fill="url(#ice-grad)"
          >
            o
          </text>
          <text
            x="67"
            y="25"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="20px"
            fill="url(#ice-grad)"
          >
            s
          </text>
          <text
            x="77"
            y="25"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="20px"
            fill="url(#ice-grad)"
          >
            t
          </text>
          <text
            x="85"
            y="25"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="20px"
            fill="url(#ice-grad)"
          >
            y
          </text>
          <text
            x="97"
            y="25"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="20px"
            fill="url(#ice-grad)"
          >
            .
          </text>
          <text
            x="102"
            y="25"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="20px"
            fill="url(#ice-grad)"
          >
            d
          </text>
          <text
            x="114"
            y="25"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="20px"
            fill="url(#ice-grad)"
          >
            e
          </text>
          <text
            x="125"
            y="25"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="20px"
            fill="url(#ice-grad)"
          >
            v
          </text>
        </g>

        {/* 3. Ultra-fine white stroke for crystalline reflections (increased opacity & width for contrast) */}
        <g>
          <text
            x="35"
            y="25"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="20px"
            fill="none"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="0.6"
          >
            f
          </text>
          <text
            x="46"
            y="25"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="20px"
            fill="none"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="0.6"
          >
            r
          </text>
          <text
            x="55"
            y="25"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="20px"
            fill="none"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="0.6"
          >
            o
          </text>
          <text
            x="67"
            y="25"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="20px"
            fill="none"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="0.6"
          >
            s
          </text>
          <text
            x="77"
            y="25"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="20px"
            fill="none"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="0.6"
          >
            t
          </text>
          <text
            x="85"
            y="25"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="20px"
            fill="none"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="0.6"
          >
            y
          </text>
          <text
            x="97"
            y="25"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="20px"
            fill="none"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="0.6"
          >
            .
          </text>
          <text
            x="102"
            y="25"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="20px"
            fill="none"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="0.6"
          >
            d
          </text>
          <text
            x="114"
            y="25"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="20px"
            fill="none"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="0.6"
          >
            e
          </text>
          <text
            x="125"
            y="25"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="20px"
            fill="none"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="0.6"
          >
            v
          </text>
        </g>

        {/* 4. Delicate internal frozen cracks */}
        <g opacity="0.5" strokeLinecap="round">
          {/* Crack in o */}
          <path
            d="M 60 16 L 63 19.5 L 61.5 23"
            stroke={isDark ? "#d5efff" : "#55bbee"}
            strokeWidth="0.45"
            fill="none"
          />
          {/* Crack in y */}
          <path
            d="M 88 19 L 91 22.5 L 89 25"
            stroke={isDark ? "#d5efff" : "#55bbee"}
            strokeWidth="0.45"
            fill="none"
          />
          {/* Crack in d */}
          <path
            d="M 106 17 L 109 20.5 L 107.5 24"
            stroke={isDark ? "#d5efff" : "#55bbee"}
            strokeWidth="0.45"
            fill="none"
          />
        </g>

        {/* 5. Tiny Ice Crystal Highlights (Visible on close inspection) */}
        <g fill="#ffffff" opacity="0.9" filter="url(#ice-edge)">
          {/* crystal on f */}
          <path d="M 38 14 L 39 12.2 L 40 14 L 39 15.8 Z" />
          {/* crystal on o */}
          <path d="M 62 20.5 L 62.8 19 L 63.6 20.5 L 62.8 22 Z" />
          {/* crystal on y */}
          <path d="M 87 22.5 L 87.8 21.2 L 88.6 22.5 L 87.8 23.8 Z" />
          {/* crystal on d */}
          <path d="M 104 21.5 L 104.8 20 L 105.6 21.5 L 104.8 23 Z" />
          {/* crystal on v */}
          <path d="M 129 20.5 L 129.8 19 L 130.6 20.5 L 129.8 22 Z" />
        </g>

        {/* ============================================================== */}
        {/* SECTION C: FROZEN DRIPS (REDUCED TO 3, DIVERSE LENGTHS, LIGHT REFRACTING) */}
        {/* ============================================================== */}
        <g filter="url(#ice-edge)" opacity="0.8">
          {/* Drip under f - short */}
          <path
            d="M 39.5 26 C 39.5 27.5 40 31.2 40.3 31.2 C 40.6 31.2 41.1 27.5 41.1 26 Z"
            fill="url(#drip-grad)"
          />
          {/* Drip under y - long */}
          <path
            d="M 90.5 28 C 90.5 30 91 34.5 91.3 34.5 C 91.6 34.5 92 30 92 28 Z"
            fill="url(#drip-grad)"
          />
          {/* Drip under d - medium */}
          <path
            d="M 112.5 24 C 112.5 26 113 28.8 113.3 28.8 C 113.6 28.8 114 26 114 24 Z"
            fill="url(#drip-grad)"
          />
        </g>

        {/* ============================================================== */}
        {/* SECTION D: SNOW CAPS ON EVERY CHARACTER (+10-15% thickness, rounded mounds) */}
        {/* ============================================================== */}
        <g filter="url(#ice-edge)">
          {/* Soft blurred drop shadow for depth (resting illusion) */}
          <g
            filter="url(#snow-shadow-blur)"
            opacity={isDark ? "0.65" : "0.3"}
            transform="translate(0, 1.1)"
          >
            {/* f */}
            <path
              d="M 32.5 8.5 C 32.5 4.8 35 4 37 4.2 C 39 4.5 41.5 6.5 41.8 8.8 C 41 8 38 8.2 32.5 8.5 Z"
              fill="#000715"
            />
            {/* r */}
            <path
              d="M 45 13.8 C 45 10.5 47.5 9.8 49.5 10.5 C 51.5 11.2 53 11 53.5 13 C 53.5 14.2 52.5 14.8 52 14.8 C 49 13.8 47 14.2 45 13.8 Z"
              fill="#000715"
            />
            {/* o */}
            <path
              d="M 54.2 14.2 C 54.2 10.2 57 9 59.5 9.5 C 62 10 64 9 65.8 11.2 C 66.5 12.5 65.5 14.2 64.5 14.5 C 60.5 13.2 57 14.8 54.2 14.2 Z"
              fill="#000715"
            />
            {/* s */}
            <path
              d="M 66.2 14.2 C 66.2 11.2 69 10 71 10.5 C 73 11 74.5 10.5 75.2 12.5 C 75.2 13.8 74 14.8 73 14.5 C 70 13.5 68 14.8 66.2 14.2 Z"
              fill="#000715"
            />
            {/* t */}
            <path
              d="M 76.5 7.5 C 76.5 5.2 78.5 4.5 80.5 5.5 C 81 7 80.5 8.5 76.5 7.5 Z"
              fill="#000715"
            />
            {/* y Left */}
            <path d="M 83 14 C 83 11.5 85 11 86.8 12.5 Z" fill="#000715" />
            {/* y Right */}
            <path d="M 89.2 14 C 89.2 11.5 91.5 11 93.2 12.5 Z" fill="#000715" />
            {/* . */}
            <path
              d="M 96.5 24.2 C 96.5 22.8 98.5 22.8 98.7 24.2 C 98.7 25 96.5 25 96.5 24.2 Z"
              fill="#000715"
            />
            {/* d body */}
            <path
              d="M 101.5 14.2 C 101.5 11.2 104 10.5 106 11 C 107.5 11.5 108.5 13 108.5 14.2 Z"
              fill="#000715"
            />
            {/* d ascender */}
            <path
              d="M 111 7.5 C 111 5.2 113 4.5 115 5.5 C 115.5 7 115 8.5 111 7.5 Z"
              fill="#000715"
            />
            {/* e */}
            <path
              d="M 113.8 14.2 C 113.8 11.2 117 10 119.5 10.5 C 122 11 123.5 12.5 123 14 C 119.5 13 117.5 14.5 113.8 14.2 Z"
              fill="#000715"
            />
            {/* v Left */}
            <path d="M 123.5 14 Q 126 11.5 128 13.5 Z" fill="#000715" />
            {/* v Right */}
            <path d="M 130.5 14 Q 133 11.5 135 13.5 Z" fill="#000715" />
          </g>

          {/* Core Snow Cap Bodies (Uneven mounds, 10-15% thicker) */}
          <g>
            {/* f - thick puffy mound */}
            <path
              d="M 32.5 8.5 C 32.5 4.8 35 4 37 4.2 C 39 4.5 41.5 6.5 41.8 8.8 C 41 8 38 8.2 32.5 8.5 Z"
              fill="url(#snow-grad)"
            />
            {/* r - rounded mound */}
            <path
              d="M 45 13.8 C 45 10.5 47.5 9.8 49.5 10.5 C 51.5 11.2 53 11 53.5 13 C 53.5 14.2 52.5 14.8 52 14.8 C 49 13.8 47 14.2 45 13.8 Z"
              fill="url(#snow-grad)"
            />
            {/* o - double mound left/right */}
            <path
              d="M 54.2 14.2 C 54.2 10.2 57 9 59.5 9.5 C 62 10 64 9 65.8 11.2 C 66.5 12.5 65.5 14.2 64.5 14.5 C 60.5 13.2 57 14.8 54.2 14.2 Z"
              fill="url(#snow-grad)"
            />
            {/* s - double mound */}
            <path
              d="M 66.2 14.2 C 66.2 11.2 69 10 71 10.5 C 73 11 74.5 10.5 75.2 12.5 C 75.2 13.8 74 14.8 73 14.5 C 70 13.5 68 14.8 66.2 14.2 Z"
              fill="url(#snow-grad)"
            />
            {/* t */}
            <path
              d="M 76.5 7.5 C 76.5 5.2 78.5 4.5 80.5 5.5 C 81 7 80.5 8.5 76.5 7.5 Z"
              fill="url(#snow-grad)"
            />
            {/* y Left */}
            <path d="M 83 14 C 83 11.5 85 11 86.8 12.5 Z" fill="url(#snow-grad)" />
            {/* y Right */}
            <path d="M 89.2 14 C 89.2 11.5 91.5 11 93.2 12.5 Z" fill="url(#snow-grad)" />
            {/* . */}
            <path
              d="M 96.5 24.2 C 96.5 22.8 98.5 22.8 98.7 24.2 C 98.7 25 96.5 25 96.5 24.2 Z"
              fill="url(#snow-grad)"
            />
            {/* d body */}
            <path
              d="M 101.5 14.2 C 101.5 11.2 104 10.5 106 11 C 107.5 11.5 108.5 13 108.5 14.2 Z"
              fill="url(#snow-grad)"
            />
            {/* d ascender */}
            <path
              d="M 111 7.5 C 111 5.2 113 4.5 115 5.5 C 115.5 7 115 8.5 111 7.5 Z"
              fill="url(#snow-grad)"
            />
            {/* e - double curve */}
            <path
              d="M 113.8 14.2 C 113.8 11.2 117 10 119.5 10.5 C 122 11 123.5 12.5 123 14 C 119.5 13 117.5 14.5 113.8 14.2 Z"
              fill="url(#snow-grad)"
            />
            {/* v Left */}
            <path d="M 123.5 14 Q 126 11.5 128 13.5 Z" fill="url(#snow-grad)" />
            {/* v Right */}
            <path d="M 130.5 14 Q 133 11.5 135 13.5 Z" fill="url(#snow-grad)" />
          </g>

          {/* Upper Crisp White Highlights */}
          <g stroke="#ffffff" strokeWidth="0.45" fill="none">
            <path d="M 32.5 8.5 C 32.5 4.8 35 4 37 4.2" />
            <path d="M 45 13.8 C 45 10.5 47.5 9.8 49.5 10.5" />
            <path d="M 54.2 14.2 C 54.2 10.2 57 9 59.5 9.5" />
            <path d="M 66.2 14.2 C 66.2 11.2 69 10 71 10.5" />
            <path d="M 76.5 7.5 C 76.5 5.2 78.5 4.5 80.5 5.5" />
            <path d="M 83 14 Q 85 11 86.8 12.5" />
            <path d="M 89.2 14 Q 91.5 11 93.2 12.5" />
            <path d="M 96.5 24.2 C 96.5 22.8 98.5 22.8 98.7 24.2" strokeWidth="0.3" />
            <path d="M 101.5 14.2 C 101.5 11.2 104 10.5 106 11" />
            <path d="M 111 7.5 C 111 5.2 113 4.5 115 5.5" />
            <path d="M 113.8 14.2 C 113.8 11.2 117 10 119.5 10.5" />
            <path d="M 123.5 14 Q 126 11.5 128 13.5" />
            <path d="M 130.5 14 Q 133 11.5 135 13.5" />
          </g>
        </g>
      </svg>

      {/* 3. Localized Falling Snow Particle Layer */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute pointer-events-none select-none z-20 flex items-center justify-center"
          style={{
            left: `${p.startX}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: [-12, 48],
            x: [0, p.endXOffset, 0],
            rotate: [0, p.rotateDirection],
            opacity:
              p.type === "tiny"
                ? [p.opacity * 0.4, p.opacity, p.opacity * 0.4] // occasional twinkling crystal particles
                : p.opacity,
          }}
          transition={{
            y: {
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
            },
            x: {
              duration: p.swayDuration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            },
            rotate: {
              duration: p.rotateDuration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
            },
            opacity:
              p.type === "tiny"
                ? { duration: Math.random() * 1.2 + 0.8, repeat: Infinity, ease: "easeInOut" }
                : undefined,
          }}
        >
          {p.type === "large" ? (
            <SnowflakeIcon
              size={p.size}
              className={isDark ? "text-blue-100/90" : "text-blue-300/80"}
            />
          ) : p.type === "medium" ? (
            <SnowflakeIcon
              size={p.size}
              strokeWidth={1.8}
              className={isDark ? "text-blue-100/80" : "text-blue-300/70"}
            />
          ) : (
            <div
              className="w-full h-full rounded-full bg-white"
              style={{
                boxShadow: "0 0 2px rgba(255, 255, 255, 0.8)",
              }}
            />
          )}
        </motion.div>
      ))}

      {/* 4. Frost Sparkle Effects */}
      {sparklesList.map((s) => (
        <motion.svg
          key={s.id}
          className="absolute pointer-events-none select-none text-blue-200 dark:text-blue-100 z-25"
          style={{
            left: s.x,
            top: s.y,
            width: "10px",
            height: "10px",
            transform: "translate(-50%, -50%)",
          }}
          viewBox="0 0 24 24"
          fill="none"
          animate={{
            scale: [0, 1.3, 1.3, 0],
            opacity: [0, 0.98, 0.98, 0],
            rotate: [0, 90, 180, 270],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatDelay: s.repeatDelay,
            delay: s.delay,
            ease: "easeInOut",
          }}
        >
          <path
            d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z"
            fill="currentColor"
          />
        </motion.svg>
      ))}
    </motion.a>
  );
}

export function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  const isDark = theme === "dark";

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none">
      <nav
        onMouseLeave={() => setHoveredId(null)}
        className="pointer-events-auto mt-5 h-14 rounded-[22px] backdrop-blur-[20px] px-8 flex items-center gap-8 relative overflow-visible transition-all duration-[250ms] ease-out"
        style={{
          background: isDark ? "rgba(10, 10, 10, 0.55)" : "rgba(255, 255, 255, 0.55)",
          border: isDark
            ? "1px solid rgba(255, 255, 255, 0.08)"
            : "1px solid rgba(127, 223, 255, 0.12)",
          boxShadow: isDark ? "0 8px 40px rgba(0, 0, 0, 0.25)" : "0 10px 40px rgba(0, 0, 0, 0.08)",
        }}
      >
        <LogoWithSnow isDark={isDark} />

        <div className="hidden md:flex items-center gap-4 text-sm">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative px-3.5 py-1.5 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-all duration-[250ms] ease-out hover:brightness-110 rounded-full"
              onMouseEnter={() => setHoveredId(l.href)}
            >
              {hoveredId === l.href && (
                <motion.div
                  layoutId="nav-hover-pill"
                  className="absolute inset-0 rounded-full z-0"
                  style={{
                    background:
                      "linear-gradient(rgba(127, 223, 255, 0.08), rgba(127, 223, 255, 0.08)), rgba(255, 255, 255, 0.12)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    backdropFilter: "blur(10px)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 38,
                  }}
                />
              )}
              <span className="relative z-10">{l.label}</span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggleButton4 theme={theme} toggleTheme={toggleTheme} />

          <motion.a
            whileHover={{
              scale: 1.03,
              boxShadow: "0 0 14px rgba(127, 223, 255, 0.28)",
            }}
            whileTap={{ scale: 0.98 }}
            href="https://drive.google.com/file/d/1ZuFzLR2l0m0JdQsO0DLFuyDt8pwDNz3A/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Resume"
            className="text-sm px-4 py-1.5 rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-medium hover:opacity-90 transition inline-flex items-center justify-center relative z-10"
          >
            <FileText className="h-4 w-4 mr-2" />
            Resume
          </motion.a>
        </div>
      </nav>
    </div>
  );
}
