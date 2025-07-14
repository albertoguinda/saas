"use client";

import { motion } from "framer-motion";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

import { cn } from "@/lib/utils";

export interface BannerProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  imageSrc?: string;
  animationType?: "fade" | "slide";
  className?: string;
}

export default function Banner({
  title,
  subtitle,
  ctaText,
  ctaHref = "#",
  imageSrc,
  animationType = "fade",
  className,
}: BannerProps) {
  return (
    <section
      className={cn("flex flex-col items-center gap-6 text-center", className)}
    >
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
        initial={{ opacity: 0, y: animationType === "slide" ? 40 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
        {subtitle ? <p className="text-default-500">{subtitle}</p> : null}
        {ctaText ? (
          <Button as={Link} color="primary" href={ctaHref} size="lg">
            {ctaText}
          </Button>
        ) : null}
      </motion.div>
      {imageSrc ? (
        <motion.img
          alt=""
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto max-w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          src={imageSrc}
          transition={{ duration: 0.6 }}
        />
      ) : null}
    </section>
  );
}
