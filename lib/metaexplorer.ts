export type MetaInput = {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
};

export function generateMeta({
  title = "SaaS Web Builder",
  description = "Genera tu web en 3 pasos",
  url = "https://example.com",
  image = "/og.png",
}: MetaInput = {}) {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
