import React, { useState } from "react";

const TESTIMONIALS = [
  { author: "Ana", text: "Great tool!" },
  { author: "Luis", text: "Amazing support." },
  { author: "Maria", text: "Highly recommend." },
];

export interface TestimonialCarouselProps {
  className?: string;
}

export default function TestimonialCarousel({
  className,
}: TestimonialCarouselProps) {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((index + 1) % TESTIMONIALS.length);

  return (
    <div className={`text-center ${className ?? ""}`.trim()}>
      <p className="italic mb-2">&quot;{TESTIMONIALS[index].text}&quot;</p>
      <span className="block text-sm text-default-500 mb-4">
        - {TESTIMONIALS[index].author}
      </span>
      <button className="text-primary-500 underline" onClick={next}>
        Next
      </button>
    </div>
  );
}
