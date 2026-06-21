"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, KeyRound, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion, Variants } from "framer-motion";

export default function SettingsAdminPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          setFormData((prev) => ({ ...prev, name: data.name, email: data.email }));
        }
      } catch (error) {
        console.error("Failed to load settings", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setMessage({ type: "", text: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match." });
      return;
    }

    if ((formData.newPassword || formData.email !== formData.email) && !formData.currentPassword) {
      setMessage({ type: "error", text: "Current password is required to save these changes." });
      return;
    }

    setIsSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: "Settings updated successfully! If you changed your email or password, please re-login." });
        setFormData(prev => ({ ...prev, currentPassword: "", newPassword: "", confirmPassword: "" }));
      } else {
        setMessage({ type: "error", text: data.error || "Failed to update settings." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred while saving." });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-accent" /></div>;
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="visible" 
      className="space-y-6 max-w-3xl"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold text-foreground mb-2">Account Settings</h1>
        <p className="text-secondary">Update your admin profile details and security credentials.</p>
      </motion.div>

      {message.text && (
        <motion.div variants={itemVariants} className={`p-4 rounded-lg text-sm font-medium ${message.type === "error" ? "bg-danger/10 text-danger border border-danger/20" : "bg-success/10 text-success border border-success/20"}`}>
          {message.text}
        </motion.div>
      )}

      <motion.div variants={itemVariants} className="bg-background border border-border rounded-2xl shadow-sm overflow-hidden p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-10">
          
          {/* Profile Section */}
          <div className="space-y-8">
            <h2 className="text-xl font-semibold flex items-center gap-2 border-b border-border pb-3">
              <UserIcon className="w-5 h-5 text-accent" />
              Profile Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-semibold text-foreground">Display Name</label>
                <input 
                  name="name" required value={formData.name} onChange={handleChange}
                  className="block w-full px-4 py-3 rounded-xl bg-secondary/5 border border-border focus:border-accent outline-none transition-colors" 
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-semibold text-foreground">Admin Email</label>
                <input 
                  name="email" type="email" required value={formData.email} onChange={handleChange}
                  className="block w-full px-4 py-3 rounded-xl bg-secondary/5 border border-border focus:border-accent outline-none transition-colors" 
                />
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="space-y-8 pt-6">
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2 border-b border-border pb-3 mb-2">
                <KeyRound className="w-5 h-5 text-accent" />
                Security
              </h2>
              <p className="text-sm text-secondary">Leave new password fields blank if you don't want to change it.</p>
            </div>
            
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-semibold text-foreground">Current Password</label>
                <input 
                  name="currentPassword" type="password" value={formData.currentPassword} onChange={handleChange}
                  className="block w-full max-w-md px-4 py-3 rounded-xl bg-secondary/5 border border-border focus:border-accent outline-none transition-colors" 
                  placeholder="Required to make changes"
                />
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <label className="block text-sm font-semibold text-foreground">New Password</label>
                <input 
                  name="newPassword" type="password" value={formData.newPassword} onChange={handleChange}
                  className="block w-full max-w-md px-4 py-3 rounded-xl bg-secondary/5 border border-border focus:border-accent outline-none transition-colors" 
                  placeholder="Enter new password"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-semibold text-foreground">Confirm New Password</label>
                <input 
                  name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange}
                  className="block w-full max-w-md px-4 py-3 rounded-xl bg-secondary/5 border border-border focus:border-accent outline-none transition-colors" 
                  placeholder="Repeat new password"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-border flex justify-end">
            <Button type="submit" disabled={isSaving || (!formData.name && !formData.email)} className="flex items-center gap-2 px-8">
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>

        </form>
      </motion.div>
    </motion.div>
  );
}
