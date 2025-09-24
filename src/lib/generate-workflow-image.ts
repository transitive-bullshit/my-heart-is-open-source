import assert from 'node:assert'

import { imageDimensionsFromData } from 'image-dimensions'
import { nanoid } from 'nanoid'

import { getElementScreenshot } from '@/lib/get-element-screenshot'

import type {
  GeneratedImage,
  GeneratedImageTemplate,
  GeneratedImageWorkflow
} from './types'
import { openai } from './services/openai'
import { templates } from './templates'

export const runtime = 'nodejs'

const model = 'google/gemini-2.5-flash-image-preview'

const defaultFinalPrompt = `
place this billboard naturally next to a curved highway outside of a large city at dusk with blurred time-lapse traffic. the focus of the scene is the billboard.
`.trim()

export async function generateWorkflowImage({
  githubUsername,
  template = 'billboard',
  prompt = defaultFinalPrompt
}: {
  githubUsername: string
  template?: GeneratedImageTemplate
  prompt?: string
}): Promise<GeneratedImageWorkflow> {
  console.log('generating workflow image for github user', githubUsername)
  const generatedImageWorkflow: GeneratedImageWorkflow = {
    id: nanoid(),
    githubUsername,
    images: [],
    template,
    prompt
  }

  // TODO: cache this heavily
  const screenshot = await getElementScreenshot({
    url: `https://github.com/${githubUsername}`,
    selector: '.js-calendar-graph > div',
    format: 'jpg'
  })
  const imageSize = imageDimensionsFromData(screenshot)!
  assert.ok(imageSize?.width > 0 && imageSize?.height > 0, 'Invalid image size')

  const contentType = 'image/jpeg'
  const screenshotUrl = `data:${contentType};base64,${screenshot.toString('base64')}`

  const githubContributionGraphImage: GeneratedImage = {
    imageUrl: screenshotUrl,
    width: imageSize.width,
    height: imageSize.height,
    contentType,
    type: 'github-contribution-graph',
    createdAt: new Date().toISOString(),
    altText: `GitHub contribution graph for @${githubUsername}`
  }
  generatedImageWorkflow.images.push(githubContributionGraphImage)

  await generateWorkflowImageFirstPass(generatedImageWorkflow)

  return generatedImageWorkflow
}

export async function generateWorkflowImageFirstPass(
  generatedImageWorkflow: GeneratedImageWorkflow
) {
  const prompt = templates[generatedImageWorkflow.template]

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
              url: generatedImageWorkflow.images[0]!.imageUrl
            }
          }
        ]
      }
    ]
  })

  try {
    const imageUrl: string | undefined = (completion.choices[0]!.message as any)
      .images?.[0]?.image_url?.url
    assert.ok(imageUrl, 'No image URL returned from first-pass')

    const imageParts = imageUrl!.split(',')
    const contentType = imageParts[0]?.includes('image/png')
      ? 'image/png'
      : 'image/jpeg'
    const imageData = Buffer.from(imageUrl!.split(',')[1]!, 'base64')
    const imageSize = imageDimensionsFromData(imageData)!
    assert.ok(imageSize.width > 0 && imageSize.height > 0, 'Invalid image size')

    const image: GeneratedImage = {
      imageUrl,
      width: imageSize.width,
      height: imageSize.height,
      contentType,
      type: 'first-pass',
      createdAt: new Date().toISOString()
    }
    generatedImageWorkflow.images.push(image)
  } catch (err) {
    console.error(
      `error generating first pass image for user ${generatedImageWorkflow.githubUsername}`,
      err,
      JSON.stringify(completion, null, 2)
    )
    throw err
  }
}

export async function generateWorkflowImageFinalPass(
  generatedImageWorkflow: GeneratedImageWorkflow
) {
  const completion = await openai.chat.completions.create({
    model,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: generatedImageWorkflow.prompt
          },
          {
            type: 'image_url',
            image_url: {
              url: generatedImageWorkflow.images[1]!.imageUrl
            }
          }
        ]
      }
    ]
  })

  try {
    const imageUrl: string | undefined = (completion.choices[0]!.message as any)
      .images?.[0]?.image_url?.url
    assert.ok(imageUrl, 'No image URL returned from first-pass')

    const imageParts = imageUrl!.split(',')
    const contentType = imageParts[0]?.includes('image/png')
      ? 'image/png'
      : 'image/jpeg'
    const imageData = Buffer.from(imageUrl!.split(',')[1]!, 'base64')
    const imageSize = imageDimensionsFromData(imageData)!
    assert.ok(imageSize.width > 0 && imageSize.height > 0, 'Invalid image size')

    const image: GeneratedImage = {
      imageUrl,
      width: imageSize.width,
      height: imageSize.height,
      contentType,
      type: 'final',
      createdAt: new Date().toISOString()
    }
    generatedImageWorkflow.images.push(image)
  } catch (err) {
    console.error(
      `error generating second pass image for user ${generatedImageWorkflow.githubUsername}`,
      err,
      JSON.stringify(completion, null, 2)
    )
    throw err
  }
}
