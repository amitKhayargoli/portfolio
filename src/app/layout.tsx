import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { ThemeInit } from "@/components/ui/ThemeInit";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amit Khayargoli — Full Stack Developer",
  description:
    "Portfolio of Amit Khayargoli, a full-stack developer building simple, functional and user-friendly digital experiences.",
  openGraph: {
    title: "Amit Khayargoli — Full Stack Developer",
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
    document.documentElement.classList.add(t);
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
      <body className="min-h-full flex flex-col">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
        <ThemeProvider>
          <ThemeInit />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
