'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Suspense, useState } from 'react'

import { Card } from '@/components/card'
import { DotScreenShader } from '@/components/ui/dot-shader-background'
import { githubSponsorUrl, githubUrl } from '@/lib/config'
import { exampleImages } from '@/lib/example-images'

import { GenerateForm } from './generate-form'

export default function HomePage() {
  const [selectedExampleId, setSelectedExampleId] =
    useState<string>('example-0')

  return (
    <>
      <section className='relative flex flex-col gap-10 px-2 pt-8 pb-16 items-center justify-center min-h-screen max-w-full'>
        <div className='absolute inset-0'>
          <DotScreenShader />
        </div>

        <div className='relative flex flex-col gap-10 items-center max-w-full'>
          <h1 className='text-center text-balance leading-snug md:leading-none text-4xl font-semibold'>
            My Heart is Open Source 💕
          </h1>

          <h5 className='text-center text-balance text-md max-w-2xl'>
            Show your love for open source with a custom billboard image{' '}
            <span className='italic'>based on live data</span> from your GitHub
            contribution graph
          </h5>

          <Suspense>
            <GenerateForm selectedExampleId={selectedExampleId} />
          </Suspense>
        </div>
      </section>

      <section className='relative flex flex-col gap-10 px-2 items-center max-w-full'>
        <h2 className='text-center text-balance leading-snug md:leading-none text-4xl font-semibold'>
          Different styles to choose from
        </h2>

        <div className='max-w-7xl'>
          <div className='not-prose grid grid-cols-1 gap-8 lg:gap-8 sm:grid-cols-2'>
            {exampleImages.map((image) => (
              <Card
                onClick={() => {
                  setSelectedExampleId(image._id)
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  })
                }}
                key={image._id}
                className='cursor-pointer hover:shadow-lg transition-all duration-300'
              >
                <Image
                  src={image.images.at(-1)!.imageUrl}
                  alt='Example output billboard image'
                  width={image.images.at(-1)!.width}
                  height={image.images.at(-1)!.height}
                  placeholder={
                    image.images.at(-1)!.blurDataUrl ? 'blur' : 'empty'
                  }
                  blurDataURL={image.images.at(-1)!.blurDataUrl}
                  className='rounded-3xl w-full'
                />
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className='relative flex flex-col gap-10 px-2 items-center max-w-full'>
        <h2 className='text-center text-balance leading-snug md:leading-none text-4xl font-semibold'>
          Supported by sponsors
        </h2>

        <p className='text-center text-balance text-md max-w-2xl'>
          This project is{' '}
          <Link
            href={githubUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='link'
          >
            open source
          </Link>{' '}
          and 100% free, but if you've found it useful, please consider a{' '}
          <Link
            href={githubSponsorUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='link'
          >
            one-time sponsorship on GitHub
          </Link>{' '}
          to help cover the API costs.
        </p>
      </section>
    </>
  )
}
