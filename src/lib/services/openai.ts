import { OpenAI } from 'openai'

export const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  // eslint-disable-next-line no-process-env
  apiKey: process.env.OPENROUTER_API_KEY
})
