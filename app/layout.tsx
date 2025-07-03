// app/layout.tsx
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { ToastProvider, ToastViewport } from "@heroui/toast";
import type { ReactNode } from "react";
import AnalyticsProvider from "@/components/Analytics";

export const metadata = {
  title: "SaaS Web Builder",
  description: "Genera tu web en 3 pasos",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ToastProvider placement="top-right">
            <AnalyticsProvider />
            {children}
            <ToastViewport />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
