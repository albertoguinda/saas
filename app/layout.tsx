// app/layout.tsx
import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'SaaS Web Builder',
  description: 'Genera tu web en 3 pasos',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        {/* ThemeProvider añade o quita la clase `dark` en el lado cliente */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
