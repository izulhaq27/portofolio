"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";


export function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isExcluded = pathname.startsWith("/admin") || pathname.startsWith("/login");

  return (
    <>
      {!isExcluded && <Navbar />}
      {children}
      {!isExcluded && <Footer />}
    </>
  );
}
