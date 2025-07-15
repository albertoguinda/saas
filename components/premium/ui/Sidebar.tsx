"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  position?: "left" | "right";
  width?: number | string;
  children: React.ReactNode;
  overlay?: boolean;
  header?: React.ReactNode;
  compact?: boolean;
  className?: string;
}

export default function Sidebar({
  isOpen,
  onClose,
  position = "left",
  width = 250,
  children,
  overlay = true,
  header,
  compact,
  className,
}: SidebarProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.activeElement as HTMLElement | null;
    const container = ref.current;
    const focusable = container?.querySelector<HTMLElement>(
      "a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex='-1'])",
    );

    focusable?.focus();

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab" && container) {
        const elements = container.querySelectorAll<HTMLElement>(
          "a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex='-1'])",
        );

        if (!elements.length) return;
        const first = elements[0];
        const last = elements[elements.length - 1];

        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        } else if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("keydown", handleKey);
      prev?.focus();
    };
  }, [isOpen, onClose]);

  const side = (
    <motion.aside
      key="sidebar"
      ref={ref}
      animate={{ x: 0 }}
      className={clsx(
        "fixed top-0 bottom-0 z-50 overflow-y-auto bg-white shadow-lg dark:bg-neutral-900",
        position === "left" ? "left-0" : "right-0",
        className,
      )}
      exit={{ x: position === "left" ? `-${width}` : width }}
      initial={{ x: position === "left" ? `-${width}` : width }}
      style={{ width }}
      transition={{ type: "tween" }}
    >
      {header && (
        <div className="border-b border-default-200 p-4 dark:border-default-700">
          {header}
        </div>
      )}
      <div className={clsx("p-4", compact && "space-y-2 text-sm")}>
        {children}
      </div>
    </motion.aside>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {overlay && (
            <motion.div
              key="overlay"
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-40 bg-black/50"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              onClick={onClose}
            />
          )}
          {side}
        </>
      )}
    </AnimatePresence>
  );
}
