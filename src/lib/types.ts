export type GeneratedImageTemplate = 'billboard'

export type WorkflowImageType =
  | 'github-contribution-graph'
  | 'first-pass'
  | 'final'
  | (string & {})

export interface GeneratedImage {
  imageUrl: string
  width: number
  height: number
  blurDataUrl?: string
  contentType: string
  type: WorkflowImageType
  createdAt: string
  altText?: string
}

export interface GeneratedImageWorkflow {
  id: string
  githubUsername: string
  template: GeneratedImageTemplate
  prompt: string
  images: GeneratedImage[]
}
