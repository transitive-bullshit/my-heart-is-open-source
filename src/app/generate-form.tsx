'use client'

import { useForm } from '@tanstack/react-form'
// import ky from 'ky'
import { Loader2Icon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import * as z from 'zod'

import type { GeneratedImageWorkflow } from '@/lib/types'
import { Card } from '@/components/card'
import { LoadingIndicator } from '@/components/loading-indicator'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import ExampleHero from '@/public/examples/hero.jpg'

export function GenerateForm() {
  const [generatedImage] = useState<GeneratedImageWorkflow | null>(null)
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')

  const form = useForm({
    defaultValues: {
      githubUsername: ''
    },
    validators: {
      onChange: z.object({
        githubUsername: z
          .string()
          .refine((githubUsername) => /[a-zA-Z0-8]\w+/.test(githubUsername))
      })
    },
    onSubmit: async ({
      value: { githubUsername }
    }: {
      value: { githubUsername: string }
    }) => {
      try {
        setStatus('loading')

        console.log('generating image for github username', githubUsername)
        // TODO
        // const res = await ky
        //   .post('/api/generate', {
        //     json: {
        //       githubUsername
        //     }
        //   })
        //   .json<GeneratedImageWorkflow>()

        // setGeneratedImage(res)
        // setStatus('success')
      } catch (err: any) {
        console.error(
          'error generating image for github username',
          githubUsername,
          err
        )
        setStatus('error')
        return
      }
    }
  })

  return (
    <div className='flex flex-col gap-4 items-center'>
      <Card className='bg-card w-full max-w-md'>
        <form
          className={cn('flex flex-col gap-6 w-full p-4')}
          onSubmit={(e) => {
            e.preventDefault()
            void form.handleSubmit()
          }}
        >
          <form.Field
            name='githubUsername'
            children={(field) => (
              <div className='grid gap-3'>
                <Label htmlFor={field.name}>GitHub Username</Label>

                <Input
                  id={field.name}
                  name={field.name}
                  type='text'
                  required
                  placeholder='transitive-bullshit'
                  autoFocus={true}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e: any) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          />

          <form.Subscribe
            selector={(state) => [
              state.canSubmit,
              state.isSubmitting,
              state.isTouched
            ]}
            children={([canSubmit, isSubmitting, isTouched]) => (
              <Button
                type='submit'
                disabled={!(isTouched && canSubmit)}
                className='w-full'
              >
                {isSubmitting && <Loader2Icon className='animate-spin' />}

                <span>Generate image</span>
              </Button>
            )}
          />
        </form>
      </Card>

      <img src='/down-arrow.svg' alt='Down Arrow' className='w-5 ' />

      <div className='relative group flex flex-col gap-4 w-full max-w-4xl'>
        {status === 'loading' && (
          <LoadingIndicator className='absolute top-0 left-0 w-full h-full' />
        )}

        {generatedImage ? (
          <Image
            src={generatedImage.imageUrl}
            alt={
              generatedImage.altText ??
              `Generated billboard image for @${generatedImage.githubUsername}`
            }
            width={generatedImage.width}
            height={generatedImage.height}
            className='rounded-sm shadow-sm w-full'
          />
        ) : (
          <Image
            src={ExampleHero.src}
            alt='Example output billboard image for @transitive-bullshit'
            placeholder='blur'
            width={ExampleHero.width}
            height={ExampleHero.height}
            blurDataURL={ExampleHero.blurDataURL}
            className='rounded-sm shadow-sm w-full'
          />
        )}
      </div>
    </div>
  )
}
