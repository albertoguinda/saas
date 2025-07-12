import { NextRequest, NextResponse } from "next/server";

interface Template {
  name: string;
  description: string;
  image: string;
  tags: string[];
  type: string;
  demo?: string;
}

const templates: Template[] = [
  {
    name: "Portfolio Modern",
    description: "Clean layout for designers",
    image: "https://placehold.co/400x300?text=Premium+Template",
    tags: ["portfolio", "responsive"],
    type: "portfolio",
  },
  {
    name: "Startup Landing",
    description: "Hero section with pricing tables",
    image: "https://placehold.co/400x300?text=Premium+Template",
    tags: ["landing", "saas"],
    type: "landing",
  },
  {
    name: "Blog Minimal",
    description: "Accessible blog with dark mode",
    image: "https://placehold.co/400x300?text=Premium+Template",
    tags: ["blog"],
    type: "blog",
  },
  {
    name: "Premium Chat",
    description: "Real time support chat component",
    image: "https://placehold.co/400x300?text=Chat",
    tags: ["chat", "support"],
    type: "component",
    demo: "/demo/chat",
  },
];

export async function GET(_req: NextRequest) {
  return NextResponse.json({ templates });
}
