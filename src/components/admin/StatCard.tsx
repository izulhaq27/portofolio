import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export function StatCard({ title, value, icon, trend }: StatCardProps) {
  return (
    <div className="bg-background border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-secondary font-medium">{title}</h3>
        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
          {icon}
        </div>
      </div>
      <div className="flex items-end gap-3">
        <p className="text-3xl font-bold text-foreground">{value}</p>
        {trend && (
          <span className={`text-sm font-medium mb-1 ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {trend.isPositive ? '+' : '-'}{trend.value}
          </span>
        )}
      </div>
    </div>
  );
}
