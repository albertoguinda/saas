"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";

export default function AnalyticsProvider() {
  const pathname = usePathname();

  useEffect(() => {
    track("page_view");
  }, [pathname]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest(
        "[data-track]",
      ) as HTMLElement | null;
      const eventName = target?.getAttribute("data-track");
      if (eventName) {
        track(eventName);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  return null;
}
