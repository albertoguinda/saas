// app/layout.tsx
import "@/styles/globals.css";
import type { ReactNode } from "react";

import { ThemeProvider } from "next-themes";
import { ToastProvider, ToastViewport } from "@heroui/toast";

export const metadata = {
  title: "SaaS Web Builder",
  description: "Genera tu web en 3 pasos",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning lang="es">
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider enableSystem attribute="class" defaultTheme="system">
          <ToastProvider placement="top-right">
            {children}
            <ToastViewport />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
