"use client";

import { motion } from "framer-motion";

type SkillType = {
  _id: string;
  name: string;
  category: string;
  level: number;
};

export function SkillsSection({ skills }: { skills: SkillType[] }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Group skills by category
  const categories = ["Frontend", "Backend", "Database", "Tools & DevOps", "Hardware & IoT"];
  
  return (
    <section id="skills" className="py-24 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={itemVariants}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Technical Skills</h2>
          <div className="w-20 h-1.5 bg-accent mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-secondary max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency levels.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {categories.map((category) => {
            const categorySkills = skills.filter((s) => s.category === category);
            if (categorySkills.length === 0) return null;

            return (
              <motion.div
                key={category}
                variants={itemVariants}
                className="bg-background border border-border rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-bold mb-6 text-foreground border-b border-border pb-3">
                  {category}
                </h3>
                <div className="space-y-6">
                  {categorySkills.map((skill) => (
                    <div key={skill._id}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-foreground">{skill.name}</span>
                        <span className="text-secondary text-sm">{skill.level}%</span>
                      </div>
                      <div className="h-2.5 w-full bg-secondary/20 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: false }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="h-full bg-accent rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
