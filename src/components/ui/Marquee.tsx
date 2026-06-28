"use client";

import { motion } from "framer-motion";
import { SiNextdotjs, SiMongodb, SiLaravel, SiReact, SiTailwindcss, SiNodedotjs, SiTypescript, SiVercel, SiFigma } from "react-icons/si";

export function Marquee() {
  const items = [
    { name: "Next.js", icon: SiNextdotjs },
    { name: "MongoDB", icon: SiMongodb },
    { name: "Laravel", icon: SiLaravel },
    { name: "React", icon: SiReact },
    { name: "Tailwind CSS", icon: SiTailwindcss },
    { name: "Node.js", icon: SiNodedotjs },
    { name: "TypeScript", icon: SiTypescript },
    { name: "Figma", icon: SiFigma },
  ];

  return (
    <div className="w-full overflow-hidden bg-foreground py-6 flex whitespace-nowrap relative">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-scroll {
          animation: marquee 35s linear infinite;
          will-change: transform;
        }
      `}</style>
      <div className="flex gap-16 text-background pr-16 animate-marquee-scroll w-max">
        {/* Render multiple sets to ensure seamless looping */}
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-16 items-center">
            {items.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center gap-4 opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
                  <Icon className="w-8 h-8" />
                  <span className="font-semibold text-lg tracking-wide">{item.name}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
