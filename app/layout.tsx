// app/layout.tsx
import "@/styles/globals.css";
import type { ReactNode } from "react";

import { ThemeProvider } from "next-themes";
import { ToastProvider, ToastViewport } from "@heroui/toast";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { locales } from "@/i18n";

export const metadata = {
  title: "SaaS Web Builder",
  description: "Genera tu web en 3 pasos",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getLocale();

  if (!locales.includes(locale as any)) notFound();

  const messages = await getMessages();

  return (
    <html suppressHydrationWarning lang={locale}>
      <body className="min-h-screen bg-background text-foreground">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider enableSystem attribute="class" defaultTheme="system">
            <ToastProvider placement="top-right">
              {children}
              <ToastViewport />
            </ToastProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
