import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amit Khayargoli - Full Stack Developer",
  description:
    "Portfolio of Amit Khayargoli, a full-stack developer building simple, functional and user-friendly digital experiences.",
  openGraph: {
    title: "Amit Khayargoli - Full Stack Developer",
    description:
      "Portfolio of Amit Khayargoli, a full-stack developer building simple, functional and user-friendly digital experiences.",
    type: "website",
  },
};

const themeScript = `
(function() {
  try {
    var t = localStorage.getItem('theme');
    if (!t) t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    // Remove the default class first so <html> never holds both "dark" and "light"
    var root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(t);
    root.style.colorScheme = t;
  } catch(e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Runs synchronously during parsing, before the first paint, so the
            correct theme class is applied before anything renders (no flash). */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
