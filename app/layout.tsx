import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";

export const metadata: Metadata = {
  title: "Rafiki SMS - Enterprise SMS API Platform for Tanzania",
  description:
    "Queue, send, and track SMS with vendor API keys, sender ID governance, and delivery reports your team can trust. Purpose-built for Tanzania.",
  keywords: ["SMS API", "Tanzania SMS", "SMS Gateway", "Bulk SMS", "Rafiki SMS"],
  authors: [{ name: "Rafiki SMS" }],
  openGraph: {
    title: "Rafiki SMS - Enterprise SMS API Platform for Tanzania",
    description:
      "Queue, send, and track SMS with vendor API keys, sender ID governance, and delivery reports your team can trust.",
    siteName: "Rafiki SMS",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rafiki SMS - Enterprise SMS API Platform for Tanzania",
    description:
      "Queue, send, and track SMS with vendor API keys, sender ID governance, and delivery reports.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
