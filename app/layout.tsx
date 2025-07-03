import { ToastProvider, ToastViewport, ToastList } from '@heroui/toast';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Provider */}
          <ToastProvider placement="top-right">
            {children}

            {/* UNO de los dos, según tu versión */}
            <ToastViewport />   {/* v2.1+ */}
            {/* ó */}
            <ToastList />       {/* v2.0.x */}
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
