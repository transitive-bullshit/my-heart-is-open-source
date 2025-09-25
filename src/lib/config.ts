/* eslint-disable no-process-env */
export const isServer = globalThis.window === undefined
export const isSafari =
  !isServer && /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

export const title = 'My Heart is Open Source'
export const description = 'TODO'
export const domain = 'myheartisopensource.com'

export const author = 'Travis Fischer'
export const authorTwitterUsername = 'transitive_bs'
export const copyright = `© ${new Date().getFullYear()} Transitive Bullshit. All rights reserved.`

// external urls
export const twitterUrl = `https://x.com/${authorTwitterUsername}`
export const githubUrl =
  'https://github.com/transitive-bullshit/my-heart-is-open-source'

export const env =
  process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.NODE_ENV ?? 'development'
export const isVercel = !!(
  process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.VERCEL
)
export const isDev = env === 'development' && !isVercel
export const isProd = env === 'production'
export const isTest = env === 'test'

export const port = process.env.PORT || '3000'
export const prodUrl = `https://${domain}`
export const baseUrl = isDev ? `http://localhost:${port}` : prodUrl
export const vercelUrl =
  process.env.VERCEL_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL
export const apiBaseUrl = baseUrl
