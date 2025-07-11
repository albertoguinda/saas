// pages/_app.tsx
import type { AppProps } from "next/app";

import { SessionProvider } from "next-auth/react";
import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ToastProvider, ToastViewport } from "@heroui/toast";
import { useRouter } from "next/router";

import { fontSans, fontMono } from "@/config/fonts";
import "@/styles/globals.css";

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <SessionProvider session={pageProps.session}>
      <HeroUIProvider navigate={router.push}>
        <NextThemesProvider
          enableSystem
          attribute="class"
          defaultTheme="system"
        >
          <ToastProvider placement="top-right">
            <Component {...pageProps} />
            <ToastViewport />
          </ToastProvider>
        </NextThemesProvider>
      </HeroUIProvider>
    </SessionProvider>
  );
}
