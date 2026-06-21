"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Loader2, GraduationCap, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/Button";

type Experience = {
  _id: string;
  title: string;
  organization: string;
  date: string;
  type: string;
  order: number;
};

export default function ExperiencesAdminPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const res = await fetch("/api/experiences");
      if (res.ok) {
        const data = await res.json();
        setExperiences(data);
      }
    } catch (error) {
      console.error("Failed to fetch experiences", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this record?")) return;
    
    try {
      const res = await fetch(`/api/experiences/${id}`, { method: "DELETE" });
      if (res.ok) {
        setExperiences(experiences.filter(e => e._id !== id));
      } else {
        alert("Failed to delete experience");
      }
    } catch (error) {
      console.error("Delete error", error);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Experience & Education</h1>
          <p className="text-secondary">Manage your academic and work history.</p>
        </div>
        <Link href="/admin/experiences/new">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add New Record
          </Button>
        </Link>
      </div>

      <div className="bg-background border border-border rounded-2xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex justify-center items-center">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        ) : experiences.length === 0 ? (
          <div className="p-12 text-center text-secondary">
            <p>No records found. Add your first education or experience!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-secondary/5">
                  <th className="p-4 font-semibold text-foreground">Title & Organization</th>
                  <th className="p-4 font-semibold text-foreground">Type</th>
                  <th className="p-4 font-semibold text-foreground hidden sm:table-cell">Date</th>
                  <th className="p-4 font-semibold text-foreground text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {experiences.map((exp) => (
                  <tr key={exp._id} className="border-b border-border hover:bg-secondary/5 transition-colors">
                    <td className="p-4">
                      <p className="font-semibold text-foreground">{exp.title}</p>
                      <p className="text-sm text-secondary">{exp.organization}</p>
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs rounded-full inline-flex items-center gap-1.5">
                        {exp.type.toLowerCase().includes("education") ? <GraduationCap className="w-3 h-3" /> : <Briefcase className="w-3 h-3" />}
                        {exp.type}
                      </span>
                    </td>
                    <td className="p-4 hidden sm:table-cell text-secondary text-sm">
                      {exp.date}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/experiences/${exp._id}`}>
                          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-accent/10 hover:text-accent">
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </Link>
                        <button 
                          onClick={() => handleDelete(exp._id)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-secondary hover:bg-danger/10 hover:text-danger transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
