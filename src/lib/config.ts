/* eslint-disable no-process-env */
export const isServer = globalThis.window === undefined
export const isSafari =
  !isServer && /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

export const title = 'Embed Anything'
export const description = 'TODO'
export const domain =
  process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ??
  'embed-anything.vercel.app'

export const author = 'Travis Fischer'
export const authorTwitterUsername = 'transitive_bs'
export const copyright = `© ${new Date().getFullYear()} Transitive Bullshit. All rights reserved.`

// external urls
export const twitterUrl = `https://x.com/${authorTwitterUsername}`
export const githubUrl = 'https://github.com/transitive-bullshit/embed-anything'

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
// export const webBaseUrl = isDev || !vercelUrl ? baseUrl : `https://${vercelUrl}`
export const apiBaseUrl = process.env.NEXT_PUBLIC_AGENTIC_API_BASE_URL!
export const gatewayBaseUrl = process.env.NEXT_PUBLIC_AGENTIC_GATEWAY_BASE_URL!
