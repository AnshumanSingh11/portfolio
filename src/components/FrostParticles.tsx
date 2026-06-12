import { useEffect, useRef } from "react";

interface Meteor {
  x: number;
  y: number;
  width: number;
  length: number;
  vx: number;
  vy: number;
  baseOpacity: number;
  opacity: number;
  type: "small" | "medium" | "large" | "hero";
}

interface Snowflake {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  opacity: number;
  rotation: number;
  rotSpeed: number;
}

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  opacity: number;
  type: "dust" | "snowflake";
  rotation: number;
  rotSpeed: number;
}

interface BgStar {
  x: number;
  y: number;
  size: number;
  twinkleSpeed: number;
  phase: number;
}

export function FrostParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let heroMeteorTimeoutId: NodeJS.Timeout;

    const dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const fogPockets = [
      { x: width * 0.15, y: height * 0.25, r: Math.min(width, height) * 0.35, vx: 0.08, vy: -0.04 },
      { x: width * 0.75, y: height * 0.35, r: Math.min(width, height) * 0.45, vx: -0.05, vy: 0.06 },
      { x: width * 0.35, y: height * 0.75, r: Math.min(width, height) * 0.4, vx: 0.04, vy: -0.08 },
    ];

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      // Update fog pocket dimensions on resize
      if (fogPockets.length > 0) {
        fogPockets[0].r = Math.min(width, height) * 0.35;
        fogPockets[1].r = Math.min(width, height) * 0.45;
        fogPockets[2].r = Math.min(width, height) * 0.4;
      }
    };

    resizeCanvas();

    const meteors: Meteor[] = [];
    const snowflakes: Snowflake[] = [];
    const sparkles: Sparkle[] = [];
    const stars: BgStar[] = [];
    let frameIndex = 0;

    const checkIsDark = () => document.documentElement.classList.contains("dark");

    // Initialize background stars for dark mode
    const initStars = () => {
      stars.length = 0;
      const starCount = Math.floor((width * height) / 16000);
      for (let i = 0; i < Math.max(50, Math.min(120, starCount)); i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 0.8 + 0.4,
          twinkleSpeed: Math.random() * 0.015 + 0.005,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    initStars();

    // Create a meteor
    const initMeteor = (
      type: "small" | "medium" | "large" | "hero",
      spawnX?: number,
      spawnY?: number,
    ): Meteor => {
      let length = 0;
      let w = 0;
      let speed = 0;
      let baseOpacity = 0;

      if (type === "hero") {
        length = Math.random() * 130 + 250; // 250px - 380px length (cinematic)
        w = Math.random() * 3.0 + 5.0; // 5px - 8px width
        speed = Math.random() * 0.8 + 1.6; // Cinematic smooth speed
        baseOpacity = Math.random() * 0.1 + 0.15; // Opacity 0.15 - 0.25
      } else if (type === "large") {
        length = Math.random() * 100 + 250;
        w = Math.random() * 2 + 5;
        speed = Math.random() * 0.8 + 2.0;
        baseOpacity = Math.random() * 0.12 + 0.12;
      } else if (type === "medium") {
        length = Math.random() * 80 + 140;
        w = Math.random() * 1.5 + 3.0;
        speed = Math.random() * 0.6 + 1.3;
        baseOpacity = Math.random() * 0.12 + 0.1;
      } else {
        length = Math.random() * 40 + 80;
        w = Math.random() * 1.0 + 1.8;
        speed = Math.random() * 0.4 + 0.8;
        baseOpacity = Math.random() * 0.1 + 0.08;
      }

      const angle = (Math.random() * 10 + 30) * (Math.PI / 180);
      const vx = -speed * Math.cos(angle);
      const vy = speed * Math.sin(angle);

      const startX = spawnX !== undefined ? spawnX : Math.random() * (width + length);
      const startY = spawnY !== undefined ? spawnY : Math.random() * (height + 150) - 150;

      return {
        x: startX,
        y: startY,
        width: w,
        length,
        vx,
        vy,
        baseOpacity,
        opacity: spawnX !== undefined ? 0 : baseOpacity,
      };
    };

    const densityMap = { small: 12, medium: 5, large: 2 };

    for (let i = 0; i < densityMap.small; i++) {
      const m = initMeteor("small");
      m.opacity = m.baseOpacity * Math.random();
      meteors.push(m);
    }
    for (let i = 0; i < densityMap.medium; i++) {
      const m = initMeteor("medium");
      m.opacity = m.baseOpacity * Math.random();
      meteors.push(m);
    }
    for (let i = 0; i < densityMap.large; i++) {
      const m = initMeteor("large");
      m.opacity = m.baseOpacity * Math.random();
      meteors.push(m);
    }

    // Initialize independent snowflakes (30-40 snowflakes)
    for (let i = 0; i < 35; i++) {
      const size = Math.random() * 4 + 2;
      const speed = Math.random() * 0.25 + 0.15;
      const angle = (Math.random() * 10 + 30) * (Math.PI / 180);
      snowflakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        vx: -speed * Math.cos(angle),
        vy: speed * Math.sin(angle),
        opacity: Math.random() * 0.65 + 0.15,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.015,
      });
    }

    const triggerHeroSweep = () => {
      const startX = width + Math.random() * 150 + 50;
      const startY = -Math.random() * 100 - 50;
      meteors.push(initMeteor("hero", startX, startY));
      // Spawn every 12 to 18 seconds (12000ms to 18000ms)
      heroMeteorTimeoutId = setTimeout(triggerHeroSweep, Math.random() * 6000 + 12000);
    };

    heroMeteorTimeoutId = setTimeout(triggerHeroSweep, 12000);

    // Procedural Snowflake Drawer (Adaptive Light/Dark styling)
    const drawSnowflake = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      opacity: number,
      isDark: boolean,
    ) => {
      let strokeColor = "";
      if (isDark) {
        strokeColor =
          size > 4.5 ? `rgba(255, 255, 255, ${opacity})` : `rgba(220, 245, 255, ${opacity * 0.8})`;
      } else {
        // Light Mode: Use custom icy blue tones from style guide specs
        strokeColor =
          size >= 4.0
            ? `rgba(80, 160, 255, ${opacity * 0.55})` // Foreground flakes
            : `rgba(100, 180, 255, ${opacity * 0.35})`; // Distant flakes
      }

      c.strokeStyle = strokeColor;
      c.lineWidth = size > 4.5 ? 1.0 : 0.8;
      c.lineCap = "round";

      if (size < 4.0) {
        c.beginPath();
        c.moveTo(x - size, y);
        c.lineTo(x + size, y);
        c.moveTo(x, y - size);
        c.lineTo(x, y + size);
        c.stroke();
        return;
      }

      c.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = rotation + (i * Math.PI) / 3;
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);

        const endX = x + cosA * size;
        const endY = y + sinA * size;

        c.moveTo(x, y);
        c.lineTo(endX, endY);

        const tickDist = size * 0.58;
        const tickX = x + cosA * tickDist;
        const tickY = y + sinA * tickDist;
        const tickSize = size * 0.28;

        const tickAngle1 = angle + Math.PI / 4;
        const tickAngle2 = angle - Math.PI / 4;

        c.moveTo(tickX, tickY);
        c.lineTo(tickX + Math.cos(tickAngle1) * tickSize, tickY + Math.sin(tickAngle1) * tickSize);

        c.moveTo(tickX, tickY);
        c.lineTo(tickX + Math.cos(tickAngle2) * tickSize, tickY + Math.sin(tickAngle2) * tickSize);
      }
      c.stroke();
    };

    // Procedural "Frostbite Meteor" Shard Drawer (NO CAPSULE or ROUNDED rod geometry)
    const drawFrostMeteor = (c: CanvasRenderingContext2D, m: Meteor, isDark: boolean) => {
      const speed = Math.sqrt(m.vx * m.vx + m.vy * m.vy);
      const ux = m.vx / speed; // Travel vector unit x
      const uy = m.vy / speed;

      // Visibility ratios: light mode is set to ~82% opacity of dark mode for clear morning visibility
      const opacityScale = isDark ? 1.0 : 0.82;
      const glowScale = isDark ? 1.0 : 0.65;

      const currentOpacity = m.opacity * opacityScale;
      const currentWidth = m.width * (isDark ? 1.0 : 0.85);

      // Core white-blue (#DDF6FF) in dark, Icy blue (#7FDFFF) in light mode
      const colorCore = isDark
        ? `rgba(220, 245, 255, ${currentOpacity})`
        : `rgba(127, 223, 255, ${currentOpacity})`;

      // Outer cyan-blue glow (#38BDF8 / #55CCFF)
      const colorGlow = isDark
        ? `rgba(56, 189, 248, ${currentOpacity * 0.45 * glowScale})`
        : `rgba(85, 204, 255, ${currentOpacity * 0.55 * glowScale})`;

      const headX = m.x;
      const headY = m.y;
      const tailX = m.x - ux * m.length;
      const tailY = m.y - uy * m.length;

      // Perpendicular vectors for side vertices
      const lx = -uy;
      const ly = ux;
      const rx = uy;
      const ry = -ux;

      // Generate the jagged polygon path points
      const stepSize = 8;
      const numSegments = Math.floor(m.length / stepSize);
      const leftPoints: { x: number; y: number }[] = [];
      const rightPoints: { x: number; y: number }[] = [];

      for (let i = 0; i <= numSegments; i++) {
        const t = i / numSegments;

        let env = 0;
        if (t > 0.8) {
          env = (1.0 - t) / 0.2;
        } else {
          env = Math.pow(t / 0.8, 1.4);
        }

        const px = tailX + (headX - tailX) * t;
        const py = tailY + (headY - tailY) * t;

        const noise = Math.sin(i * 2.3) * (currentWidth * 0.22);
        const halfWidth = Math.max(0, currentWidth * env * 0.5 + noise);

        leftPoints.push({
          x: px + lx * halfWidth,
          y: py + ly * halfWidth,
        });
        rightPoints.push({
          x: px + rx * halfWidth,
          y: py + ry * halfWidth,
        });
      }

      // --- Layer 4: Sharp Triangular Mist Trail ---
      const trailLength = m.length * 1.5;
      const trailTipX = tailX - ux * trailLength;
      const trailTipY = tailY - uy * trailLength;

      const baseIndex = Math.floor(numSegments * 0.8);
      const baseL = leftPoints[baseIndex];
      const baseR = rightPoints[baseIndex];

      if (baseL && baseR) {
        c.beginPath();
        c.moveTo(baseL.x, baseL.y);
        c.lineTo(trailTipX, trailTipY);
        c.lineTo(baseR.x, baseR.y);
        c.closePath();

        const trailGrad = c.createLinearGradient(
          (baseL.x + baseR.x) / 2,
          (baseL.y + baseR.y) / 2,
          trailTipX,
          trailTipY,
        );
        trailGrad.addColorStop(0, `rgba(125, 211, 252, ${currentOpacity * 0.25 * glowScale})`);
        trailGrad.addColorStop(0.3, `rgba(56, 189, 248, ${currentOpacity * 0.08 * glowScale})`);
        trailGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

        c.fillStyle = trailGrad;
        c.fill();
      }

      // Procedural Shard Polygon Drawer
      const drawShardPath = (scale: number) => {
        c.beginPath();
        c.moveTo(headX, headY);

        for (let i = numSegments - 1; i >= 0; i--) {
          const pt = leftPoints[i];
          const px = tailX + (headX - tailX) * (i / numSegments);
          const py = tailY + (headY - tailY) * (i / numSegments);
          const dx = pt.x - px;
          const dy = pt.y - py;
          c.lineTo(px + dx * scale, py + dy * scale);
        }

        c.lineTo(tailX, tailY);

        for (let i = 1; i < numSegments; i++) {
          const pt = rightPoints[i];
          const px = tailX + (headX - tailX) * (i / numSegments);
          const py = tailY + (headY - tailY) * (i / numSegments);
          const dx = pt.x - px;
          const dy = pt.y - py;
          c.lineTo(px + dx * scale, py + dy * scale);
        }

        c.closePath();
      };

      // --- Layer 1: Sharp Outer Glow Shard ---
      drawShardPath(isDark ? 3.0 : 2.0);
      const glowGrad = c.createLinearGradient(headX, headY, tailX, tailY);
      glowGrad.addColorStop(0, colorGlow);
      glowGrad.addColorStop(0.5, `rgba(56, 189, 248, ${currentOpacity * 0.15 * glowScale})`);
      glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      c.fillStyle = glowGrad;
      c.fill();

      // --- Layer 2: Core Shard Polygon ---
      drawShardPath(1.0);
      const coreGrad = c.createLinearGradient(headX, headY, tailX, tailY);
      coreGrad.addColorStop(0, colorCore);
      coreGrad.addColorStop(
        0.35,
        isDark
          ? `rgba(127, 223, 255, ${currentOpacity * 0.95})`
          : `rgba(85, 204, 255, ${currentOpacity * 0.95})`,
      );
      coreGrad.addColorStop(1, "rgba(56, 189, 248, 0.05)");
      c.fillStyle = coreGrad;
      c.fill();

      // --- Layer 3: Internal Crystal Veins (butt caps for flat ends) ---
      c.beginPath();
      c.strokeStyle = isDark
        ? `rgba(255, 255, 255, ${currentOpacity * 0.85})`
        : `rgba(220, 245, 255, ${currentOpacity * 0.85})`;
      c.lineWidth = 0.8;
      c.lineCap = "butt";
      c.lineJoin = "miter";

      // Spine vein
      c.moveTo(headX, headY);
      c.lineTo(tailX, tailY);

      // Vein branches
      const bx1 = 0.707 * (-ux + uy);
      const by1 = 0.707 * (-uy - ux);
      const bx2 = 0.707 * (-ux - uy);
      const by2 = 0.707 * (-uy + ux);

      for (let i = 2; i < numSegments - 1; i++) {
        const t = i / numSegments;
        let env = 0;
        if (t > 0.8) {
          env = (1.0 - t) / 0.2;
        } else {
          env = Math.pow(t / 0.8, 1.4);
        }

        const px = tailX + (headX - tailX) * t;
        const py = tailY + (headY - tailY) * t;

        const branchLen = currentWidth * env * 0.35 * (1.0 + 0.35 * Math.sin(i * 1.85));

        if (branchLen > 0.5) {
          c.moveTo(px, py);
          c.lineTo(px + bx1 * branchLen, py + by1 * branchLen);
          c.moveTo(px, py);
          c.lineTo(px + bx2 * branchLen, py + by2 * branchLen);
        }
      }
      c.stroke();
    };

    // Mouse Movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      const mx = e.clientX;
      const my = e.clientY;
      const count = Math.floor(Math.random() * 4) + 2;

      for (let k = 0; k < count; k++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 80;
        const spX = mx + Math.cos(angle) * radius;
        const spY = my + Math.sin(angle) * radius;

        const vy = Math.random() * 0.38 + 0.12;
        const vx = vy * -(Math.random() * 0.4 + 0.8);

        sparkles.push({
          x: spX,
          y: spY,
          vx,
          vy,
          size: Math.random() * 3.2 + 1.2,
          life: 0,
          maxLife: Math.floor(Math.random() * 150 + 90),
          opacity: Math.random() * 0.6 + 0.2,
          type: Math.random() < 0.3 ? "snowflake" : "dust",
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.02,
        });
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    let scrollY = window.scrollY;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", () => {
      resizeCanvas();
      initStars();
    });

    const tick = () => {
      const isDark = checkIsDark();
      ctx.clearRect(0, 0, width, height);
      frameIndex++;

      // Calculate scroll percentage (0 to 1)
      const maxScroll = document.documentElement.scrollHeight - height || 1;
      const scrollPercent = Math.min(1, Math.max(0, scrollY / maxScroll));

      // 1. Draw Subtle Local Atmospheric Mist Pockets (Layer 3)
      if (isDark) {
        // Fog density factor: peaks in the middle (Skills section around 45%-60% scroll)
        // Rises from 0 (Hero) to 1.0 (Skills) and falls back to 0 (Contact/Footer)
        let densityFactor = 0;
        if (scrollPercent < 0.5) {
          densityFactor = scrollPercent * 2;
        } else {
          densityFactor = 2 * (1.0 - scrollPercent);
        }
        densityFactor = Math.sin((densityFactor * Math.PI) / 2);

        for (let i = 0; i < fogPockets.length; i++) {
          const fp = fogPockets[i];
          fp.x += fp.vx;
          fp.y += fp.vy;

          // Wrap margins
          if (fp.x < -fp.r) fp.x = width + fp.r;
          if (fp.x > width + fp.r) fp.x = -fp.r;
          if (fp.y < -fp.r) fp.y = height + fp.r;
          if (fp.y > height + fp.r) fp.y = -fp.r;

          const fpGrad = ctx.createRadialGradient(fp.x, fp.y, 0, fp.x, fp.y, fp.r);
          // Alternate pocket colors to blend cyan and white fog (2-5% opacity), scaled by scroll
          const cyanOpacity = 0.035 * densityFactor;
          const whiteOpacity = 0.025 * densityFactor;

          if (i % 2 === 0) {
            fpGrad.addColorStop(0, `rgba(127, 223, 255, ${cyanOpacity})`); // Cyan fog pocket (peaks at 3.5%)
          } else {
            fpGrad.addColorStop(0, `rgba(255, 255, 255, ${whiteOpacity})`); // White fog pocket (peaks at 2.5%)
          }
          fpGrad.addColorStop(0.6, "rgba(0, 0, 0, 0)");
          fpGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

          ctx.fillStyle = fpGrad;
          ctx.beginPath();
          ctx.arc(fp.x, fp.y, fp.r, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        // Light Mode uses original linear gradient mist
        const mistOpacity = 0.045;
        const mistGrad = ctx.createLinearGradient(0, 0, width, height);
        mistGrad.addColorStop(0, `rgba(230, 243, 255, ${mistOpacity})`);
        mistGrad.addColorStop(1, `rgba(184, 236, 255, ${mistOpacity})`);
        ctx.fillStyle = mistGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // Vignette effect (Dark Mode Only) to gently darken the corners and edges of the screen (10-15% opacity)
      if (isDark) {
        const vignetteGrad = ctx.createRadialGradient(
          width / 2,
          height / 2,
          Math.min(width, height) * 0.35,
          width / 2,
          height / 2,
          Math.max(width, height) * 0.9,
        );
        vignetteGrad.addColorStop(0, "rgba(0, 0, 0, 0)");
        vignetteGrad.addColorStop(1, "rgba(0, 0, 0, 0.14)"); // 14% opacity vignette with pure black
        ctx.fillStyle = vignetteGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Twinkling Background Stars (Dark Mode Only)
      if (isDark) {
        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];
          const starOpacity = 0.08 + 0.35 * Math.sin(frameIndex * s.twinkleSpeed + s.phase);
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(220, 245, 255, ${starOpacity})`;
          ctx.fill();
        }
      }

      // 3. Update and Draw Shard Meteors (Layer 1 - behind snowflakes)
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.vx;
        m.y += m.vy;

        if (m.y < 50 || m.x > width - 50) {
          m.opacity += (m.baseOpacity - m.opacity) * 0.04;
        } else if (m.y > height - 120 || m.x < 120) {
          m.opacity += (0 - m.opacity) * 0.05;
        } else {
          m.opacity += (m.baseOpacity - m.opacity) * 0.02;
        }

        if (
          m.y > height + m.length * 1.5 ||
          m.x < -m.length * 1.5 ||
          (m.opacity <= 0.005 && m.y > height - 200)
        ) {
          if (m.type === "hero") {
            meteors.splice(i, 1);
          } else {
            meteors[i] = initMeteor(m.type, width + 50, -50);
          }
          continue;
        }

        // Spawn trailing particles
        if (Math.random() < 0.16 && m.opacity > 0.05) {
          const t = Math.random();
          const pX = m.x - (m.vx / Math.sqrt(m.vx * m.vx + m.vy * m.vy)) * m.length * t;
          const pY = m.y - (m.vy / Math.sqrt(m.vx * m.vx + m.vy * m.vy)) * m.length * t;

          const pvx = m.vx * 0.45 + (Math.random() - 0.5) * 0.3;
          const pvy = m.vy * 0.45 + (Math.random() - 0.5) * 0.3;

          sparkles.push({
            x: pX,
            y: pY,
            vx: pvx,
            vy: pvy,
            size: Math.random() * 2.5 + 1.0,
            life: 0,
            maxLife: Math.floor(Math.random() * 110 + 90),
            opacity: m.opacity * 0.85,
            type: Math.random() < 0.28 ? "snowflake" : "dust",
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.025,
          });
        }

        drawFrostMeteor(ctx, m, isDark);
      }

      // 4. Update and Draw Independent Snowflakes (Layer 2 - above meteors)
      for (let i = 0; i < snowflakes.length; i++) {
        const sf = snowflakes[i];
        sf.x += sf.vx;
        sf.y += sf.vy;
        sf.rotation += sf.rotSpeed;

        if (sf.y > height + 10 || sf.x < -10) {
          if (Math.random() < 0.5) {
            sf.x = Math.random() * (width + 50);
            sf.y = -10;
          } else {
            sf.x = width + 10;
            sf.y = Math.random() * (height - 50);
          }
        }

        drawSnowflake(ctx, sf.x, sf.y, sf.size, sf.rotation, sf.opacity, isDark);
      }

      // 5. Update and Draw Interactive / Spawned Sparkles (Mist & Sparks)
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const sp = sparkles[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.life++;
        sp.rotation += sp.rotSpeed;

        const lifeRatio = sp.life / sp.maxLife;
        const opacity = sp.opacity * (1.0 - lifeRatio);

        if (sp.life >= sp.maxLife || sp.x < -10 || sp.y > height + 10) {
          sparkles.splice(i, 1);
          continue;
        }

        if (sp.type === "snowflake") {
          drawSnowflake(ctx, sp.x, sp.y, sp.size, sp.rotation, opacity, isDark);
        } else {
          ctx.beginPath();
          ctx.arc(sp.x, sp.y, sp.size * 0.55, 0, Math.PI * 2);
          ctx.fillStyle = isDark
            ? `rgba(220, 245, 255, ${opacity * 0.95})`
            : `rgba(80, 160, 255, ${opacity * 0.55})`; // Light Mode blue sparkles
          ctx.fill();

          if (isDark && sp.size > 2.0) {
            ctx.beginPath();
            ctx.arc(sp.x, sp.y, sp.size * 1.25, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(56, 189, 248, ${opacity * 0.22})`;
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(heroMeteorTimeoutId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10 w-full h-full" />
  );
}
