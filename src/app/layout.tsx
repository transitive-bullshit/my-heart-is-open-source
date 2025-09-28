import './globals.css'

import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Geist } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Toaster } from 'sonner'

import { Bootstrap } from '@/components/bootstrap'
import { Footer } from '@/components/footer'
import * as config from '@/lib/config'

import Providers from './providers'

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  authors: [{ name: config.author, url: config.twitterUrl }],
  metadataBase: new URL(config.prodUrl),
  openGraph: {
    title: config.title,
    description: config.description,
    siteName: config.title,
    locale: 'en_US',
    type: 'website',
    url: config.prodUrl
  },
  twitter: {
    card: 'summary_large_image',
    creator: `@${config.authorTwitterUsername}`,
    title: config.title,
    description: config.description
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${geist.variable} antialiased`}>
        <NuqsAdapter>
          <Providers>
            <div className='relative w-full min-h-[100vh] flex flex-col items-center'>
              {/* <Header /> */}

              <main className='relative w-full flex-1 flex flex-col items-center gap-16 md:gap-32 pb-16 overflow-hidden'>
                {children}
              </main>

              <Toaster richColors duration={5000} />
              <Footer />
            </div>

            <Analytics />
            <Bootstrap />
          </Providers>
        </NuqsAdapter>
      </body>
    </html>
  )
}
