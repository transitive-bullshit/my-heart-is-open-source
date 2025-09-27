'use node'

import { v } from 'convex/values'
import { imageDimensionsFromData } from 'image-dimensions'

// import ky from 'ky'
// import { apiBaseUrl } from '@/lib/config'
import { getElementScreenshot } from '@/lib/get-element-screenshot'
import { assert } from '@/lib/utils'

import { api, internal } from './_generated/api'
import { internalAction } from './_generated/server'

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
    const image = new Uint8Array(screenshot)

    const imageSize = imageDimensionsFromData(image)!
    assert(imageSize?.width > 0 && imageSize?.height > 0, 'Invalid image size')

    const storageId = await ctx.storage.store(new Blob([image]))
    assert(storageId)
    const imageUrl = await ctx.storage.getUrl(storageId)
    assert(imageUrl)
    const contentType = 'image/png'
    // const screenshotUrl = `data:${contentType};base64,${uint8ArrayToBase64(image)}`
    console.log('<<< taking GH screenshot', { githubUsername, imageUrl })

    await ctx.runMutation(internal.workflows.addGenerationImage, {
      generationId,
      image: {
        imageUrl,
        width: imageSize.width,
        height: imageSize.height,
        contentType,
        type: 'github-contribution-graph',
        altText: `GitHub contribution graph for @${githubUsername}`
      }
    })
  }
})
