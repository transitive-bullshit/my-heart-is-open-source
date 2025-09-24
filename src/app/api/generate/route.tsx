import type { NextRequest } from 'next/server'
import { notFound } from 'next/navigation'

import {
  type GenerateImageWorkflowOptions,
  generateWorkflowImage
} from '@/lib/generate-workflow-image'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const body = (await req.json()) as GenerateImageWorkflowOptions

  if (!body?.githubUsername) {
    return notFound()
  }

  const generatedImageWorkflow = await generateWorkflowImage(body)

  return Response.json(generatedImageWorkflow)
}
