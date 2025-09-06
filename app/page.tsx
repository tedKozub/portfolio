"use client";

import { AnimatedBackground } from "@/components/animated-background";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Database,
  Globe,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <AnimatedBackground />

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            Tadeáš Kozub
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-balance">
            Software Developer
          </p>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto text-pretty">
            Computer Science student passionate about building innovative web
            applications and exploring new technologies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => {}} className="text-lg px-8">
              <Link href="#projects" className="flex items-center">
                View My Work
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 bg-transparent"
            >
              <Link href="#contact" className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                Get In Touch
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                I'm a fifth-year Software Engineering student at MU Brno with a
                passion for full-stack development and problem-solving. I love
                turning complex problems into simple, beautiful solutions.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                When I'm not coding, you can find me learning about new
                technologies, working on personal projects, or exploring the
                latest trends in web development.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  JavaScript
                </Badge>
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  TypeScript
                </Badge>
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  React
                </Badge>
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  Docker
                </Badge>
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  Python
                </Badge>
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  PostgreSQL
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6 text-center">
                <Code className="h-8 w-8 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Frontend</h3>
                <p className="text-sm text-muted-foreground">
                  React, Next.js, Tailwind CSS
                </p>
              </Card>
              <Card className="p-6 text-center">
                <Database className="h-8 w-8 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Backend</h3>
                <p className="text-sm text-muted-foreground">
                  Node.js, Golang, Rust, Python
                </p>
              </Card>
              <Card className="p-6 text-center">
                <Globe className="h-8 w-8 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Tools</h3>
                <p className="text-sm text-muted-foreground">
                  Git, Docker, Nginx, UNIX
                </p>
              </Card>
              <Card className="p-6 text-center">
                <ExternalLink className="h-8 w-8 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Learning</h3>
                <p className="text-sm text-muted-foreground">
                  K8s, Terraform, PHP
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="h-48 bg-muted/50 rounded-lg mb-4 flex items-center justify-center">
                  <Code className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">SnapShow</h3>
                <p className="text-muted-foreground mb-16">
                  A Next.js social network for sharing photos from concerts and
                  events.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="text-xs">
                    React
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Next.js
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Tanstack Query
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link
                      href="https://github.com/AdamBalu/SnapShow"
                      target="_blank"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link href="https://snapshow.vercel.app" target="_blank">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Demo
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="h-48 bg-muted/50 rounded-lg mb-4 flex items-center justify-center">
                  <Database className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Stock Exchange</h3>
                <p className="text-muted-foreground mb-4">
                  A Rust-based app built for trading stocks in real time. Lets
                  users trade and manage their portfolio with a user friendly UI
                  and dashboards.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="text-xs">
                    Rust
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Postgres
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Axum
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Github className="h-4 w-4 mr-2" />
                    Code
                  </Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Demo
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="h-48 bg-muted/50 rounded-lg mb-4 flex items-center justify-center">
                  <Globe className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Plant Doctor App</h3>
                <p className="text-muted-foreground mb-4">
                  A React Native mobile app that identifies plant diseases using
                  machine learning and provides care recommendations. trained
                  models in Python.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="text-xs">
                    Python
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    React Native
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    TensorFlow
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link
                      href="https://github.com/tedKozub/plantDoctor"
                      target="_blank"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Let's Connect</h2>
          <p className="text-lg text-muted-foreground mb-12 text-pretty">
            I'm always interested in new opportunities and collaborations. Feel
            free to reach out if you'd like to work together!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <div className="text-lg px-4 py-2 font-semibold flex items-center justify-center bg-primary rounded-md">
              <Mail className="mr-2 h-5 w-5" />
              tadeas.kozub&#64;gmail.com
            </div>
          </div>
          <div className="flex justify-center gap-6">
            <Button
              asChild
              variant="outline"
              size="icon"
              className="h-12 w-12 bg-transparent"
            >
              <Link
                href="https://github.com/tedkozub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-6 w-6" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 bg-transparent"
            >
              <Link
                href="https://www.linkedin.com/in/tadeas-kozub-38b374283"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-6 w-6" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">
            © 2025 Tadeas Kozub. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </footer>
    </main>
  );
}
