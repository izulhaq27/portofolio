"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ExperienceFormPage() {
  const router = useRouter();
  const params = useParams();
  const isNew = params.id === "new";
  const id = params.id as string;

  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    date: "",
    type: "Higher Education",
    description: "",
    order: 0,
  });

  useEffect(() => {
    if (!isNew) {
      fetchExperience();
    }
  }, [isNew]);

  const fetchExperience = async () => {
    try {
      const res = await fetch("/api/experiences");
      if (res.ok) {
        const data = await res.json();
        const exp = data.find((e: any) => e._id === id);
        if (exp) {
          setFormData({
            title: exp.title,
            organization: exp.organization,
            date: exp.date,
            type: exp.type,
            description: exp.description || "",
            order: exp.order || 0,
          });
        }
      }
    } catch (err) {
      setError("Failed to load experience details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'number' ? parseInt(e.target.value) : e.target.value;
    setFormData((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      const res = await fetch(isNew ? "/api/experiences" : `/api/experiences/${id}`, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/admin/experiences");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to save record");
      }
    } catch (err) {
      setError("An error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-accent" /></div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/experiences">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {isNew ? "Add New Record" : "Edit Record"}
          </h1>
          <p className="text-secondary">Experience or education history</p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-danger/10 text-danger border border-danger/20 rounded-lg text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-background border border-border rounded-2xl shadow-sm overflow-hidden p-6 md:p-8 space-y-6">
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Title / Degree</label>
          <input
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Bachelor's Degree in Informatics"
            className="w-full px-4 py-2.5 rounded-lg bg-secondary/5 border border-border focus:border-accent outline-none transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Organization / School</label>
          <input
            name="organization"
            required
            value={formData.organization}
            onChange={handleChange}
            placeholder="e.g. Nahdlatul Ulama Sunan Giri University"
            className="w-full px-4 py-2.5 rounded-lg bg-secondary/5 border border-border focus:border-accent outline-none transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Date Range</label>
            <input
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
              placeholder="e.g. 2020 - 2024 or Present"
              className="w-full px-4 py-2.5 rounded-lg bg-secondary/5 border border-border focus:border-accent outline-none transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Type</label>
            <select
              name="type"
              required
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-secondary/5 border border-border focus:border-accent outline-none transition-colors appearance-none"
            >
              <option value="Higher Education">Higher Education</option>
              <option value="Secondary Education">Secondary Education</option>
              <option value="Primary Education">Primary Education</option>
              <option value="Work Experience">Work Experience</option>
              <option value="Organization">Organization / Committee</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Description</label>
          <textarea
            name="description"
            required
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Briefly describe your role or studies..."
            className="w-full px-4 py-3 rounded-lg bg-secondary/5 border border-border focus:border-accent outline-none transition-colors resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Display Order</label>
          <input
            name="order"
            type="number"
            value={formData.order}
            onChange={handleChange}
            className="w-full max-w-[150px] px-4 py-2.5 rounded-lg bg-secondary/5 border border-border focus:border-accent outline-none transition-colors"
          />
          <p className="text-xs text-secondary">Lower numbers appear first.</p>
        </div>

        <div className="pt-6 border-t border-border flex justify-end gap-3">
          <Link href="/admin/experiences">
            <Button type="button" variant="ghost">Cancel</Button>
          </Link>
          <Button type="submit" disabled={isSaving} className="flex items-center gap-2">
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isSaving ? "Saving..." : "Save Record"}
          </Button>
        </div>
      </form>
    </div>
  );
}
