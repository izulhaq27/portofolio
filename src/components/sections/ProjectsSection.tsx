"use client";

import { motion, Variants } from "framer-motion";
import { GitBranch, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

type ProjectType = {
  _id: string;
  title: string;
  shortDescription: string;
  description: string;
  thumbnail: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
};

export function ProjectsSection({ projects }: { projects: ProjectType[] }) {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section id="projects" className="py-32 px-6 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={itemVariants}
          className="mb-24 md:mb-32"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-foreground/20"></div>
            <span className="text-sm uppercase tracking-widest font-semibold text-secondary">Selected Work</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl leading-[1.1]">
            Digital products that close the gap between ambition and reality.
          </h2>
        </motion.div>

        <div className="space-y-32 md:space-y-48">
          {projects.length === 0 ? (
            <p className="text-xl text-secondary">No projects published yet.</p>
          ) : (
            projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-100px" }}
                variants={itemVariants}
                className={`flex flex-col gap-12 lg:gap-24 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
              >
                {/* Image side */}
                <div className="w-full lg:w-1/2 relative group cursor-pointer overflow-hidden rounded-2xl bg-secondary/10">
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-secondary/10 shadow-lg">
                    {(() => {
                      // Helper to format URL
                      const formatUrl = (url: string) => url.startsWith("http") ? url : `https://${url}`;
                      
                      // Determine the final image source
                      let finalImageSrc = "";
                      const isThumbnailSameAsLiveUrl = project.thumbnail && project.liveUrl && project.thumbnail.trim() === project.liveUrl.trim();
                      
                      if (project.thumbnail && !isThumbnailSameAsLiveUrl && (project.thumbnail.startsWith("/") || project.thumbnail.startsWith("http"))) {
                        finalImageSrc = project.thumbnail;
                      } else if (project.liveUrl) {
                        const validUrl = formatUrl(project.liveUrl);
                        finalImageSrc = `https://api.microlink.io/?url=${encodeURIComponent(validUrl)}&screenshot=true&meta=false&embed=screenshot.url`;
                      }

                      return finalImageSrc ? (
                        <img 
                          src={finalImageSrc} 
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <span className="text-secondary font-medium tracking-widest uppercase text-sm">Image Placeholder</span>
                      );
                    })()}
                  </div>
                  {/* Overlay hover effect */}
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-500 z-10 flex items-center justify-center pointer-events-none">
                    <div className="w-20 h-20 rounded-full bg-background/90 text-foreground flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 backdrop-blur-sm">
                      <ArrowRight className="w-8 h-8" />
                    </div>
                  </div>
                </div>
                
                {/* Content side */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <div className="inline-block text-accent font-mono text-sm tracking-widest uppercase mb-4">
                    {project.shortDescription}
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{project.title}</h3>
                  <p className="text-xl text-secondary/80 leading-relaxed mb-12 max-w-lg">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center justify-between gap-6">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="px-4 py-1.5 border border-border text-secondary rounded-full text-xs uppercase tracking-wider font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4 shrink-0">
                      {project.githubUrl && (
                        <a href={project.githubUrl.startsWith("http") ? project.githubUrl : `https://${project.githubUrl}`} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" size="icon" className="rounded-full bg-secondary/5 hover:bg-secondary/10">
                            <GitBranch className="w-4 h-4" />
                          </Button>
                        </a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl.startsWith("http") ? project.liveUrl : `https://${project.liveUrl}`} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" size="icon" className="rounded-full bg-secondary/5 hover:bg-secondary/10">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
