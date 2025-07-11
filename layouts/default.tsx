import { Link } from "@heroui/link";

import AppNavbar from "@/components/navbar";

import { Head } from "./head";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Head />
      <AppNavbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-20">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-4">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://www.heroui.com"
          title="HeroUI homepage"
        >
          <span className="text-default-600">Powered by</span>
          <p className="text-primary font-semibold">HeroUI</p>
        </Link>
      </footer>
    </div>
  );
}
