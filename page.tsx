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

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <AnimatedBackground />

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            Alex Chen
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-balance">
            Junior Software Developer
          </p>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto text-pretty">
            Computer Science student passionate about building innovative web
            applications and exploring new technologies. Currently seeking
            internship opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              View My Work
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 bg-transparent"
            >
              <Mail className="mr-2 h-5 w-5" />
              Get In Touch
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
                I'm a third-year Computer Science student at UC Berkeley with a
                passion for full-stack development and problem-solving. I love
                turning complex problems into simple, beautiful solutions.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                When I'm not coding, you can find me contributing to open-source
                projects, participating in hackathons, or exploring the latest
                in web technologies.
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
                  Node.js
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
                  Node.js, Express, PostgreSQL
                </p>
              </Card>
              <Card className="p-6 text-center">
                <Globe className="h-8 w-8 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Tools</h3>
                <p className="text-sm text-muted-foreground">
                  Git, Docker, AWS
                </p>
              </Card>
              <Card className="p-6 text-center">
                <ExternalLink className="h-8 w-8 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Learning</h3>
                <p className="text-sm text-muted-foreground">
                  Go, Kubernetes, ML
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative z-10 py-20 px-4">
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
                <h3 className="text-xl font-semibold mb-2">Task Manager App</h3>
                <p className="text-muted-foreground mb-4">
                  A full-stack productivity app built with React and Node.js,
                  featuring real-time collaboration and task tracking.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="text-xs">
                    React
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Node.js
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    MongoDB
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
                  <Database className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Weather Dashboard
                </h3>
                <p className="text-muted-foreground mb-4">
                  Interactive weather application with data visualization and
                  location-based forecasts using external APIs.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="text-xs">
                    JavaScript
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Chart.js
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    API
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
                <h3 className="text-xl font-semibold mb-2">E-commerce Site</h3>
                <p className="text-muted-foreground mb-4">
                  Modern e-commerce platform with payment integration, user
                  authentication, and admin dashboard.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="text-xs">
                    Next.js
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Stripe
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    PostgreSQL
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
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Let's Connect</h2>
          <p className="text-lg text-muted-foreground mb-12 text-pretty">
            I'm always interested in new opportunities and collaborations. Feel
            free to reach out if you'd like to work together!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8">
              <Mail className="mr-2 h-5 w-5" />
              alex.chen@email.com
            </Button>
          </div>
          <div className="flex justify-center gap-6">
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 bg-transparent"
            >
              <Github className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 bg-transparent"
            >
              <Linkedin className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 Alex Chen. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </footer>
    </main>
  );
}
