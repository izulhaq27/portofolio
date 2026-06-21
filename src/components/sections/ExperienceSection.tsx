"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, Award } from "lucide-react";

export type ExperienceItem = {
  _id: string;
  title: string;
  organization: string;
  date: string;
  type: string;
  description: string;
};

export function ExperienceSection({ experiences }: { experiences: ExperienceItem[] }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="experience" className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Experience & Education</h2>
          <div className="w-20 h-1.5 bg-accent mx-auto rounded-full"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="relative"
        >
          {/* Vertical Line Background */}
          <div className="absolute left-4 md:left-1/2 md:-ml-px top-0 bottom-0 w-0.5 bg-secondary/10"></div>
          
          {/* Animated Vertical Line */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-4 md:left-1/2 md:-ml-px top-0 w-0.5 bg-gradient-to-b from-accent/80 via-accent/40 to-transparent"
          ></motion.div>

          {experiences.map((exp, index) => {
            const isEducation = exp.type.toLowerCase().includes("education");
            const Icon = isEducation ? GraduationCap : (exp.type.toLowerCase().includes("organization") ? Award : Briefcase);

            return (
              <motion.div
                key={exp._id || index}
                variants={itemVariants}
                className="mb-12 relative pl-12 md:pl-0"
              >
                {/* Timeline Dot (Desktop) */}
                <div className="absolute left-1/2 -ml-[20px] w-10 h-10 rounded-full bg-background border-4 border-accent flex items-center justify-center z-10 hidden md:flex">
                  <Icon className="w-4 h-4 text-accent" />
                </div>
                
                {/* Mobile Dot */}
                <div className="absolute left-[9px] top-6 w-4 h-4 rounded-full bg-accent z-10 md:hidden shadow-[0_0_0_4px_var(--background)]"></div>

                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'}`}>
                  <div className="bg-background border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative">
                    {/* Arrow for desktop */}
                    <div className={`hidden md:block absolute top-6 w-4 h-4 bg-background border-border transform rotate-45 ${index % 2 === 0 ? '-right-2 border-t border-r' : '-left-2 border-b border-l'}`}></div>
                    
                    <span className="inline-flex items-center text-xs font-semibold tracking-wide uppercase text-accent mb-2">
                      <Calendar className="w-3 h-3 mr-1" />
                      {exp.date}
                    </span>
                    <h3 className="text-xl font-bold text-foreground mb-1">{exp.title}</h3>
                    <h4 className="text-md font-medium text-secondary mb-4">{exp.organization}</h4>
                    <p className="text-secondary/80 text-sm leading-relaxed">
                      {exp.description}
                    </p>
                    <span className="inline-block mt-4 px-3 py-1 bg-secondary/10 text-secondary text-xs rounded-full">
                      {exp.type}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
