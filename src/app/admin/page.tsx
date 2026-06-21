import { StatCard } from "@/components/admin/StatCard";
import { RecentActivity, ActivityItem } from "@/components/admin/RecentActivity";
import { Users, Eye, MessageSquare, FolderKanban } from "lucide-react";
import connectDB from "@/lib/db";
import { Project } from "@/models/Project";
import { ContactMessage } from "@/models/ContactMessage";

export default async function AdminDashboard() {
  await connectDB();

  // Fetch real counts
  const projectCount = await Project.countDocuments();
  const messageCount = await ContactMessage.countDocuments();
  
  // Fetch real messages for activity feed
  const recentMessages = await ContactMessage.find().sort({ createdAt: -1 }).limit(5);
  
  const activities: ActivityItem[] = recentMessages.map((msg) => {
    const date = new Date(msg.createdAt);
    const dateString = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    return {
      id: msg._id.toString(),
      type: "message",
      user: msg.name,
      action: `sent a message: "${msg.subject}"`,
      time: dateString,
    };
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h1>
        <p className="text-secondary">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Views" 
          value="0" 
          icon={<Eye className="w-5 h-5" />} 
          trend={{ value: "0%", isPositive: true }}
        />
        <StatCard 
          title="Unique Visitors" 
          value="0" 
          icon={<Users className="w-5 h-5" />} 
          trend={{ value: "0%", isPositive: true }}
        />
        <StatCard 
          title="Projects" 
          value={projectCount.toString()} 
          icon={<FolderKanban className="w-5 h-5" />} 
        />
        <StatCard 
          title="Messages" 
          value={messageCount.toString()} 
          icon={<MessageSquare className="w-5 h-5" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Area (Placeholder) */}
        <div className="lg:col-span-2 bg-background border border-border rounded-2xl p-6 shadow-sm flex flex-col min-h-[400px]">
          <h3 className="text-xl font-bold text-foreground mb-6">Traffic Overview</h3>
          <div className="flex-1 rounded-xl bg-secondary/5 border border-dashed border-border flex items-center justify-center">
            <p className="text-secondary">Chart Area Placeholder</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-1">
          <RecentActivity activities={activities} />
        </div>
      </div>
    </div>
  );
}
