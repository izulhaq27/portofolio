"use client";

import { useState, useEffect } from "react";
import { Trash2, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/Button";

type Skill = {
  _id: string;
  name: string;
  category: string;
  level: number;
};

export default function SkillsAdminPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    category: "Frontend",
    level: 80
  });

  const categories = ["Frontend", "Backend", "Database", "Tools & DevOps", "Hardware & IoT"];

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await fetch("/api/skills");
      if (res.ok) {
        const data = await res.json();
        setSkills(data);
      }
    } catch (error) {
      console.error("Failed to fetch skills", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const res = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const newSkill = await res.json();
        setSkills([...skills, newSkill]);
        setFormData({ name: "", category: "Frontend", level: 80 }); // reset name only mostly
      }
    } catch (error) {
      console.error(error);
      alert("Error adding skill");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this skill?")) return;
    
    try {
      const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });
      if (res.ok) {
        setSkills(skills.filter(s => s._id !== id));
      }
    } catch (error) {
      console.error("Delete error", error);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Skills</h1>
        <p className="text-secondary">Manage your technical skills and proficiency levels.</p>
      </div>

      <div className="bg-background border border-border rounded-2xl shadow-sm overflow-hidden p-6">
        <h3 className="text-lg font-bold mb-4">Add New Skill</h3>
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="w-full space-y-2">
            <label className="text-sm font-medium text-foreground">Skill Name</label>
            <input 
              name="name" required value={formData.name} onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-secondary/5 border border-border focus:border-accent outline-none" 
              placeholder="e.g. React" 
            />
          </div>
          <div className="w-full space-y-2">
            <label className="text-sm font-medium text-foreground">Category</label>
            <select 
              name="category" value={formData.category} onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-secondary/5 border border-border focus:border-accent outline-none"
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div className="w-full space-y-2">
            <label className="text-sm font-medium text-foreground">Proficiency Level (1-100)</label>
            <input 
              name="level" type="number" min="1" max="100" required value={formData.level} onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-secondary/5 border border-border focus:border-accent outline-none" 
            />
          </div>
          <Button type="submit" disabled={isSaving} className="shrink-0 h-[46px] w-full md:w-auto">
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            {isSaving ? "Saving..." : "Add Skill"}
          </Button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isLoading ? (
          <div className="col-span-full p-12 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        ) : (
          categories.map(category => {
            const categorySkills = skills.filter(s => s.category === category);
            if (categorySkills.length === 0) return null;
            
            return (
              <div key={category} className="bg-background border border-border rounded-2xl shadow-sm p-6">
                <h3 className="text-xl font-bold mb-6 text-foreground border-b border-border pb-3">
                  {category}
                </h3>
                <div className="space-y-4">
                  {categorySkills.map(skill => (
                    <div key={skill._id} className="flex items-center justify-between group">
                      <div className="flex-1 pr-4">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium text-foreground">{skill.name}</span>
                          <span className="text-secondary text-sm">{skill.level}%</span>
                        </div>
                        <div className="h-2 w-full bg-secondary/20 rounded-full overflow-hidden">
                          <div className="h-full bg-accent rounded-full" style={{ width: `${skill.level}%` }} />
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDelete(skill._id)}
                        className="text-secondary hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
