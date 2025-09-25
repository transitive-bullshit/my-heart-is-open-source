import {
  vWorkflowId,
  type WorkflowId,
  WorkflowManager,
  type WorkflowStatus
} from '@convex-dev/workflow'
import { v } from 'convex/values'
import { imageDimensionsFromData } from 'image-dimensions'
import ky from 'ky'

import { apiBaseUrl } from '@/lib/config'
import { openai } from '@/lib/services/openai'
import { templates } from '@/lib/templates'
import { assert, base64ToUint8Array, uint8ArrayToBase64 } from '@/lib/utils'

import type { Id } from './_generated/dataModel'
import type { Generation } from './types'
import { api, components, internal } from './_generated/api'
import {
  internalAction,
  internalMutation,
  mutation,
  query
} from './_generated/server'
import { GeneratedImageSchema } from './schema'

const createGenerationWorkflowArgs = {
  githubUsername: v.string(),
  template: v.optional(v.union(v.literal('billboard'))),
  prompt: v.optional(v.string())
}

const model = 'google/gemini-2.5-flash-image-preview'

export const defaultFinalPrompt = `
place this billboard naturally next to a curved highway outside of a large city at dusk with blurred time-lapse traffic. the focus of the scene is the billboard.
`.trim()

// kicks off a new workflow
export const createGenerationWorkflow = mutation({
  args: createGenerationWorkflowArgs,
  handler: async (
    ctx,
    { githubUsername, template = 'billboard', prompt = defaultFinalPrompt }
  ): Promise<{
    generationId: Id<'generations'>
    generationWorkflowId: WorkflowId
  }> => {
    const generationId = await ctx.db.insert('generations', {
      githubUsername,
      template,
      prompt,
      images: []
    })

    const generationWorkflowId = await workflow.start(
      ctx,
      internal.workflows.generationWorkflow,
      { generationId }
    )

    return { generationId, generationWorkflowId }
  }
})

const workflow = new WorkflowManager(components.workflow)

export const generationWorkflow = workflow.define({
  args: { generationId: v.id('generations') },
  handler: async (step, { generationId }): Promise<void> => {
    await step.runAction(
      internal.workflows.generateGithubContributionGraphImage,
      {
        generationId
      }
    )

    await step.runAction(internal.workflows.generateFirstPassImage, {
      generationId
    })

    await step.runAction(internal.workflows.generateSecondPassImage, {
      generationId
    })
  }
})

export const getGeneration = query({
  args: { generationId: v.id('generations') },
  handler: async (ctx, { generationId }): Promise<Generation | null> => {
    return ctx.db.get(generationId)
  }
})

export const getGenerationWorkflow = query({
  args: { generationWorkflowId: vWorkflowId },
  handler: async (
    ctx,
    { generationWorkflowId }
  ): Promise<WorkflowStatus | null> => {
    return workflow.status(ctx, generationWorkflowId)
  }
})

export const addGenerationImage = internalMutation({
  args: { generationId: v.id('generations'), image: GeneratedImageSchema },
  handler: async (ctx, { generationId, image }): Promise<void> => {
    const generation = await ctx.db.get(generationId)
    if (!generation) {
      throw new Error(`Generation not found ${generationId}`)
    }

    await ctx.db.replace(generationId, {
      ...generation,
      images: [...generation.images, image]
    })
  }
})

export const generateGithubContributionGraphImage = internalAction({
  args: { generationId: v.id('generations') },
  handler: async (ctx, { generationId }): Promise<void> => {
    const generation = await ctx.runQuery(api.workflows.getGeneration, {
      generationId
    })

    if (!generation) {
      throw new Error(`Generation not found ${generationId}`)
    }

    const { githubUsername } = generation

    console.log('>>> taking GH screenshot', githubUsername)
    const screenshot = await ky
      .get('api/screenshot', {
        prefixUrl: apiBaseUrl,
        searchParams: {
          githubUsername
        }
      })
      .arrayBuffer()
    const image = new Uint8Array(screenshot)

    const imageSize = imageDimensionsFromData(image)!
    assert(imageSize?.width > 0 && imageSize?.height > 0, 'Invalid image size')

    const contentType = 'image/png'
    const screenshotUrl = `data:${contentType};base64,${uint8ArrayToBase64(image)}`
    console.log('<<< taking GH screenshot', githubUsername)

    await ctx.runMutation(internal.workflows.addGenerationImage, {
      generationId,
      image: {
        imageUrl: screenshotUrl,
        width: imageSize.width,
        height: imageSize.height,
        contentType,
        type: 'github-contribution-graph',
        altText: `GitHub contribution graph for @${githubUsername}`
      }
    })
  }
})

export const generateFirstPassImage = internalAction({
  args: { generationId: v.id('generations') },
  handler: async (ctx, { generationId }): Promise<void> => {
    const generation = await ctx.runQuery(api.workflows.getGeneration, {
      generationId
    })

    if (!generation) {
      throw new Error(`Generation not found ${generationId}`)
    }

    const prompt = templates[generation.template]

    console.log('>>> generating first pass image', {
      generationId,
      githubUsername: generation.githubUsername,
      prompt
    })
    const completion = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: prompt
            },
            {
              type: 'image_url',
              image_url: {
                url: generation.images[0]!.imageUrl
              }
            }
          ]
        }
      ]
    })

    const imageUrl: string | undefined = (completion.choices[0]!.message as any)
      .images?.[0]?.image_url?.url
    assert(imageUrl, 'No image URL returned from first-pass')

    const imageParts = imageUrl!.split(',')
    const contentType = imageParts[0]?.includes('image/png')
      ? 'image/png'
      : 'image/jpeg'
    // const imageData = Buffer.from(imageUrl!.split(',')[1]!, 'base64')
    const imageData = base64ToUint8Array(imageUrl!.split(',')[1]!)
    const imageSize = imageDimensionsFromData(imageData)!
    assert(imageSize.width > 0 && imageSize.height > 0, 'Invalid image size')
    console.log('<<< generating first pass image', {
      generationId,
      githubUsername: generation.githubUsername,
      prompt
    })

    await ctx.runMutation(internal.workflows.addGenerationImage, {
      generationId,
      image: {
        imageUrl,
        width: imageSize.width,
        height: imageSize.height,
        contentType,
        type: 'first-pass'
      }
    })
  }
})

export const generateSecondPassImage = internalAction({
  args: { generationId: v.id('generations') },
  handler: async (ctx, { generationId }): Promise<void> => {
    const generation = await ctx.runQuery(api.workflows.getGeneration, {
      generationId
    })

    if (!generation) {
      throw new Error(`Generation not found ${generationId}`)
    }

    console.log('>>> generating second pass image', {
      generationId,
      githubUsername: generation.githubUsername,
      prompt: generation.prompt
    })

    const completion = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: generation.prompt
            },
            {
              type: 'image_url',
              image_url: {
                url: generation.images[1]!.imageUrl
              }
            }
          ]
        }
      ]
    })

    const imageUrl: string | undefined = (completion.choices[0]!.message as any)
      .images?.[0]?.image_url?.url
    assert(imageUrl, 'No image URL returned from first-pass')

    const imageParts = imageUrl!.split(',')
    const contentType = imageParts[0]?.includes('image/png')
      ? 'image/png'
      : 'image/jpeg'
    // const imageData = Buffer.from(imageUrl!.split(',')[1]!, 'base64')
    const imageData = base64ToUint8Array(imageUrl!.split(',')[1]!)
    const imageSize = imageDimensionsFromData(imageData)!
    assert(imageSize.width > 0 && imageSize.height > 0, 'Invalid image size')

    console.log('<<< generating second pass image', {
      generationId,
      githubUsername: generation.githubUsername,
      prompt: generation.prompt
    })

    await ctx.runMutation(internal.workflows.addGenerationImage, {
      generationId,
      image: {
        imageUrl,
        width: imageSize.width,
        height: imageSize.height,
        contentType,
        type: 'final'
      }
    })
  }
})
