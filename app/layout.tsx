import { Metadata } from 'next'

import { Toaster } from 'react-hot-toast'

import '@/app/globals.css'
import { fontMono, fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: {
    default: 'DYPCET Chatbot',
    template: `%s - DYPCET Chatbot`,
  },
  description: 'An AI-powered chatbot for DYPCET built with Groq and Next.js.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

// This is new
export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};


interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'font-sans antialiased',
          fontSans.variable,
          fontMono.variable
        )}
      >
        {children}
      </body>
    </html>
  )
}

// <Toaster />
//         <Providers attribute="class" defaultTheme="system" enableSystem>
//           <div className="flex min-h-screen flex-col">
//             {/* @ts-ignore */}
//             <Header />
//             <main className="flex flex-1 flex-col bg-muted/50">{children}</main>
//           </div>
//         </Providers>