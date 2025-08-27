// import { devices } from 'playwright-core'

import { getBrowser } from './services/browserbase'

export async function getElementScreenshot({
  url,
  selector = 'body',
  nth = 0,
  format = 'png',
  quality,
  css,
  omitBackground = false
}: {
  url: string
  selector?: string
  nth?: number
  quality?: number
  format: 'png' | 'jpg' | 'jpeg'
  css?: string
  omitBackground?: boolean
}) {
  const browser = await getBrowser()

  try {
    // TODO: it looks like a BrowserBase bug where high dpi screenshots are not offset correctly
    // const ctx = await browser.newContext({ ...devices['Desktop Chrome HiDPI'] })
    // const page = await ctx.newPage()

    const ctx = browser.contexts()[0]!
    const page = ctx.pages()[0]!

    await page.goto(url)
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.addStyleTag({
      content: `
      *, *::before, *::after {
        animation: none !important; transition: none !important;
      }
      html { scroll-behavior: auto !important; }
    `
    })

    if (css) {
      await page.addStyleTag({ content: css })
    }

    const element = page.locator(selector).nth(nth)
    await element.scrollIntoViewIfNeeded()

    const screenshot = await element.screenshot({
      animations: 'disabled',
      caret: 'hide',
      type: format === 'png' ? 'png' : 'jpeg',
      quality,
      scale: 'css',
      timeout: 15_000,
      omitBackground
    })

    return screenshot
  } finally {
    await browser.close()
  }
}
