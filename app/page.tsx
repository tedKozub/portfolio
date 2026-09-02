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
  Container,
} from "lucide-react";
import Link from "next/link";

const SKILLS = [
  "React", "TypeScript", "Next.js", "Kubernetes", "Terraform",
  "Ansible", "CI/CD", "Docker", "Python", "Rust", "Go",
  "Networking", "Vector DBs", "RAG"
];

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />

      {/* ── Hero – stays clean and minimal ─────────────────────────── */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center w-full">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold mb-8 sm:mb-12 text-balance heading-chromatic animate-fade-in-up leading-tight">
            <span className="text-lg sm:text-xl md:text-3xl font-light text-muted-foreground mr-2 sm:mr-3 align-middle block sm:inline mb-2 sm:mb-0">Ing.</span>
            Tadeáš Kozub
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-sm sm:max-w-none mx-auto">
            <Button size="lg" className="text-base sm:text-lg px-8 font-light w-full sm:w-auto h-12 sm:h-auto" asChild>
              <Link href="#projects">View My Work</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-base sm:text-lg px-8 bg-transparent border-black/10 dark:border-white/10 font-light w-full sm:w-auto h-12 sm:h-auto"
              asChild
            >
              <Link href="#contact" className="flex items-center justify-center">
                <Mail className="mr-2 h-5 w-5" />
                Get In Touch
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── About – glass skill cards ───────────────────────────────── */}
      <section className="relative z-10 py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium text-center mb-16 heading-chromatic">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Bio */}
            <div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                I&apos;m a fulltime DevOps engineer focused on building
                scalable, reliable systems. I care about automation, clean
                infrastructure, and making deployments boring — in the best
                possible way.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                As a freelancer, I also specialize in modern web development and
                frontend engineering, building fast and interactive UIs using React
                and TypeScript. Outside of work, I&apos;m exploring RAG architectures
                and vector databases.
              </p>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm px-3 py-1 font-normal badge-chromatic bg-black/5 dark:bg-white/5">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Glass skill cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Code,        title: "Web Dev",          sub: "React, TypeScript, Next.js, Tailwind" },
                { icon: Server,      title: "DevOps & Infra",  sub: "Kubernetes, Terraform, Ansible, CI/CD" },
                { icon: Network,     title: "Networking",       sub: "BGP, VLANs, DNS, Load Balancing" },
                { icon: BrainCircuit,title: "AI / RAG",         sub: "Vector DBs, Embeddings, LLM Pipelines" },
              ].map(({ icon: Icon, title, sub }) => (
                <div key={title} className="glass-card p-6 text-center">
                  <Icon className="h-7 w-7 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects – glass cards ──────────────────────────────────── */}
      <section id="projects" className="relative z-10 py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium text-center mb-16 heading-chromatic">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Plant Doctor */}
            <div className="glass-card p-6 flex flex-col">
              <div className="h-44 rounded-xl mb-5 flex items-center justify-center bg-black/5 dark:bg-white/[0.03] border border-black/10 dark:border-white/[0.05]">
                <Container className="h-10 w-10 text-muted-foreground/50" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Plant Doctor</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">
                A React Native mobile app that identifies plant diseases via ML inference. Models trained in Python with TensorFlow.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["Python", "React Native", "TensorFlow"].map((t) => (
                  <Badge key={t} variant="outline" className="text-xs border-black/10 dark:border-white/10 badge-chromatic font-normal">{t}</Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm" className="bg-transparent border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 font-normal">
                  <Link href="https://github.com/tedKozub/plantDoctor" target="_blank">
                    <Github className="h-4 w-4 mr-2" />Code
                  </Link>
                </Button>
              </div>
            </div>

            {/* Placeholder 1 */}
            <div className="glass-card p-6 flex flex-col opacity-60">
              <div className="h-44 rounded-xl mb-5 flex items-center justify-center bg-black/5 dark:bg-white/[0.03] border border-black/10 dark:border-white/[0.05]">
                <Globe className="h-10 w-10 text-muted-foreground/30" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">
                Currently working on some exciting new projects in the background.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="text-xs border-black/10 dark:border-white/10 font-normal">WIP</Badge>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled className="bg-transparent border-black/10 dark:border-white/10 font-normal">
                  <Github className="h-4 w-4 mr-2" />Code
                </Button>
              </div>
            </div>

            {/* Placeholder 2 */}
            <div className="glass-card p-6 flex flex-col opacity-60">
              <div className="h-44 rounded-xl mb-5 flex items-center justify-center bg-black/5 dark:bg-white/[0.03] border border-black/10 dark:border-white/[0.05]">
                <Database className="h-10 w-10 text-muted-foreground/30" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">
                Stay tuned for more updates and open source contributions.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="text-xs border-black/10 dark:border-white/10 font-normal">WIP</Badge>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled className="bg-transparent border-black/10 dark:border-white/10 font-normal">
                  <Github className="h-4 w-4 mr-2" />Code
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Contact – simple, no glass ─────────────────────────────── */}
      <section id="contact" className="relative z-10 py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-8 heading-chromatic">Let&apos;s Connect</h2>
          <p className="text-lg text-muted-foreground mb-12 text-pretty">
            Open to interesting infrastructure challenges, freelance web development, DevOps roles, or
            just a good tech conversation. Drop me a line.
          </p>
          <div className="flex justify-center mb-12">
            <div className="text-base sm:text-lg px-4 sm:px-8 py-3 sm:py-4 font-normal flex items-center justify-center bg-black/5 dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-2xl shadow-xl backdrop-blur-md transition-all hover:bg-black/10 dark:hover:bg-black/80 hover:border-black/20 dark:hover:border-white/20 cursor-pointer text-foreground break-all max-w-full">
              <Mail className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground shrink-0" />
              <span className="truncate">tadeas.kozub&#64;gmail.com</span>
            </div>
          </div>
          <div className="flex justify-center gap-6">
            <Button asChild variant="outline" size="icon" className="h-12 w-12 bg-transparent border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5">
              <Link href="https://github.com/tedkozub" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-6 w-6" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="icon" className="h-12 w-12 bg-transparent border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5">
              <Link href="https://www.linkedin.com/in/tadeas-kozub-38b374283" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6" />
              </Link>
            </Button>
          </div>
        </div>
      </section>


      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="relative z-10 py-8 px-4 sm:px-6 border-t border-black/10 dark:border-white/10 bg-white/30 dark:bg-black/20 backdrop-blur-md transition-colors duration-500">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground text-xs sm:text-sm">
            © 2026 Tadeáš Kozub. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </footer>
    </main>
  );
}
