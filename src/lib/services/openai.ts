import { OpenAI } from 'openai'

import { env } from '../env'

export const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: env.OPENROUTER_API_KEY
})
