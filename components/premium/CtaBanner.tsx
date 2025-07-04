import React from "react";
import { Link } from "@heroui/link";

export interface CtaBannerProps {
  href: string;
  text: string;
  button: string;
  className?: string;
}

export default function CtaBanner({
  href,
  text,
  button,
  className,
}: CtaBannerProps) {
  return (
    <div
      className={`p-6 text-center bg-primary-50 rounded-lg ${className ?? ""}`.trim()}
    >
      <p className="mb-4 font-medium">{text}</p>
      <Link className="px-4 py-2 bg-primary-500 text-white rounded" href={href}>
        {button}
      </Link>
    </div>
  );
}
