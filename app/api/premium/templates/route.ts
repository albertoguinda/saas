import { NextRequest, NextResponse } from "next/server";

interface Template {
  name: string;
  description: string;
  image: string;
  tags: string[];
  type: string;
  model?: string;
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
    name: "BIM 3D Viewer",
    description: "Interact with BIM models in 3D and VR",
    image: "https://placehold.co/400x300?text=BIM+Viewer",
    tags: ["3d", "bim"],
    type: "viewer",
    model: "",
  },
];

export async function GET(_req: NextRequest) {
  return NextResponse.json({ templates });
}
