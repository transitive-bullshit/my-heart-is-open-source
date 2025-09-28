import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export const GenerationStatus = v.union(
  v.literal('github-contribution-graph'),
  v.literal('first-pass'),
  v.literal('final'),
  v.string()
)

export const GeneratedImageSchema = v.object({
  imageUrl: v.string(),
  width: v.number(),
  height: v.number(),
  blurDataUrl: v.optional(v.string()),
  contentType: v.string(),
  type: GenerationStatus,
  altText: v.optional(v.string())
})

export default defineSchema({
  generations: defineTable({
    githubUsername: v.string(),
    template: v.union(v.literal('billboard')),
    prompt: v.string(),
    status: v.optional(GenerationStatus),
    images: v.array(GeneratedImageSchema)
  })
    .index('by_github_username', ['githubUsername'])
    .index('by_github_username_and_status', ['githubUsername', 'status'])
})
