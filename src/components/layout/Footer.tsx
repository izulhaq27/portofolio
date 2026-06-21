"use client";

import { GitBranch, Briefcase, Mail, ArrowUp } from "lucide-react";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { icon: GitBranch, href: "https://github.com/izulhaq27", label: "GitHub" },
  { icon: Briefcase, href: "https://linkedin.com/in/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:muhammadfahrizulhah@gmail.com", label: "Email" },
];

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="w-full border-t border-white/20 dark:border-white/5 bg-background/50 backdrop-blur-2xl shadow-[0_-4px_30px_rgba(0,0,0,0.1)] mt-8 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10">
          {/* Brand */}
          <div className="space-y-4 max-w-xs">
            <a href="#" className="font-bold text-2xl tracking-tight text-foreground">
              Fahri<span className="text-accent">.</span>
            </a>
            <p className="text-sm text-secondary leading-relaxed">
              Building digital experiences with modern web technologies.
            </p>
            <div className="flex gap-3 pt-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-secondary hover:text-foreground hover:border-accent hover:bg-accent/5 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs uppercase tracking-widest font-semibold text-secondary mb-4">Navigation</h3>
            <nav className="grid grid-cols-2 gap-x-10 gap-y-3">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-secondary hover:text-foreground transition-colors relative group w-fit"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </nav>
          </div>

          {/* Scroll to top */}
          <div>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-sm font-medium text-secondary hover:text-foreground transition-colors group"
            >
              <span>Back to top</span>
              <span className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-accent group-hover:bg-accent/5 transition-all duration-200">
                <ArrowUp className="w-4 h-4" />
              </span>
            </button>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-secondary/60">
            © {new Date().getFullYear()} Moh. Fahri IzulHaq. All rights reserved.
          </p>
          <p className="text-xs text-secondary/60">
            Build with <span className="text-accent font-semibold">Next.js</span> & <span className="text-accent font-semibold">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
