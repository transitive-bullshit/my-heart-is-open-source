import { DotScreenShader } from '@/components/ui/dot-shader-background'

import { GenerateForm } from './generate-form'

export default function HomePage() {
  return (
    <>
      <section className='relative flex flex-col gap-10 px-2 pt-8 pb-16 items-center justify-center min-h-screen'>
        <div className='absolute inset-0'>
          <DotScreenShader />
        </div>

        <div className='relative flex flex-col gap-10 items-center'>
          <h1 className='text-center text-balance leading-snug md:leading-none text-4xl font-semibold'>
            My Heart is Open Source 💕
          </h1>

          <h5 className='text-center text-balance text-md max-w-2xl'>
            Show your love for open source with a custom billboard image{' '}
            <span className='italic'>based on live data</span> from your
            personal GitHub contribution graph
          </h5>

          <GenerateForm />
        </div>
      </section>
    </>
  )
}
