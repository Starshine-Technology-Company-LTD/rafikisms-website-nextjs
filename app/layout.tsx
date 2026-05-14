import React from "react"
import type { Metadata } from 'next'
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { landingContent } from '@/components/landing/content'
import { ThemeProvider } from '@/components/theme-provider'
import { fetchPublicBranding } from '@/lib/rafiki-public-api'

const instrumentSans = Instrument_Sans({ 
  subsets: ["latin"],
  variable: '--font-instrument'
});

const instrumentSerif = Instrument_Serif({ 
  subsets: ["latin"],
  weight: "400",
  variable: '--font-instrument-serif'
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains'
});

export async function generateMetadata(): Promise<Metadata> {
  const branding = await fetchPublicBranding()
  const fav = branding?.favicon_url?.trim()
  return {
    title: landingContent.metadata.title,
    description: landingContent.metadata.description,
    icons: fav
      ? {
          icon: [{ url: fav }],
          apple: [{ url: fav }],
        }
      : {
          icon: [{ url: '/rafiki-leter.svg', type: 'image/svg+xml' }],
          apple: [{ url: '/rafiki-leter.svg', type: 'image/svg+xml' }],
        },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider>
          {/* Page-wide blueprint grid - sits behind every route */}
          <div aria-hidden className="bg-grid-lines" />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
