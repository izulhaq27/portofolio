import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ClientLayoutWrapper } from "@/components/layout/ClientLayoutWrapper";
import { ThemeProvider } from "@/providers/ThemeProvider";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portofolio-mohfahriizulhaq.vercel.app"),
  title: "Moh. Fahri IzulHaq | Portfolio",
  description: "Portfolio of Moh. Fahri IzulHaq, Informatics Engineering Student.",
  keywords: ["Moh. Fahri IzulHaq", "Portfolio", "Full Stack Engineer", "UI/UX Designer", "Next.js"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      </head>
      <body className={`${plusJakartaSans.variable} font-sans bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <ClientLayoutWrapper>
            {children}
          </ClientLayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
