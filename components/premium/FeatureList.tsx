import React from "react";

export interface FeatureListProps {
  features: string[];
  className?: string;
}

export default function FeatureList({ features, className }: FeatureListProps) {
  return (
    <ul className={`grid gap-2 list-disc pl-5 ${className ?? ""}`.trim()}>
      {features.map((f) => (
        <li key={f}>{f}</li>
      ))}
    </ul>
  );
}
