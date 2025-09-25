'use client'

import type { WorkflowId } from '@convex-dev/workflow'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQuery } from 'convex/react'
import { Loader2Icon } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import * as z from 'zod'

import type { Id } from '@/convex/_generated/dataModel'
import { Card } from '@/components/card'
import { LoadingIndicator } from '@/components/loading-indicator'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/convex/_generated/api'
import { exampleImages } from '@/lib/example-images'
import { toastError } from '@/lib/notifications'
import { cn } from '@/lib/utils'

export function GenerateForm({
  selectedExampleId = 'example-0'
}: {
  selectedExampleId?: string
}) {
  const [generationId, setGenerationId] = useState<Id<'generations'> | null>(
    null
  )
  const [isLoading, setIsLoading] = useState(false)
  const [generationWorkflowId, setGenerationWorkflowId] =
    useState<WorkflowId | null>(null)
  const createGenerationWorkflow = useMutation(
    api.workflows.createGenerationWorkflow
  )
  const generation = useQuery(
    api.workflows.getGeneration,
    generationId
      ? {
          generationId
        }
      : 'skip'
  )
  const generationWorkflow = useQuery(
    api.workflows.getGenerationWorkflow,
    generationWorkflowId
      ? {
          generationWorkflowId
        }
      : 'skip'
  )

  const form = useForm({
    defaultValues: {
      githubUsername: 'transitive-bullshit',
      prompt: ''
    },
    validators: {
      onChange: z.object({
        githubUsername: z
          .string()
          .refine((githubUsername) => /[a-zA-Z0-8]\w+/.test(githubUsername)),

        prompt: z.string().nonempty()
      })
    },
    onSubmit: async ({
      value: { githubUsername, prompt }
    }: {
      value: { githubUsername: string; prompt: string }
    }) => {
      try {
        console.log('generating image for github username', githubUsername)
        setIsLoading(true)
        const { generationId, generationWorkflowId } =
          await createGenerationWorkflow({
            githubUsername,
            prompt
          })
        setGenerationId(generationId)
        setGenerationWorkflowId(generationWorkflowId)
      } catch (err: any) {
        void toastError(err, {
          label: `Error generating image for @${githubUsername}`
        })
        return
      }
    }
  })

  useEffect(() => {
    if (
      isLoading &&
      (!generationWorkflow ||
        (generationWorkflow?.type !== 'inProgress' &&
          generation?.images.at(-1)?.type === 'final'))
    ) {
      setIsLoading(false)
    }
  }, [isLoading, generationWorkflow, generation])

  useEffect(() => {
    if (selectedExampleId) {
      const example = exampleImages.find((e) => e._id === selectedExampleId)
      if (example) {
        setGenerationId(null)
        setGenerationWorkflowId(null)
        form.setFieldValue('prompt', example.prompt)
      }
    }
  }, [selectedExampleId, form])

  // TODO: use last selected example image
  const currentGeneration = generation?.images.length
    ? generation
    : (exampleImages.find((e) => e._id === selectedExampleId) ??
      exampleImages[0]!)
  const currentGenerationImage = currentGeneration.images.at(-1)!

  console.log('currentGeneration', {
    currentGeneration,
    generation,
    selectedExampleId,
    isLoading,
    currentGenerationImage
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

          <form.Field
            name='prompt'
            children={(field) => (
              <div className='grid gap-3'>
                <Label htmlFor={field.name}>Prompt</Label>

                <Textarea
                  id={field.name}
                  name={field.name}
                  required
                  placeholder='Place this billboard into a vibrant city from a studio ghibli animated film'
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e: any) => field.handleChange(e.target.value)}
                  className='min-h-24'
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
                {(isSubmitting || isLoading) && (
                  <Loader2Icon className='animate-spin' />
                )}

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
        <Card className='bg-card overflow-hidden'>
          <Image
            src={currentGenerationImage.imageUrl}
            alt={
              currentGenerationImage.altText ||
              `Generated billboard image for @${currentGeneration.githubUsername}`
            }
            width={currentGenerationImage.width}
            height={currentGenerationImage.height}
            placeholder={currentGenerationImage.blurDataUrl ? 'blur' : 'empty'}
            blurDataURL={currentGenerationImage.blurDataUrl}
            className='rounded-3xl w-full'
          />

          {(isLoading || generationWorkflow?.type === 'inProgress') && (
            <div className='absolute top-0 left-0 right-0 bottom-0 bg-background/70 pointer-events-none rounded-3xl'>
              <LoadingIndicator />
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
