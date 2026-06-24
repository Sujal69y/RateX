import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LearnScore",
  description: "Worth Your Time? Discover courses with outcome-first ratings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-clip">
        <header className="sticky top-0 z-30 border-b border-[color:var(--color-border)] bg-[color:var(--color-background)]/85 backdrop-blur-md">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <Link href="/" className="text-sm font-black uppercase tracking-[0.2em] text-[color:var(--color-primary)]">
              LearnScore
            </Link>
            <nav className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-[color:var(--color-text-secondary)] sm:justify-end sm:gap-2 md:text-sm">
              <Link className="rounded-full px-3 py-1.5 transition hover:bg-[color:var(--color-elevated)]" href="/discover">
                Discover
              </Link>
              <Link className="rounded-full px-3 py-1.5 transition hover:bg-[color:var(--color-elevated)]" href="/paths">
                Paths
              </Link>
              <Link
                className="rounded-full px-3 py-1.5 transition hover:bg-[color:var(--color-elevated)]"
                href="/compare?a=google-it-support-certificate&b=docker-kubernetes-udemy"
              >
                Compare
              </Link>
              <Link className="rounded-full px-3 py-1.5 transition hover:bg-[color:var(--color-elevated)]" href="/u/sujal">
                Profile
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
