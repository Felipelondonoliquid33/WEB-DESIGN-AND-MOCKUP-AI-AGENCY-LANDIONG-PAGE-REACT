"use client";

import { motion } from "framer-motion";

interface Avatar {
  id: string;
  src?: string;
  alt?: string;
  initials?: string;
}

interface AvatarStackProps {
  avatars: Avatar[];
  max?: number;
  size?: "sm" | "md" | "lg";
}

export default function AvatarStack({
  avatars,
  max = 5,
  size = "md",
}: AvatarStackProps) {
  const displayAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  return (
    <div className="flex -space-x-2">
      {displayAvatars.map((avatar, index) => (
        <motion.div
          key={avatar.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={`${sizeClasses[size]} rounded-full border-2 border-white bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white font-semibold shadow-sm`}
          style={{ zIndex: avatars.length - index }}
        >
          {avatar.src ? (
            <img
              src={avatar.src}
              alt={avatar.alt || "Avatar"}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span>{avatar.initials || "?"}</span>
          )}
        </motion.div>
      ))}
      {remainingCount > 0 && (
        <div
          className={`${sizeClasses[size]} rounded-full border-2 border-white bg-neutral-200 flex items-center justify-center text-neutral-700 font-semibold shadow-md`}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}

