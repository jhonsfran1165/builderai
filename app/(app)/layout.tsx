import { inter, satoshi } from "@/assets/fonts"
import { Metadata } from "next"

import { ThemeProvider } from "@/components/layout/theme-provider"
import { TailwindIndicator } from "@/components/shared/tailwind-indicator"
import { Toaster } from "@/components/ui/toaster"
import { layoutConfig } from "@/lib/config/layout"
import { cn } from "@/lib/utils"

import "@/styles/globals.css"

// TODO: configure metadata for all pages
export const metadata: Metadata = {
  title: {
    default: layoutConfig.name,
    template: `%s - ${layoutConfig.name}`,
  },
  description: layoutConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
  ],
  authors: [
    {
      name: "shadcn",
      url: "https://shadcn.com",
    },
  ],
  creator: "shadcn",
  // themeColor: [
  //   { media: "(prefers-color-scheme: light)", color: "white" },
  //   { media: "(prefers-color-scheme: dark)", color: "black" },
  // ],
  // openGraph: {
  //   type: "website",
  //   locale: "en_US",
  //   url: siteConfig.url,
  //   title: siteConfig.name,
  //   description: siteConfig.description,
  //   siteName: siteConfig.name,
  //   images: [
  //     {
  //       url: siteConfig.ogImage,
  //       width: 1200,
  //       height: 630,
  //       alt: siteConfig.name,
  //     },
  //   ],
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: siteConfig.name,
  //   description: siteConfig.description,
  //   images: [siteConfig.ogImage],
  //   creator: "@shadcn",
  // },
  // icons: {
  //   icon: "/favicon.ico",
  //   shortcut: "/favicon-16x16.png",
  //   apple: "/apple-touch-icon.png",
  // },
  // manifest: `${siteConfig.url}/site.webmanifest`,
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>

      <html
        lang="en"
        suppressHydrationWarning
      >
        <head />
        <body
          className={cn(
            "min-h-screen bg-background antialiased",
            satoshi.variable,
            inter.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-col">{children}</div>
            <TailwindIndicator />
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </>

  )
}
