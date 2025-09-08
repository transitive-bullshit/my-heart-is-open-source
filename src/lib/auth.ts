import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

import { db } from '@/db'

import { env } from './env'

export const auth = betterAuth({
  appName: 'My Heart is Open Source',
  database: drizzleAdapter(db, {
    provider: 'pg'
  }),
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET
    }
  }
})
