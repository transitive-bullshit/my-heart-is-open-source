import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { HeroButton } from '@/components/hero-button'
import { DotScreenShader } from '@/components/ui/dot-shader-background'
import { Input } from '@/components/ui/input'
import Example0 from '@/public/examples/0.jpg'
import Example1 from '@/public/examples/1.jpg'
import Example2 from '@/public/examples/2.jpg'
import Example3 from '@/public/examples/3.jpg'
import Example4 from '@/public/examples/4.jpg'
import Example5 from '@/public/examples/5.jpg'
import Example6 from '@/public/examples/6.jpg'
import Example7 from '@/public/examples/7.jpg'
import Example8 from '@/public/examples/8.jpg'
import Example9 from '@/public/examples/9.jpg'
import Example10 from '@/public/examples/10.jpg'
import Example11 from '@/public/examples/11.jpg'
import Example12 from '@/public/examples/12.jpg'
import Example13 from '@/public/examples/13.jpg'
import Example14 from '@/public/examples/14.jpg'
import Example15 from '@/public/examples/15.jpg'
import Example16 from '@/public/examples/16.jpg'
import Example17 from '@/public/examples/17.jpg'
import Example18 from '@/public/examples/18.jpg'
import Example19 from '@/public/examples/19.jpg'
import ExampleHero from '@/public/examples/hero.jpg'
import ExampleStep1 from '@/public/examples/step-1.jpg'
import ExampleStep2 from '@/public/examples/step-2.jpg'
import GHCongributionGraph from '@/public/github-contribution-graph-cropped.png'

const exampleImages = [
  Example0,
  Example1,
  Example2,
  Example3,
  Example4,
  Example5,
  Example6,
  Example7,
  Example8,
  Example9,
  Example10,
  Example11,
  Example12,
  Example13,
  Example14,
  Example15,
  Example16,
  Example17,
  Example18,
  Example19
]

export default function HomePage() {
  return (
    <>
      <section className='relative flex flex-col gap-10 px-2 pt-8 pb-16 items-center'>
        <div className='absolute inset-0'>
          <DotScreenShader />
        </div>

        <div className='relative flex flex-col gap-10 items-center'>
          <h1 className='text-center text-balance leading-snug md:leading-none text-4xl font-semibold'>
            Pimp your GitHub Activity
          </h1>

          <h5 className='text-center text-balance text-lg max-w-2xl'>
            Show your love for open source with a custom billboard image based
            on live data from your personal GitHub contribution graph
          </h5>
        </div>

        <div className='relative flex flex-col gap-10 items-center pointer-events-none'>
          <div className='flex flex-col gap-2 lg:gap-4 items-center pointer-events-none'>
            <Image
              src={GHCongributionGraph.src}
              alt='GitHub Contribution Graph'
              placeholder='blur'
              width={GHCongributionGraph.width}
              height={GHCongributionGraph.height}
              blurDataURL={GHCongributionGraph.blurDataURL}
              className='rounded-sm shadow-sm w-full max-w-4xl'
            />

            <img src='/down-arrow.svg' alt='Down Arrow' className='w-5 ' />

            <Image
              src={ExampleHero.src}
              alt='Example output billboard image'
              placeholder='blur'
              width={ExampleHero.width}
              height={ExampleHero.height}
              blurDataURL={ExampleHero.blurDataURL}
              className='rounded-sm shadow-sm w-full max-w-4xl'
            />
          </div>
        </div>
      </section>

      <CTASection />

      <section className='flex flex-col gap-10 px-2 items-center'>
        <h2 className='text-center text-balance leading-snug md:leading-none text-4xl font-semibold'>
          Different styles to choose from
        </h2>

        <div className='max-w-7xl'>
          <div className='not-prose grid grid-cols-1 gap-8 lg:gap-8 sm:grid-cols-2'>
            {exampleImages.map((image) => (
              <Image
                key={image.src}
                src={image.src}
                alt='Example output billboard image'
                placeholder='blur'
                width={image.width}
                height={image.height}
                blurDataURL={image.blurDataURL}
                className='rounded-sm shadow-sm w-full'
              />
            ))}
          </div>
        </div>
      </section>

      <section className='relative z-10 flex flex-col gap-10 items-center'>
        <h1 className='text-center text-balance leading-snug md:leading-none text-4xl font-semibold'>
          How it works
        </h1>

        <div className='flex flex-col gap-8 items-center max-w-2xl'>
          <div className='flex flex-col gap-4 items-center'>
            <p className='text-center text-balance'>
              First we take a screenshot of your GitHub contribution graph using
              a headless browser.
            </p>

            <Image
              key={GHCongributionGraph.src}
              src={GHCongributionGraph.src}
              alt='GitHub Contribution Graph'
              placeholder='blur'
              width={GHCongributionGraph.width}
              height={GHCongributionGraph.height}
              blurDataURL={GHCongributionGraph.blurDataURL}
              className='rounded-sm shadow-sm w-full max-w-md'
            />
          </div>

          <div className='flex flex-col gap-4 items-center'>
            <p className='text-center text-balance'>
              Then we use nano banana to create a billboard image with a green
              screen background and your contribution graph on top. Breaking
              this into its own step helps the image model match your
              contribution graph more closely, though it likely still won't be
              100% accurate.
            </p>

            <Image
              key={ExampleStep1.src}
              src={ExampleStep1.src}
              alt='Step 2: billboard with green screen'
              placeholder='blur'
              width={ExampleStep1.width}
              height={ExampleStep1.height}
              blurDataURL={ExampleStep1.blurDataURL}
              className='rounded-sm shadow-sm w-full max-w-md'
            />
          </div>

          <div className='flex flex-col gap-4 items-center'>
            <p className='text-center text-balance'>
              Lastly, we use nano banana again to create the final image output
              with a specific style.
            </p>

            <Image
              key={ExampleStep2.src}
              src={ExampleStep2.src}
              alt='Step 3 final output'
              placeholder='blur'
              width={ExampleStep2.width}
              height={ExampleStep2.height}
              blurDataURL={ExampleStep2.blurDataURL}
              className='rounded-sm shadow-sm w-full max-w-md'
            />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}

function CTASection() {
  const [githubUsername, setGithubUsername] = useState('')

  return (
    <section className='flex flex-col gap-10 px-2 items-center'>
      <h2 className='text-center text-balance leading-snug md:leading-none text-4xl font-semibold'>
        Generate your own billboard images
      </h2>

      <div className='flex flex-col md:flex-row gap-8 md:gap-4 items-center w-full max-w-lg'>
        <Input
          className='p-6 md:flex-1 md:p-5'
          placeholder='Enter your GitHub username'
          name='github-username'
          value={githubUsername}
          onChange={(e) => setGithubUsername(e.target.value)}
        />

        <HeroButton className='h-full' asChild>
          <Link href={`/${githubUsername}`}>Generate Images</Link>
        </HeroButton>
      </div>
    </section>
  )
}
