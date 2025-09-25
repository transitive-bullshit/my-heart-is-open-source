'use client'

import type { ReactNode } from 'react'
import { ConvexProvider, ConvexReactClient } from 'convex/react'

import { ThemeProvider } from '@/components/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'

// eslint-disable-next-line no-process-env
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='light'
      disableTransitionOnChange
    >
      <TooltipProvider>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </TooltipProvider>
    </ThemeProvider>
  )
}

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>
}
