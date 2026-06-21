"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

type Project = {
  _id: string;
  title: string;
  shortDescription: string;
  status: string;
  featured: boolean;
};

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (error) {
      console.error("Failed to fetch projects", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects(projects.filter(p => p._id !== id));
      } else {
        alert("Failed to delete project");
      }
    } catch (error) {
      console.error("Delete error", error);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Projects</h1>
          <p className="text-secondary">Manage your portfolio projects here.</p>
        </div>
        <Link href="/admin/projects/new">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add New Project
          </Button>
        </Link>
      </div>

      <div className="bg-background border border-border rounded-2xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex justify-center items-center">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        ) : projects.length === 0 ? (
          <div className="p-12 text-center text-secondary">
            <p>No projects found. Create your first one!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-secondary/5">
                  <th className="p-4 font-semibold text-foreground">Project Title</th>
                  <th className="p-4 font-semibold text-foreground hidden md:table-cell">Description</th>
                  <th className="p-4 font-semibold text-foreground">Status</th>
                  <th className="p-4 font-semibold text-foreground text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project._id} className="border-b border-border hover:bg-secondary/5 transition-colors">
                    <td className="p-4">
                      <p className="font-semibold text-foreground flex items-center gap-2">
                        {project.title}
                        {project.featured && (
                          <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs">Featured</span>
                        )}
                      </p>
                    </td>
                    <td className="p-4 hidden md:table-cell text-secondary text-sm max-w-xs truncate">
                      {project.shortDescription}
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === "published" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
                      }`}>
                        {project.status === "published" ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/projects/${project._id}`}>
                          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-accent/10 hover:text-accent">
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </Link>
                        <button 
                          onClick={() => handleDelete(project._id)}
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
