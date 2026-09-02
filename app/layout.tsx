import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jb-mono",
});

export const metadata: Metadata = {
  title: "Tadeáš Kozub | DevOps Engineer",
  description: "Portfolio of Tadeáš Kozub, a DevOps Engineer focusing on reliable infrastructure, cloud, networking, and AI/RAG pipelines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${jbMono.variable}`} suppressHydrationWarning>
      <body className="font-sans font-light antialiased bg-background text-foreground transition-colors duration-500">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <ThemeToggle />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
