"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Menu, Bell, Search, LogOut } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { signOut } from "next-auth/react";

export function AdminHeader() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-5 h-5" />
        </Button>
        <div className="relative hidden sm:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-9 pr-4 py-2 bg-secondary/5 border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 w-64 text-foreground placeholder:text-secondary"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative hidden sm:flex">
          <Bell className="w-5 h-5 text-secondary" />
          <span className="absolute top-1.5 right-2 w-2 h-2 bg-accent rounded-full border-2 border-background"></span>
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="w-5 h-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-foreground" />
          <Moon className="absolute w-5 h-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-foreground" />
        </Button>

        <button 
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="w-8 h-8 rounded-full bg-accent/20 border border-accent/50 overflow-hidden ml-2 flex items-center justify-center hover:bg-danger/20 hover:border-danger hover:text-danger group transition-colors"
          title="Logout"
        >
           <span className="text-sm font-medium text-accent group-hover:hidden">A</span>
           <LogOut className="w-4 h-4 hidden group-hover:block" />
        </button>
      </div>
    </header>
  );
}
