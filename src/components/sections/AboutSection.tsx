"use client";

import { motion } from "framer-motion";
import { User, GraduationCap, Briefcase, Heart } from "lucide-react";

export function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="about" className="py-24 px-6 bg-secondary/5 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={itemVariants}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1.5 bg-accent mx-auto rounded-full"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants} className="space-y-6 text-lg text-secondary">
            <p>
              Hello! I'm <strong className="text-foreground">Moh. Fahri IzulHaq</strong>, a passionate Informatics Engineering Student at Universitas Nahdlatul Ulama Sunan Giri.
            </p>
            <p>
              My journey in tech is driven by a deep curiosity for building beautiful, performant, and user-centric digital experiences. I specialize in modern web technologies like Next.js, React, and Tailwind CSS.
            </p>
            <p>
              When I'm not coding, I'm constantly learning about new architectural patterns, refining UI/UX designs, or engaging in tech communities to stay at the cutting edge of software development.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-background border border-border shadow-sm hover:shadow-md transition-shadow">
              <User className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Personal Values</h3>
              <p className="text-sm text-secondary">Continuous learning, clean code, and user empathy.</p>
            </div>
            <div className="p-6 rounded-2xl bg-background border border-border shadow-sm hover:shadow-md transition-shadow">
              <GraduationCap className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Education</h3>
              <p className="text-sm text-secondary">Informatics Engineering, Universitas Nahdlatul Ulama Sunan Giri.</p>
            </div>
            <div className="p-6 rounded-2xl bg-background border border-border shadow-sm hover:shadow-md transition-shadow">
              <Briefcase className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Career Goals</h3>
              <p className="text-sm text-secondary">Becoming a world-class Senior Full Stack Engineer & Architect.</p>
            </div>
            <div className="p-6 rounded-2xl bg-background border border-border shadow-sm hover:shadow-md transition-shadow">
              <Heart className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Interests</h3>
              <p className="text-sm text-secondary">Web Architecture, Open Source, UI/UX Design.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
