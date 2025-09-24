'use client'

import { useForm } from '@tanstack/react-form'
import ky from 'ky'
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
import { exampleImages } from '@/lib/example-images'
import { toastError } from '@/lib/notifications'
import { cn } from '@/lib/utils'

export function GenerateForm() {
  const [generatedImageWorkflow, setGeneratedImageWorkflow] =
    useState<GeneratedImageWorkflow>(exampleImages[0]!)
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')

  const form = useForm({
    defaultValues: {
      githubUsername: ''
      // prompt: generatedImageWorkflow.prompt
    },
    validators: {
      onChange: z.object({
        githubUsername: z
          .string()
          .refine((githubUsername) => /[a-zA-Z0-8]\w+/.test(githubUsername))

        // prompt: z.string().nonempty()
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
        const res = await ky
          .post('/api/generate', {
            json: {
              githubUsername
            },
            timeout: 60_000
          })
          .json<GeneratedImageWorkflow>()

        setGeneratedImageWorkflow(res)
        setStatus('success')
      } catch (err: any) {
        void toastError(err, {
          label: `Error generating image for @${githubUsername}`
        })
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

      <img
        src='/down-arrow.svg'
        alt='Down Arrow'
        className='w-5 pointer-events-none'
      />

      <div className='relative group flex flex-col gap-4 w-full max-w-4xl pointer-events-none'>
        <Image
          src={generatedImageWorkflow.images.at(-1)!.imageUrl}
          alt={
            generatedImageWorkflow.images.at(-1)!.altText ??
            `Generated billboard image for @${generatedImageWorkflow.githubUsername}`
          }
          width={generatedImageWorkflow.images.at(-1)!.width}
          height={generatedImageWorkflow.images.at(-1)!.height}
          className='rounded-sm shadow-sm w-full'
        />

        {status === 'loading' && (
          <div className='absolute top-0 left-0 right-0 bottom-0 bg-background/70 pointer-events-none'>
            <LoadingIndicator />
          </div>
        )}
      </div>
    </div>
  )
}
