export const dynamic = "force-dynamic";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Download, Mail, ArrowRight } from "lucide-react";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Marquee } from "@/components/ui/Marquee";
import connectDB from "@/lib/db";
import { Project } from "@/models/Project";
import { Skill } from "@/models/Skill";
import { Experience } from "@/models/Experience";

export default async function Home() {
  await connectDB();

  // Fetch published projects from DB
  const rawProjects = await Project.find({ status: "published" }).sort({ createdAt: -1 });
  const projects = JSON.parse(JSON.stringify(rawProjects));

  // Fetch skills from DB
  const rawSkills = await Skill.find().sort({ createdAt: 1 });
  const skills = JSON.parse(JSON.stringify(rawSkills));

  // Fetch experiences from DB
  const rawExperiences = await Experience.find().sort({ order: 1, createdAt: -1 });
  const experiences = JSON.parse(JSON.stringify(rawExperiences));

  return (
    <main className="w-full flex flex-col selection:bg-accent selection:text-white">

      {/* Editorial Premium Hero Section */}
      <section className="w-full relative px-6 pt-32 pb-20 md:px-12 lg:px-24 overflow-hidden min-h-[90vh] flex items-center">

        {/* Background Container */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Main Accent Glow */}
          <div className="absolute top-0 right-0 w-[120vw] h-[120vw] md:w-[80vw] md:h-[80vw] bg-accent/15 rounded-full blur-[120px] -translate-y-1/4 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] bg-accent/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3"></div>
        </div>
        {/* Foreground Content */}
        <div className="max-w-5xl w-full mx-auto relative z-10">
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out flex flex-col items-center text-center">
            <h2 className="text-xl md:text-2xl font-medium text-secondary mb-4">Hey, I'm a</h2>
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[8rem] leading-[1.0] tracking-tighter text-foreground pb-6 drop-shadow-lg flex flex-col items-center justify-center">
              <span className="font-normal">Software</span>
              <span className="font-bold text-accent">Engineer.</span>
            </h1>
            <p className="text-lg md:text-xl text-secondary/90 leading-relaxed font-medium max-w-2xl mx-auto mb-10 drop-shadow-md">
              I am <strong className="text-foreground">Moh. Fahri IzulHaq</strong>, a Full Stack Engineer & UI/UX Designer building platforms that connect and convert.
            </p>
            <Link href="#contact" passHref>
              <Button size="lg" className="rounded-full px-8 group text-base h-14 shadow-xl">
                Get in touch
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Marquee />

      <AboutSection />
      <SkillsSection skills={skills} />
      <ProjectsSection projects={projects} />
      <ExperienceSection experiences={experiences} />
      <ContactSection />

    </main>
  );
}
