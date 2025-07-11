import { Html, Head, Main, NextScript } from "next/document";

import { cn } from "@/lib/utils";
import { fontSans } from "@/config/fonts";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
