'use node'

import { v } from 'convex/values'
import sharp from 'sharp'

import { getElementScreenshot } from '@/lib/get-element-screenshot'
import { openai } from '@/lib/services/openai'
import { templates } from '@/lib/templates'
import { assert, base64ToUint8Array, bufferLikeToImageBlob } from '@/lib/utils'

import { api, internal } from './_generated/api'
import { internalAction } from './_generated/server'

const model = 'google/gemini-2.5-flash-image-preview'
const oneDayInMs = 86_400_000

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

    const latestGeneration = await ctx.runQuery(
      internal.workflows.getLatestGenerationForGitHubUser,
      {
        githubUsername,
        status: 'final'
      }
    )
    if (
      latestGeneration &&
      latestGeneration._creationTime > generation._creationTime - oneDayInMs
    ) {
      const image = latestGeneration.images.find(
        (image) => image.type === 'github-contribution-graph'
      )
      if (image) {
        await ctx.runMutation(internal.workflows.addGenerationImage, {
          generationId,
          image
        })
        return
      }
    }

    console.log('>>> taking GH screenshot', { githubUsername })
    const screenshot = await getElementScreenshot({
      url: `https://github.com/${githubUsername}`,
      selector: '.js-calendar-graph > div',
      format: 'png'
    })

    // const screenshot = await ky
    //   .get('api/screenshot', {
    //     prefixUrl: apiBaseUrl,
    //     searchParams: {
    //       githubUsername
    //     }
    //   })
    //   .arrayBuffer()
    // const image = new Uint8Array(screenshot)
    // const contentType = 'image/png'

    const outputImage = await sharp(screenshot)
      .jpeg({ quality: 80 })
      .toBuffer({ resolveWithObject: true })

    const outputContentType = 'image/jpeg'
    // const imageSize = imageDimensionsFromData(outputImage)!
    // assert(imageSize?.width > 0 && imageSize?.height > 0, 'Invalid image size')
    assert(
      outputImage.info.width > 0 && outputImage.info.height > 0,
      'Invalid image size'
    )

    console.log('gh image', {
      githubUsername,
      info: outputImage.info,
      outputContentType
    })

    const storageId = await ctx.storage.store(
      bufferLikeToImageBlob(outputImage.data, outputContentType)
    )
    assert(storageId)
    const imageUrl = await ctx.storage.getUrl(storageId)
    assert(imageUrl)
    // const screenshotUrl = `data:${contentType};base64,${uint8ArrayToBase64(image)}`
    console.log('<<< taking GH screenshot', { githubUsername, imageUrl })

    await ctx.runMutation(internal.workflows.addGenerationImage, {
      generationId,
      image: {
        imageUrl,
        width: outputImage.info.width,
        height: outputImage.info.height,
        contentType: outputContentType,
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

    const { githubUsername } = generation
    // const latestGeneration = await ctx.runQuery(
    //   internal.workflows.getLatestGenerationForGitHubUser,
    //   {
    //     githubUsername,
    //     status: 'final'
    //   }
    // )
    // if (
    //   latestGeneration &&
    //   latestGeneration._creationTime > generation._creationTime - oneDayInMs
    // ) {
    //   const image = latestGeneration.images.find(
    //     (image) => image.type === 'first-pass'
    //   )
    //   if (image) {
    //     await ctx.runMutation(internal.workflows.addGenerationImage, {
    //       generationId,
    //       image
    //     })
    //     return
    //   }
    // }

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

    const imageDataUrl: string | undefined = (
      completion.choices[0]!.message as any
    ).images?.[0]?.image_url?.url
    assert(imageDataUrl, 'No image URL returned from first-pass')

    // const imageParts = imageDataUrl!.split(',')
    // const contentType = imageParts[0]?.includes('image/png')
    //   ? 'image/png'
    //   : 'image/jpeg'
    // const imageData = Buffer.from(imageDataUrl!.split(',')[1]!, 'base64')
    const imageData = base64ToUint8Array(imageDataUrl!.split(',')[1]!)
    const outputImage = await sharp(imageData)
      .jpeg({ quality: 80 })
      .toBuffer({ resolveWithObject: true })
    const outputContentType = 'image/jpeg'

    const storageId = await ctx.storage.store(
      bufferLikeToImageBlob(outputImage.data, outputContentType)
    )
    assert(storageId)
    const imageUrl = await ctx.storage.getUrl(storageId)
    assert(imageUrl)

    console.log('<<< generating first pass image', {
      generationId,
      githubUsername: generation.githubUsername,
      prompt,
      imageUrl,
      contentType: outputContentType
    })

    await ctx.runMutation(internal.workflows.addGenerationImage, {
      generationId,
      image: {
        imageUrl,
        width: outputImage.info.width,
        height: outputImage.info.height,
        contentType: outputContentType,
        altText: `First pass billboard image for @${githubUsername}`,
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

    const { githubUsername, prompt } = generation

    console.log('>>> generating second pass image', {
      generationId,
      githubUsername,
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
                url: generation.images[1]!.imageUrl
              }
            }
          ]
        }
      ]
    })

    const imageDataUrl: string | undefined = (
      completion.choices[0]!.message as any
    ).images?.[0]?.image_url?.url
    assert(imageDataUrl, 'No image URL returned from first-pass')

    // const imageParts = imageDataUrl!.split(',')
    // const contentType = imageParts[0]?.includes('image/png')
    //   ? 'image/png'
    //   : 'image/jpeg'
    // const imageData = Buffer.from(imageDataUrl!.split(',')[1]!, 'base64')
    const imageData = base64ToUint8Array(imageDataUrl!.split(',')[1]!)
    const outputImage = await sharp(imageData)
      .jpeg({ quality: 80 })
      .toBuffer({ resolveWithObject: true })
    const outputContentType = 'image/jpeg'

    const storageId = await ctx.storage.store(
      bufferLikeToImageBlob(outputImage.data, outputContentType)
    )
    assert(storageId)
    const imageUrl = await ctx.storage.getUrl(storageId)
    assert(imageUrl)

    console.log('<<< generating second pass image', {
      generationId,
      githubUsername: generation.githubUsername,
      prompt: generation.prompt,
      imageUrl,
      contentType: outputContentType
    })

    await ctx.runMutation(internal.workflows.addGenerationImage, {
      generationId,
      image: {
        imageUrl,
        width: outputImage.info.width,
        height: outputImage.info.height,
        contentType: outputContentType,
        altText: `Billboard image for @${githubUsername}`,
        type: 'final'
      }
    })
  }
})
