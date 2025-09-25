import type { NextRequest } from 'next/server'
import { imageDimensionsFromData } from 'image-dimensions'
import { notFound } from 'next/navigation'

import { getElementScreenshot } from '@/lib/get-element-screenshot'
import { assert } from '@/lib/utils'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const githubUsername = searchParams.get('githubUsername')

  if (!githubUsername) {
    return notFound()
  }

  console.log('>>> taking GH screenshot', githubUsername)
  const screenshot = await getElementScreenshot({
    url: `https://github.com/${githubUsername}`,
    selector: '.js-calendar-graph > div',
    format: 'png'
  })
  console.log('<< taking GH screenshot', githubUsername)
  const imageSize = imageDimensionsFromData(screenshot)!
  assert(imageSize?.width > 0 && imageSize?.height > 0, 'Invalid image size')

  const outputContentType = 'image/png'
  // const screenshotUrl = `data:${contentType};base64,${screenshot.toString('base64')}`
  const outputImageData = new Uint8Array(screenshot)

  const revalidate = 86_400

  return new Response(outputImageData, {
    headers: {
      'Content-Type': outputContentType,
      'Cache-Control': `public, max-age=${revalidate}`
    }
  })
}
