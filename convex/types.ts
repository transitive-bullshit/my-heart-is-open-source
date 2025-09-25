import type { Doc } from './_generated/dataModel'

export type Generation = Doc<'generations'>

export type GeneratedImage = Generation['images'][number]

export type GeneratedImageTemplate = Generation['template']
