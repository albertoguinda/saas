"use client";

import type { LucideIcon } from "lucide-react";

import { motion } from "framer-motion";
import { Card as HUCard } from "@heroui/card";

import { cn } from "@/lib/utils";

export interface CardProps {
  icon?: LucideIcon;
  title: string;
  desc: string;
  imageSrc?: string;
  variant?: "elevated" | "outlined" | "withImage";
  className?: string;
}

export default function Card({
  icon: Icon,
  title,
  desc,
  imageSrc,
  variant = "elevated",
  className,
}: CardProps) {
  const variantClasses = {
    elevated: "shadow-lg",
    outlined: "border",
    withImage: "p-0 overflow-hidden",
  }[variant];

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <HUCard
        className={cn(
          "flex flex-col items-center gap-2 p-6 text-center",
          variantClasses,
          className,
        )}
      >
        {variant === "withImage" && imageSrc ? (
          <img alt="" className="h-40 w-full object-cover" src={imageSrc} />
        ) : null}
        {Icon ? <Icon className="h-8 w-8 text-primary" /> : null}
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-default-500">{desc}</p>
      </HUCard>
    </motion.div>
  );
}
