"use client";

import { ReactNode } from "react";
import { CheckCircle } from "lucide-react";

interface NotificationCardProps {
  children: ReactNode;
  icon?: ReactNode;
}

export default function NotificationCard({
  children,
  icon,
}: NotificationCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-lg border border-neutral-100 flex items-center gap-3">
      {icon || <CheckCircle size={20} className="text-success" />}
      <span className="text-sm font-medium text-neutral-900">{children}</span>
    </div>
  );
}

