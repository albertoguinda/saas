"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { track } from "@/lib/track";

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    track("page_view", { page: pathname });
  }, [pathname]);

  return null;
}
