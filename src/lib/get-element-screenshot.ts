import { getBrowser } from './services/browserbase'

export async function getElementScreenshot({
  url,
  selector,
  quality,
  format
}: {
  url: string
  selector?: string
  quality?: number
  format?: 'png' | 'jpg' | 'jpeg'
}) {
  const browser = await getBrowser()

  try {
    const ctx = browser.contexts()[0]!
    const page = ctx.pages()[0]!

    await page.goto(url)

    const element = selector ? page.locator(selector).first() : page
    const screenshot = await element.screenshot({
      animations: 'disabled',
      caret: 'hide',
      type: format === 'png' ? 'png' : 'jpeg',
      quality,
      timeout: 15_000
    })

    return screenshot
  } finally {
    await browser.close()
  }
}
