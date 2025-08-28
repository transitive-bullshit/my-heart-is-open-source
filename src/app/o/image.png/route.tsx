import assert from 'node:assert'

import type { NextRequest } from 'next/server'
import { imageDimensionsFromData } from 'image-dimensions'
import { notFound } from 'next/navigation'
import { ImageResponse } from 'next/og'
import parseCssColor from 'parse-css-color'

import { getElementScreenshot } from '@/lib/get-element-screenshot'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const url = searchParams.get('url')

  if (!url) {
    return notFound()
  }

  const selector = searchParams.get('s') || undefined
  const nth = Number.parseInt(searchParams.get('nth')!) || undefined
  const dpi = Number.parseInt(searchParams.get('dpi')!) || undefined
  const css = searchParams.get('css') || undefined
  const revalidateRaw = Number.parseInt(searchParams.get('r')!) || undefined
  const revalidate = revalidateRaw ? Math.max(revalidateRaw, 3600) : 86_400
  const format = 'png'
  const omitBackground = searchParams.get('ob') === 'true'

  console.log({ url, selector })

  // TODO: cache this heavily
  const screenshot = await getElementScreenshot({
    url,
    selector,
    format,
    css,
    nth,
    dpi,
    omitBackground
  })
  const imageSize = imageDimensionsFromData(screenshot)!
  assert.ok(imageSize?.width > 0 && imageSize?.height > 0, 'Invalid image size')

  const contentType = format === 'png' ? 'image/png' : 'image/jpeg'
  const padding = Number.parseInt(searchParams.get('p')!) || 0
  let width = Number.parseInt(searchParams.get('w')!) || undefined
  let height = Number.parseInt(searchParams.get('h')!) || undefined

  if (width || height || padding) {
    const screenshotUrl = `data:${contentType};base64,${screenshot.toString('base64')}`

    const br = Number.parseInt(searchParams.get('br')!) || undefined
    const bgRaw = searchParams.get('bg') || undefined
    const bgColor = bgRaw && parseCssColor(bgRaw) ? bgRaw : undefined

    if (!width && !height) {
      width = imageSize.width + padding * 2
      height = imageSize.height + padding * 2
    } else if (width && !height) {
      height = Math.round(width * (imageSize.height / imageSize.width))
    } else if (height && !width) {
      width = Math.round(height * (imageSize.width / imageSize.height))
    }

    console.log({ url, width, height, imageSize, padding, br, bgColor })

    return new ImageResponse(
      (
        <div
          style={{
            position: 'relative',
            background: bgColor || 'transparent',
            padding,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div
            style={{
              backgroundImage: `url(${screenshotUrl})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              width: '100%',
              height: '100%',
              display: 'flex',
              borderRadius: br
            }}
          />
        </div>
      ),
      {
        width,
        height,
        // debug: true,
        headers: {
          'Cache-Control': `public, max-age=${revalidate}`
        }
      }
    )
  }

  return new Response(new Uint8Array(screenshot), {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': `public, max-age=${revalidate}`
    }
  })
}
