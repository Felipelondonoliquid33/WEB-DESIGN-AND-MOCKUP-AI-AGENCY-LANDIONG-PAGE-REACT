"use client";

import { ReactNode } from "react";
import { TrendingUp } from "lucide-react";

interface MetricCardProps {
  value: string | number;
  label: string;
  trend?: "up" | "down" | "neutral";
  icon?: ReactNode;
}

export default function MetricCard({
  value,
  label,
  trend = "up",
  icon,
}: MetricCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-lg border border-neutral-100">
      <div className="flex items-center gap-2 mb-2">
        {icon || (
          <TrendingUp
            size={16}
            className={
              trend === "up"
                ? "text-success"
                : trend === "down"
                  ? "text-warning"
                  : "text-neutral-400"
            }
          />
        )}
      </div>
      <div className="text-2xl font-bold text-neutral-900">{value}</div>
      <div className="text-sm text-neutral-600">{label}</div>
    </div>
  );
}

