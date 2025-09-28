import { devices } from 'playwright-core'

// import { getBrowser } from './services/browserbase'
import { getBrowser } from './services/kernel'

export async function getElementScreenshot({
  url,
  selector = 'body',
  nth = 0,
  format = 'png',
  quality,
  dpi = 2,
  css,
  omitBackground = false
}: {
  url: string
  selector?: string
  nth?: number
  quality?: number
  format: 'png' | 'jpg' | 'jpeg'
  dpi?: number
  css?: string
  omitBackground?: boolean
}) {
  const browser = await getBrowser()

  try {
    // TODO: BrowserBase has a bug where high dpi screenshots are not offset correctly
    // const ctx = await browser.newContext({ ...devices['Desktop Chrome HiDPI'] })
    const ctx =
      dpi === 1
        ? (browser.contexts()[0] ?? (await browser.newContext()))
        : await browser.newContext({ ...devices['Desktop Chrome HiDPI'] })
    const page = ctx.pages()[0] ?? (await ctx.newPage())

    await page.goto(url)
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.addStyleTag({
      content: `
      *, *::before, *::after {
        animation: none !important; transition: none !important;
      }

      body, html {
        overflow-x: hidden !important;
      }

      ${selector} {
        overflow-x: hidden !important;
      }
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
      scale: 'device',
      timeout: 15_000,
      omitBackground
    })

    return screenshot
  } finally {
    await browser.close()
  }
}
