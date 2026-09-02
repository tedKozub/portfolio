"use client";

import { AnimatedBackground } from "@/components/animated-background";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Database,
  Globe,
  Server,
  Network,
  BrainCircuit,
  ChevronRight,
  Container,
} from "lucide-react";
import Link from "next/link";

/* ─── Reusable glass card wrapper ───────────────────────────────────── */
function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`glass-card transition-all duration-300 ${className}`}
      style={{ transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s" }}
    >
      {children}
    </div>
  );
}

/* ─── Focus pill ─────────────────────────────────────────────────────── */
function FocusPill({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <span className="glass-pill inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground/80">
      <Icon className="h-4 w-4 text-primary" />
      {label}
    </span>
  );
}

/* ─── Skill card ─────────────────────────────────────────────────────── */
function SkillCard({
  icon: Icon,
  title,
  items,
}: {
  icon: React.ElementType;
  title: string;
  items: string;
}) {
  return (
    <GlassCard className="p-6 text-center group">
      <div className="flex justify-center mb-4">
        <span
          className="inline-flex items-center justify-center w-12 h-12 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Icon className="h-6 w-6 text-primary" />
        </span>
      </div>
      <h3 className="font-semibold mb-2 text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{items}</p>
    </GlassCard>
  );
}

/* ─── Project card ───────────────────────────────────────────────────── */
function ProjectCard({
  icon: Icon,
  title,
  description,
  badges,
  githubHref,
  demoHref,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  badges: string[];
  githubHref?: string;
  demoHref?: string;
}) {
  return (
    <GlassCard className="p-6 flex flex-col h-full">
      {/* Icon area */}
      <div
        className="h-44 rounded-xl mb-5 flex items-center justify-center"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Icon className="h-12 w-12 text-muted-foreground/60" />
      </div>

      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-5 text-sm leading-relaxed flex-1">
        {description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {badges.map((b) => (
          <Badge
            key={b}
            variant="outline"
            className="text-xs border-white/10 text-muted-foreground"
          >
            {b}
          </Badge>
        ))}
      </div>

      <div className="flex gap-2">
        {githubHref ? (
          <Button asChild variant="outline" size="sm" className="border-white/10 bg-white/5 hover:bg-white/10">
            <Link href={githubHref} target="_blank">
              <Github className="h-4 w-4 mr-2" />
              Code
            </Link>
          </Button>
        ) : (
          <Button variant="outline" size="sm" disabled className="border-white/10">
            <Github className="h-4 w-4 mr-2" />
            Code
          </Button>
        )}
        {demoHref ? (
          <Button asChild variant="outline" size="sm" className="border-white/10 bg-white/5 hover:bg-white/10">
            <Link href={demoHref} target="_blank">
              <ExternalLink className="h-4 w-4 mr-2" />
              Demo
            </Link>
          </Button>
        ) : (
          <Button variant="outline" size="sm" disabled className="border-white/10">
            <ExternalLink className="h-4 w-4 mr-2" />
            Demo
          </Button>
        )}
      </div>
    </GlassCard>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <main className="min-h-screen relative">
      <AnimatedBackground />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Status pill */}
          <div className="flex justify-center mb-8">
            <span className="glass-pill inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-muted-foreground">
              <span
                className="w-2 h-2 rounded-full bg-primary animate-pulse"
                style={{ boxShadow: "0 0 6px oklch(0.68 0.148 162)" }}
              />
              Available for opportunities
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-balance tracking-tight">
            Tadeáš Kozub
          </h1>

          {/* Role badge – liquid glass */}
          <div className="flex justify-center mb-6">
            <span
              className="glass-pill px-6 py-2.5 text-xl md:text-2xl font-semibold"
              style={{
                background: "rgba(255,255,255,0.07)",
                color: "oklch(0.68 0.148 162)",
              }}
            >
              DevOps Engineer
            </span>
          </div>

          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty leading-relaxed">
            Building reliable infrastructure and exploring the intersection of
            DevOps, networking, and AI — currently deep-diving into RAG
            pipelines and vector databases.
          </p>

          {/* Focus pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <FocusPill icon={Server} label="DevOps & Infrastructure" />
            <FocusPill icon={Network} label="Networking" />
            <FocusPill icon={BrainCircuit} label="RAG & Vector DBs" />
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-base px-8 bg-primary/90 hover:bg-primary text-primary-foreground shadow-lg"
              style={{ boxShadow: "0 4px 24px oklch(0.68 0.148 162 / 0.35)" }}
              asChild
            >
              <Link href="#projects" className="flex items-center">
                View My Work
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-base px-8 border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md"
              asChild
            >
              <Link href="#contact" className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                Get In Touch
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            About Me
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-xl mx-auto">
            A bit about who I am and what I work with
          </p>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Bio */}
            <div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                I'm a fulltime DevOps engineer focused on building scalable,
                reliable systems. I care about automation, clean infrastructure,
                and making deployments boring — in the best possible way.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Outside of work I'm exploring RAG architectures and vector
                databases, diving deep into networking, and occasionally
                shipping side projects — from Rust backends to React apps.
              </p>
              {/* Skill badges */}
              <div className="flex flex-wrap gap-2">
                {[
                  "Kubernetes",
                  "Terraform",
                  "Ansible",
                  "Docker",
                  "CI/CD",
                  "Networking",
                  "Python",
                  "Rust",
                  "Go",
                  "Vector DBs",
                  "RAG",
                  "PostgreSQL",
                ].map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="text-sm px-3 py-1 bg-white/6 border border-white/10 text-foreground/80"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Skill cards grid */}
            <div className="grid grid-cols-2 gap-4">
              <SkillCard
                icon={Server}
                title="DevOps & Infra"
                items="Kubernetes, Terraform, Ansible, CI/CD"
              />
              <SkillCard
                icon={Network}
                title="Networking"
                items="BGP, VLANs, DNS, Load Balancing"
              />
              <SkillCard
                icon={BrainCircuit}
                title="AI / RAG"
                items="Vector DBs, Embeddings, LLM Pipelines"
              />
              <SkillCard
                icon={Code}
                title="Development"
                items="Rust, Go, Python, Node.js"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects ─────────────────────────────────────────────────── */}
      <section id="projects" className="relative z-10 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Featured Projects
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-xl mx-auto">
            A selection of things I've built
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard
              icon={Globe}
              title="SnapShow"
              description="A Next.js social network for sharing photos from concerts and events — complete with real-time feeds, authentication, and a Tanstack Query powered UI."
              badges={["React", "Next.js", "Tanstack Query"]}
              githubHref="https://github.com/AdamBalu/SnapShow"
              demoHref="https://snapshow.vercel.app"
            />

            <ProjectCard
              icon={Database}
              title="Stock Exchange"
              description="A Rust-based real-time trading app. Users can trade stocks and manage portfolios through a clean dashboard with low-latency Axum backend."
              badges={["Rust", "Axum", "PostgreSQL"]}
            />

            <ProjectCard
              icon={Container}
              title="Plant Doctor"
              description="A React Native mobile app that identifies plant diseases via ML inference. Models trained in Python with TensorFlow; inference served as a REST API."
              badges={["Python", "TensorFlow", "React Native"]}
              githubHref="https://github.com/tedKozub/plantDoctor"
            />
          </div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────────────── */}
      <section id="contact" className="relative z-10 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let&apos;s Connect
          </h2>
          <p className="text-lg text-muted-foreground mb-12 text-pretty max-w-xl mx-auto">
            Open to interesting infrastructure challenges, DevOps roles, or
            just a good tech conversation. Drop me a line.
          </p>

          {/* Liquid glass contact panel */}
          <div className="glass-panel max-w-md mx-auto p-8 mb-10">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Mail className="h-5 w-5 text-primary" />
              <span className="text-lg font-medium">tadeas.kozub&#64;gmail.com</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Usually respond within a day
            </p>
          </div>

          {/* Social links */}
          <div className="flex justify-center gap-4">
            <Button
              asChild
              variant="outline"
              size="icon"
              className="h-12 w-12 border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-2xl"
            >
              <Link
                href="https://github.com/tedkozub"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="icon"
              className="h-12 w-12 border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-2xl"
            >
              <Link
                href="https://www.linkedin.com/in/tadeas-kozub-38b374283"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="relative z-10 py-8 px-4 border-t border-white/6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground text-sm">
            © 2026 Tadeáš Kozub — Built with Next.js &amp; Tailwind CSS
          </p>
        </div>
      </footer>
    </main>
  );
}
