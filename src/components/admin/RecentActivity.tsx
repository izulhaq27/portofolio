import { Eye, MessageSquare, Heart } from "lucide-react";

export type ActivityItem = {
  id: string;
  type: "message" | "view" | "like";
  user: string;
  action: string;
  time: string;
};

export function RecentActivity({ activities }: { activities: ActivityItem[] }) {
  const getIcon = (type: string) => {
    switch (type) {
      case "message": return MessageSquare;
      case "view": return Eye;
      case "like": return Heart;
      default: return Eye;
    }
  };

  return (
    <div className="bg-background border border-border rounded-2xl shadow-sm overflow-hidden h-full">
      <div className="p-6 border-b border-border flex justify-between items-center">
        <h3 className="text-xl font-bold text-foreground">Recent Activity</h3>
      </div>
      <div className="p-0">
        {activities.length === 0 ? (
          <div className="p-6 text-center text-secondary">No recent activity</div>
        ) : (
          activities.map((activity, idx) => {
            const Icon = getIcon(activity.type);
            return (
              <div 
                key={activity.id} 
                className={`flex items-start gap-4 p-5 hover:bg-secondary/5 transition-colors ${
                  idx !== activities.length - 1 ? "border-b border-border/50" : ""
                }`}
              >
                <div className="mt-0.5 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-secondary mt-1">{activity.time}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="p-4 border-t border-border bg-secondary/5 text-center">
        <button className="text-sm text-accent font-medium hover:underline">View All Activity</button>
      </div>
    </div>
  );
}
