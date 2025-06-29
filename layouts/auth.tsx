import { Head } from "./head";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black text-gray-900 dark:text-white">
      <Head />
      <main className="w-full max-w-md p-4">{children}</main>
    </div>
  );
}
