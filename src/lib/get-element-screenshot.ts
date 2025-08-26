// import { devices } from 'playwright-core'

import { getBrowser } from './services/browserbase'

export async function getElementScreenshot({
  url,
  selector = 'body',
  quality,
  format = 'png',
  omitBackground = false
}: {
  url: string
  selector?: string
  quality?: number
  format: 'png' | 'jpg' | 'jpeg'
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

    const element = page.locator(selector)
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
