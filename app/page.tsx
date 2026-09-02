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
  "Kubernetes", "Terraform", "Ansible", "Docker",
  "CI/CD", "Networking", "Python", "Rust",
  "Go", "Vector DBs", "RAG", "PostgreSQL",
];

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <AnimatedBackground />

      {/* ── Hero – stays clean and minimal ─────────────────────────── */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance heading-chromatic">
            Tadeáš Kozub
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-balance">
            DevOps Engineer
          </p>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto text-pretty">
            Building reliable infrastructure and exploring the intersection of
            DevOps, networking, and AI — currently deep-diving into RAG
            pipelines and vector databases.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="#projects">View My Work</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 bg-transparent"
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

      {/* ── About – glass skill cards ───────────────────────────────── */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 heading-chromatic">
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
                Outside of work I&apos;m exploring RAG architectures and vector
                databases, diving deep into networking, and occasionally
                shipping side projects.
              </p>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm px-3 py-1 badge-chromatic">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Glass skill cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Server,      title: "DevOps & Infra",  sub: "Kubernetes, Terraform, Ansible, CI/CD" },
                { icon: Network,     title: "Networking",       sub: "BGP, VLANs, DNS, Load Balancing" },
                { icon: BrainCircuit,title: "AI / RAG",         sub: "Vector DBs, Embeddings, LLM Pipelines" },
                { icon: Code,        title: "Development",      sub: "Rust, Go, Python, Node.js" },
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
      <section id="projects" className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 heading-chromatic">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* SnapShow */}
            <div className="glass-card p-6 flex flex-col">
              <div className="h-44 rounded-xl mb-5 flex items-center justify-center bg-white/[0.03] border border-white/[0.05]">
                <Globe className="h-10 w-10 text-muted-foreground/50" />
              </div>
              <h3 className="text-xl font-semibold mb-2">SnapShow</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">
                A Next.js social network for sharing photos from concerts and events.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["React", "Next.js", "Tanstack Query"].map((t) => (
                  <Badge key={t} variant="outline" className="text-xs border-white/10 badge-chromatic">{t}</Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm" className="bg-transparent border-white/10 hover:bg-white/5">
                  <Link href="https://github.com/AdamBalu/SnapShow" target="_blank">
                    <Github className="h-4 w-4 mr-2" />Code
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="bg-transparent border-white/10 hover:bg-white/5">
                  <Link href="https://snapshow.vercel.app" target="_blank">
                    <ExternalLink className="h-4 w-4 mr-2" />Demo
                  </Link>
                </Button>
              </div>
            </div>

            {/* Stock Exchange */}
            <div className="glass-card p-6 flex flex-col">
              <div className="h-44 rounded-xl mb-5 flex items-center justify-center bg-white/[0.03] border border-white/[0.05]">
                <Database className="h-10 w-10 text-muted-foreground/50" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Stock Exchange</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">
                A Rust-based app for trading stocks in real time with a low-latency Axum backend and clean dashboards.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["Rust", "Axum", "PostgreSQL"].map((t) => (
                  <Badge key={t} variant="outline" className="text-xs border-white/10 badge-chromatic">{t}</Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled className="border-white/10">
                  <Github className="h-4 w-4 mr-2" />Code
                </Button>
                <Button variant="outline" size="sm" disabled className="border-white/10">
                  <ExternalLink className="h-4 w-4 mr-2" />Demo
                </Button>
              </div>
            </div>

            {/* Plant Doctor */}
            <div className="glass-card p-6 flex flex-col">
              <div className="h-44 rounded-xl mb-5 flex items-center justify-center bg-white/[0.03] border border-white/[0.05]">
                <Container className="h-10 w-10 text-muted-foreground/50" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Plant Doctor</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">
                A React Native mobile app that identifies plant diseases via ML inference. Models trained in Python with TensorFlow.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["Python", "React Native", "TensorFlow"].map((t) => (
                  <Badge key={t} variant="outline" className="text-xs border-white/10 badge-chromatic">{t}</Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm" className="bg-transparent border-white/10 hover:bg-white/5">
                  <Link href="https://github.com/tedKozub/plantDoctor" target="_blank">
                    <Github className="h-4 w-4 mr-2" />Code
                  </Link>
                </Button>
                <Button variant="outline" size="sm" disabled className="border-white/10">
                  <ExternalLink className="h-4 w-4 mr-2" />Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact – simple, no glass ─────────────────────────────── */}
      <section id="contact" className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 heading-chromatic">Let&apos;s Connect</h2>
          <p className="text-lg text-muted-foreground mb-12 text-pretty">
            Open to interesting infrastructure challenges, DevOps roles, or
            just a good tech conversation. Drop me a line.
          </p>
          <div className="flex justify-center mb-12">
            <div className="text-lg px-8 py-4 font-medium flex items-center justify-center bg-black/50 border border-white/10 rounded-2xl shadow-xl backdrop-blur-md transition-all hover:bg-black/80 hover:border-white/20 cursor-pointer">
              <Mail className="mr-3 h-6 w-6 text-muted-foreground" />
              <span className="text-white">tadeas.kozub&#64;gmail.com</span>
            </div>
          </div>
          <div className="flex justify-center gap-6">
            <Button asChild variant="outline" size="icon" className="h-12 w-12 bg-transparent">
              <Link href="https://github.com/tedkozub" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-6 w-6" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="icon" className="h-12 w-12 bg-transparent">
              <Link href="https://www.linkedin.com/in/tadeas-kozub-38b374283" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="relative z-10 pb-12 px-4 mt-8 flex justify-center">
        <div className="px-8 py-4 rounded-full bg-white/[0.02] border border-white/[0.08] backdrop-blur-2xl backdrop-saturate-150 shadow-[0_12px_40px_rgba(0,0,0,0.4),0_1px_0_rgba(255,255,255,0.1)_inset] transition-all duration-300 hover:bg-white/[0.04] hover:scale-105 hover:border-white/[0.12] hover:shadow-[0_16px_50px_rgba(0,0,0,0.5),0_1px_0_rgba(255,255,255,0.15)_inset] cursor-default">
          <p className="text-muted-foreground text-sm font-medium tracking-wide">
            © 2026 Tadeáš Kozub. Built with Next.js & Tailwind.
          </p>
        </div>
      </footer>
    </main>
  );
}
