"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function EditProjectPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    description: "",
    thumbnail: "",
    technologies: "",
    githubUrl: "",
    liveUrl: "",
    featured: false,
    status: "draft",
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          const data = await res.json();
          const project = data.find((p: any) => p._id === id);
          if (project) {
            setFormData({
              title: project.title,
              shortDescription: project.shortDescription,
              description: project.description,
              thumbnail: project.thumbnail,
              technologies: project.technologies.join(", "),
              githubUrl: project.githubUrl || "",
              liveUrl: project.liveUrl || "",
              featured: project.featured,
              status: project.status,
            });
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        ...formData,
        technologies: formData.technologies.split(",").map(t => t.trim()).filter(Boolean)
      };

      const res = await fetch(`/api/projects/${resolvedParams.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/admin/projects");
        router.refresh();
      } else {
        alert("Failed to update project");
      }
    } catch (error) {
      console.error(error);
      alert("Error updating project");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-accent" /></div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/projects">
          <Button variant="ghost" size="icon" className="rounded-full w-10 h-10">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Edit Project</h1>
          <p className="text-secondary">Update the details of your project.</p>
        </div>
      </div>

      <div className="bg-background border border-border rounded-2xl shadow-sm overflow-hidden p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Project Title <span className="text-danger">*</span></label>
              <input 
                name="title" required value={formData.title} onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary/5 border border-border focus:border-accent outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Thumbnail Image URL <span className="text-secondary/50 text-xs ml-2">(Optional if Live Demo URL is provided)</span></label>
              <input 
                name="thumbnail" value={formData.thumbnail} onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary/5 border border-border focus:border-accent outline-none" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Short Description <span className="text-danger">*</span></label>
            <input 
              name="shortDescription" required value={formData.shortDescription} onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-secondary/5 border border-border focus:border-accent outline-none" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Full Description <span className="text-danger">*</span></label>
            <textarea 
              name="description" required rows={5} value={formData.description} onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-secondary/5 border border-border focus:border-accent outline-none resize-none" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Technologies Used (Comma separated)</label>
            <input 
              name="technologies" value={formData.technologies} onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-secondary/5 border border-border focus:border-accent outline-none" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">GitHub URL</label>
              <input 
                name="githubUrl" value={formData.githubUrl} onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary/5 border border-border focus:border-accent outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Live Demo URL</label>
              <input 
                name="liveUrl" value={formData.liveUrl} onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary/5 border border-border focus:border-accent outline-none" 
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 pt-4 border-t border-border">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Status</label>
              <select 
                name="status" value={formData.status} onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary/5 border border-border focus:border-accent outline-none"
              >
                <option value="draft">Draft (Hidden)</option>
                <option value="published">Published (Visible)</option>
              </select>
            </div>
            
            <div className="flex items-center gap-3 mt-8">
              <input 
                type="checkbox" id="featured" name="featured" 
                checked={formData.featured} onChange={handleChange}
                className="w-5 h-5 rounded text-accent focus:ring-accent"
              />
              <label htmlFor="featured" className="text-sm font-medium text-foreground cursor-pointer">
                Mark as Featured Project
              </label>
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <Button type="submit" disabled={isLoading} className="flex items-center gap-2">
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Changes
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}
