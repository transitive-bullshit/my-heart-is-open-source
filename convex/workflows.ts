import {
  vWorkflowId,
  type WorkflowId,
  WorkflowManager,
  type WorkflowStatus
} from '@convex-dev/workflow'
import { v } from 'convex/values'

import type { Id } from './_generated/dataModel'
import type { Generation } from './types'
import { components, internal } from './_generated/api'
import {
  internalMutation,
  internalQuery,
  mutation,
  query
} from './_generated/server'
import { GeneratedImageSchema, GenerationStatus } from './schema'

const createGenerationWorkflowArgs = {
  githubUsername: v.string(),
  template: v.optional(v.union(v.literal('billboard'))),
  prompt: v.optional(v.string())
}

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
      internal.nodeWorkflows.generateGithubContributionGraphImage,
      {
        generationId
      }
    )

    await step.runAction(internal.nodeWorkflows.generateFirstPassImage, {
      generationId
    })

    await step.runAction(internal.nodeWorkflows.generateSecondPassImage, {
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

export const getLatestGenerationForGitHubUser = internalQuery({
  args: { githubUsername: v.string(), status: GenerationStatus },
  handler: async (
    ctx,
    { githubUsername, status }
  ): Promise<Generation | null> => {
    return ctx.db
      .query('generations')
      .withIndex('by_github_username_and_status', (q) =>
        q.eq('githubUsername', githubUsername).eq('status', status)
      )
      .order('desc')
      .first()
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
      status: image.type,
      images: [...generation.images, image]
    })
  }
})
