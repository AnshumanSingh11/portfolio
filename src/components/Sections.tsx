import { motion } from "motion/react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Cpu,
  Database,
  Globe,
  Brain,
  Terminal,
  GitBranch,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { useState, ReactNode } from "react";

// Reusable ScrollReveal wrapper
function ScrollReveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function About() {
  return (
    <section id="about" className="py-24 px-6 max-w-5xl mx-auto relative z-20">
      <ScrollReveal>
        <div
          className="rounded-[24px] border border-white/5 p-8 md:p-12 backdrop-blur-md"
          style={{
            background: "rgba(10, 10, 10, 0.45)",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
          }}
        >
          <p className="text-sm uppercase tracking-widest text-orange-500 font-semibold mb-3">
            About
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Turning ideas into real products.
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mt-10">
            <div className="md:col-span-2 space-y-5 text-neutral-300 text-base leading-relaxed">
              <p>
                I'm Anshuman Singh, a final-year Computer Science student at SRM Institute of
                Science and Technology.
              </p>
              <p>
                I enjoy building software products that solve practical problems, from project
                management systems to campus navigation tools.
              </p>
              <p>
                My interests include Full Stack Development, Artificial Intelligence, Computer
                Vision, and building technology-driven solutions that create real-world impact.
              </p>
              <p>
                I am currently focused on strengthening my software engineering fundamentals through
                Data Structures & Algorithms, modern web development, and hands-on project building.
              </p>
            </div>
            <div className="md:col-span-1">
              <motion.div
                whileHover={{ boxShadow: "0 0 20px rgba(127, 223, 255, 0.15)" }}
                transition={{ duration: 0.3 }}
                className="rounded-[20px] p-6 border backdrop-blur-[16px] transition-shadow duration-300"
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  borderColor: "rgba(127, 223, 255, 0.12)",
                }}
              >
                <div className="space-y-4">
                  <Stat label="University" value="SRM Institute of Science and Technology" />
                  <Stat label="Degree" value="B.Tech Computer Science" />
                  <Stat label="Year" value="Final Year" />
                  <Stat label="Interests" value="Full Stack • AI • Computer Vision • Startups" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col border-b border-white/10 pb-2.5 gap-1 last:border-b-0 last:pb-0">
      <span className="text-[#7FDFFF] text-xs uppercase tracking-wider font-semibold">{label}</span>
      <span className="text-white font-medium text-sm leading-relaxed">{value}</span>
    </div>
  );
}

const skills = [
  { icon: Terminal, title: "Languages", items: "Python, Java, JavaScript, HTML, CSS, SQL" },
  { icon: Globe, title: "Frontend", items: "React, Next.js, Tailwind CSS" },
  { icon: Cpu, title: "Backend", items: "Node.js, Express" },
  { icon: Database, title: "Database", items: "MySQL, PostgreSQL" },
  { icon: Brain, title: "AI / ML", items: "OpenCV, Machine Learning, Computer Vision" },
  { icon: GitBranch, title: "Tools", items: "Git, GitHub, VS Code, Figma" },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 px-6 max-w-5xl mx-auto relative z-20">
      <ScrollReveal>
        <p className="text-sm uppercase tracking-widest text-orange-500 font-semibold mb-3">
          Skills
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Tools of the trade.
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
          {skills.map((s, idx) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -6 }}
              className="group rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/50 backdrop-blur-sm dark:bg-neutral-900/60 p-5 hover:border-[#55CCFF]/50 transition cursor-pointer"
            >
              <s.icon className="h-5 w-5 text-[#55CCFF] mb-3" />
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">{s.title}</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">{s.items}</p>
            </motion.div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}

const projects = [
  {
    title: "FlowBoard",
    subtitle: "Scrum-Based Project Management System",
    desc: "A modern project management platform inspired by agile and Scrum methodologies. Built to help teams organize tasks, manage workflows, track sprint progress, and improve collaboration through a structured development process.",
    features: [
      "Sprint Planning",
      "Task Management",
      "Agile Workflow Support",
      "Team Collaboration",
      "Progress Tracking",
    ],
    tags: ["Java", "MySQL", "Software Engineering", "Scrum"],
    github: "https://github.com/AnshumanSingh11/FlowBoard.git",
  },
  {
    title: "Find My Campus",
    subtitle: "Campus Navigation System",
    desc: "A desktop-based campus navigation application designed to help students quickly locate classrooms, laboratories, departments, administrative offices, and campus facilities through an intuitive interface.",
    features: [
      "Building Locator",
      "Department Search",
      "Interactive Navigation",
      "Student-Friendly Interface",
      "Campus Information Access",
    ],
    tags: ["Java", "Swing", "GUI", "Desktop Application"],
    github: "https://github.com/AnshumanSingh11/Find-My-Campus.git",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-24 px-6 max-w-5xl mx-auto relative z-20">
      <ScrollReveal>
        <p className="text-sm uppercase tracking-widest text-orange-500 font-semibold mb-3">Work</p>
        <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Selected projects.
        </h2>
        <div className="grid md:grid-cols-2 gap-8 mt-10">
          {projects.map((p, idx) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              whileHover={{ y: -6 }}
              className="group rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/50 backdrop-blur-sm dark:bg-neutral-900/60 p-8 hover:border-[#55CCFF]/50 transition flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-semibold text-[#55CCFF] uppercase tracking-wider">
                  {p.subtitle}
                </span>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-1">
                  {p.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-4 leading-relaxed">
                  {p.desc}
                </p>

                <div className="mt-6">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400 mb-2">
                    Key Features
                  </h4>
                  <ul className="grid grid-cols-1 gap-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                    {p.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#55CCFF]" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 mt-6">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-150/70 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 border border-neutral-200/40 dark:border-neutral-750/30"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-200/60 dark:border-neutral-800/40">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 text-xs px-4 py-2 rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 transition font-semibold cursor-pointer w-full"
                >
                  <Github className="h-3.5 w-3.5" /> View Code
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}

export function WorkingOn() {
  const focuses = [
    {
      title: "Full Stack Development",
      icon: Globe,
      desc: "Building responsive web applications using modern frontend and backend technologies.",
    },
    {
      title: "Advanced React",
      icon: Sparkles,
      desc: "Improving state management, component architecture, and performance optimization.",
    },
    {
      title: "Next.js",
      icon: Cpu,
      desc: "Learning server components, routing, and production-grade web applications.",
    },
    {
      title: "Data Structures & Algorithms",
      icon: Terminal,
      desc: "Strengthening problem-solving skills for software engineering interviews.",
    },
    {
      title: "Backend Development",
      icon: Database,
      desc: "Designing APIs, authentication systems, and scalable server-side applications.",
    },
    {
      title: "System Design Fundamentals",
      icon: GitBranch,
      desc: "Learning scalability, architecture patterns, and distributed systems concepts.",
    },
  ];

  return (
    <section id="working-on" className="py-24 px-6 max-w-5xl mx-auto relative z-20">
      <ScrollReveal>
        <p className="text-sm uppercase tracking-widest text-orange-500 font-semibold mb-3">
          Current Focus
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Currently Learning & Building
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 mt-10">
          {focuses.map((f, idx) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -6 }}
              className="group rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/50 backdrop-blur-sm dark:bg-neutral-900/60 p-5 hover:border-[#55CCFF]/50 transition cursor-pointer"
            >
              <f.icon className="h-5 w-5 text-[#55CCFF] mb-3 animate-pulse" />
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">{f.title}</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    if (submitStatus !== "idle") {
      setSubmitStatus("idle");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Spam protection: basic validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      setSubmitStatus("error");
      return;
    }

    // Basic email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setSubmitStatus("error");
      return;
    }

    // Honeypot spam protection
    if (honeypot) {
      console.warn("Spam detected via honeypot.");
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setHoneypot("");
      return;
    }

    setIsSubmitting(true);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        // Fallback simulation for dev/testing if EmailJS keys are not provided
        console.warn("EmailJS variables not set. Simulating successful form submission.");
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setIsSubmitting(false);
        return;
      }

      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
            to_email: "anshuman1111.singh@gmail.com",
          },
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Failed to send email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-5xl mx-auto relative z-20">
      <ScrollReveal>
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/50 backdrop-blur-sm dark:bg-neutral-900/60 p-10 md:p-12 max-w-2xl mx-auto">
          <p className="text-sm uppercase tracking-widest text-orange-500 font-semibold mb-3 text-center">
            Contact
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight text-center">
            Let's Build Something Cool.
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mt-4 max-w-xl mx-auto text-center leading-relaxed">
            Have an opportunity, project idea, internship, collaboration, or just want to connect?
            Send me a message and I'll get back to you.
          </p>

          <div className="mt-6 flex flex-col items-center gap-2.5">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400">
              Connect With Me
            </h3>
            <div className="flex gap-4">
              <a
                href="https://github.com/AnshumanSingh11"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition duration-200 cursor-pointer"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/anshuman-singh-21776b287/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition duration-200 cursor-pointer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
                <span>LinkedIn</span>
              </a>
              <a
                href="mailto:anshuman1111.singh@gmail.com"
                className="flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition duration-200 cursor-pointer"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Honeypot field (hidden from users) */}
            <input
              type="text"
              name="botcheck"
              style={{ display: "none" }}
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="text-xs uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800/80 bg-white/40 dark:bg-neutral-950/30 backdrop-blur-sm text-neutral-950 dark:text-neutral-50 placeholder-neutral-450 focus:outline-none focus:ring-2 focus:ring-[#55CCFF]/40 focus:border-[#55CCFF]/60 transition-all duration-200"
                  placeholder="Your Name"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-xs uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800/80 bg-white/40 dark:bg-neutral-950/30 backdrop-blur-sm text-neutral-950 dark:text-neutral-50 placeholder-neutral-450 focus:outline-none focus:ring-2 focus:ring-[#55CCFF]/40 focus:border-[#55CCFF]/60 transition-all duration-200"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="subject"
                className="text-xs uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400"
              >
                Subject
              </label>
              <input
                id="subject"
                type="text"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800/80 bg-white/40 dark:bg-neutral-950/30 backdrop-blur-sm text-neutral-950 dark:text-neutral-50 placeholder-neutral-450 focus:outline-none focus:ring-2 focus:ring-[#55CCFF]/40 focus:border-[#55CCFF]/60 transition-all duration-200"
                placeholder="Project Idea / Internship / Say Hi"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="message"
                className="text-xs uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400"
              >
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800/80 bg-white/40 dark:bg-neutral-950/30 backdrop-blur-sm text-neutral-950 dark:text-neutral-50 placeholder-neutral-450 focus:outline-none focus:ring-2 focus:ring-[#55CCFF]/40 focus:border-[#55CCFF]/60 transition-all duration-200 resize-none"
                placeholder="Your Message..."
              />
            </div>

            <div className="pt-2">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 14px rgba(127, 223, 255, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-sm font-semibold hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>
            </div>

            {submitStatus === "success" && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-emerald-600 dark:text-emerald-400 text-sm font-medium mt-3 text-center"
              >
                Message sent successfully. I'll get back to you soon.
              </motion.p>
            )}
            {submitStatus === "error" && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-600 dark:text-red-400 text-sm font-medium mt-3 text-center"
              >
                Something went wrong. Please try again later.
              </motion.p>
            )}
          </form>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-neutral-500 mt-10">
          <span>© 2026 Anshuman Singh (Frosty)</span>
          <span className="hidden sm:inline text-neutral-600 dark:text-neutral-700">•</span>
          <div className="flex gap-3">
            <a
              href="https://github.com/AnshumanSingh11"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-800 dark:hover:text-neutral-300 transition duration-200 cursor-pointer"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/anshuman-singh-21776b287/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-800 dark:hover:text-neutral-300 transition duration-200 cursor-pointer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
