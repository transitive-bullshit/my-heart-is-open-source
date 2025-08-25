import type { NextRequest } from 'next/server'
// import { unstable_cache as cache } from 'next/cache'
import { notFound } from 'next/navigation'

import { getElementScreenshot } from '@/lib/get-element-screenshot'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const url = searchParams.get('url')

  console.log({ url })

  if (!url) {
    return notFound()
  }

  const selector = searchParams.get('s') || undefined
  // const width = Number.parseInt(searchParams.get('w')!) || undefined
  // const height = Number.parseInt(searchParams.get('h')!) || undefined
  const revalidateRaw = Number.parseInt(searchParams.get('r')!) || undefined
  const revalidate = revalidateRaw ? Math.max(revalidateRaw, 3600) : 86_400
  const format = 'png'

  // const url = 'https://github.com/transitive-bullshit'
  // const selector = '.js-calendar-graph > div'

  // const getScreenshot = cache(
  //   async () => {
  //     return getElementScreenshot({
  //       url,
  //       selector,
  //       format
  //     })
  //   },
  //   [url, format, selector].filter(Boolean),
  //   {
  //     revalidate
  //   }
  // )
  // const screenshot = await getScreenshot()

  const screenshot = await getElementScreenshot({
    url,
    selector,
    format
  })

  return new Response(new Uint8Array(screenshot), {
    headers: {
      'Content-Type': format === 'png' ? 'image/png' : 'image/jpeg',
      'Cache-Control': `public, max-age=${revalidate}`
    }
  })
}
