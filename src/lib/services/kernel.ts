import 'dotenv/config'

import { Kernel } from '@onkernel/sdk'
import { type Browser, chromium } from 'playwright-core'

export const kernel = new Kernel()

export async function getBrowser(): Promise<Browser> {
  const kernelBrowser = await kernel.browsers.create()

  return chromium.connectOverCDP(kernelBrowser.cdp_ws_url)
}
