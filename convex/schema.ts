import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export const GeneratedImageSchema = v.object({
  imageUrl: v.string(),
  width: v.number(),
  height: v.number(),
  blurDataUrl: v.optional(v.string()),
  contentType: v.string(),
  type: v.union(
    v.literal('github-contribution-graph'),
    v.literal('first-pass'),
    v.literal('final'),
    v.string()
  ),
  altText: v.optional(v.string())
})

export default defineSchema({
  generations: defineTable({
    githubUsername: v.string(),
    template: v.union(v.literal('billboard')),
    prompt: v.string(),
    images: v.array(GeneratedImageSchema)
  }).index('by_github_username', ['githubUsername'])
})
