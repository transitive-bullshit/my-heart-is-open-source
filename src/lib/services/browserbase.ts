import 'dotenv/config'

import Browserbase from '@browserbasehq/sdk'
import { type Browser, chromium } from 'playwright-core'

export const bb = new Browserbase({
  // eslint-disable-next-line no-process-env
  apiKey: process.env.BROWSERBASE_API_KEY
})

export async function getBrowser({
  // eslint-disable-next-line no-process-env
  projectId = process.env.BROWSERBASE_PROJECT_ID!
}: {
  projectId?: string
} = {}): Promise<Browser> {
  const session = await bb.sessions.create({
    projectId
  })

  return chromium.connectOverCDP(session.connectUrl)
}
