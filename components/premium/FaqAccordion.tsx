import React, { useState } from "react";

const FAQS = [
  { q: "How does it work?", a: "Just sign up and start." },
  { q: "Can I cancel?", a: "Yes, anytime." },
  { q: "Is there support?", a: "Email and chat." },
];

export interface FaqAccordionProps {
  className?: string;
}

export default function FaqAccordion({ className }: FaqAccordionProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className={`space-y-2 ${className ?? ""}`.trim()}>
      {FAQS.map((item, i) => (
        <div key={item.q}>
          <button
            className="w-full text-left font-semibold"
            onClick={() => setOpen(open === i ? null : i)}
          >
            {item.q}
          </button>
          {open === i && (
            <p className="mt-1 text-sm text-default-500">{item.a}</p>
          )}
        </div>
      ))}
    </div>
  );
}
