'use client'

import type { WorkflowId } from '@convex-dev/workflow'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQuery } from 'convex/react'
import { Loader2Icon } from 'lucide-react'
import NextImage, { getImageProps } from 'next/image'
import { parseAsString, useQueryState } from 'nuqs'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as z from 'zod'

import type { Id } from '@/convex/_generated/dataModel'
import { Card } from '@/components/card'
import { ImageActionMenu } from '@/components/image-action-menu'
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
  const [githubUsername, setGitHubUsername] = useQueryState(
    'u',
    parseAsString.withDefault('')
  )
  const [prompt, setPrompt] = useQueryState('p', parseAsString.withDefault(''))

  const [generationId, setGenerationId] = useState<Id<'generations'> | null>(
    null
  )
  const img = useRef<string | null>(null)
  const [isLoadingWorkflowId, setIsLoadingWorkflowId] =
    useState<WorkflowId | null>(null)
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
      githubUsername,
      prompt
    },
    validators: {
      onChange: z.object({
        githubUsername: z
          .string()
          .refine((githubUsername) => /[a-zA-Z0-8]\w+/.test(githubUsername)),

        prompt: z.string().nonempty()
      })
    },
    listeners: {
      onChange: async (state) => {
        const currentGithubUsername =
          state.formApi.getFieldValue('githubUsername')
        if (githubUsername !== currentGithubUsername) {
          void setGitHubUsername(currentGithubUsername)
        }

        const currentPrompt = state.formApi.getFieldValue('prompt')
        if (prompt !== currentPrompt) {
          void setPrompt(currentPrompt)
        }
      }
    },
    onSubmit: async ({
      value: { githubUsername, prompt }
    }: {
      value: { githubUsername: string; prompt: string }
    }) => {
      try {
        console.log('generating image for github username', githubUsername)
        setIsLoadingWorkflowId('loading' as any)
        const { generationId, generationWorkflowId } =
          await createGenerationWorkflow({
            githubUsername,
            prompt
          })
        setIsLoadingWorkflowId(generationWorkflowId)
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
    if (form.getFieldValue('githubUsername') !== githubUsername) {
      form.setFieldValue('githubUsername', githubUsername)
    }

    if (form.getFieldValue('prompt') !== prompt) {
      form.setFieldValue('prompt', prompt)
    }
  }, [githubUsername, prompt, form])

  // TODO: use last selected example image
  const currentGeneration = useMemo(
    () =>
      generation?.images.length
        ? generation
        : (exampleImages.find((e) => e._id === selectedExampleId) ??
          exampleImages[0]!),
    [generation, selectedExampleId]
  )
  const currentGenerationImage = currentGeneration.images.at(-1)!

  useEffect(() => {
    if (
      isLoadingWorkflowId &&
      isLoadingWorkflowId === generationWorkflowId &&
      generationWorkflow &&
      generationWorkflow.type !== 'inProgress' &&
      generation === currentGeneration &&
      currentGenerationImage?.type === 'final'
    ) {
      // console.log('generation is complete; loading image...', {
      //   isLoadingWorkflowId,
      //   generationWorkflowId,
      //   generationWorkflow,
      //   currentGenerationImage
      // })

      if (img.current !== currentGenerationImage.imageUrl) {
        img.current = currentGenerationImage.imageUrl
        const { props } = getImageProps({
          src: currentGenerationImage.imageUrl,
          alt: currentGenerationImage.altText || '',
          width: currentGenerationImage.width,
          height: currentGenerationImage.height,
          loading: 'eager'
        })
        const image = new Image()
        image.addEventListener('load', () => {
          // console.log('generation is complete; loaded image', {
          //   src: currentGenerationImage.imageUrl,
          //   optSrc: props.src
          // })
          setIsLoadingWorkflowId(null)
        })
        image.addEventListener('error', () => {
          // console.error(
          //   'generation is complete; error loading image',
          //   {
          //     src: currentGenerationImage.imageUrl,
          //     optSrc: props.src
          //   },
          //   err
          // )
          setIsLoadingWorkflowId(null)
        })
        image.src = props.src
      }
    }
  }, [
    isLoadingWorkflowId,
    generationWorkflowId,
    generationWorkflow,
    generation,
    currentGeneration,
    currentGenerationImage
  ])

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

  return (
    <div className='flex flex-col gap-4 items-center pointer-events-none max-w-full'>
      <Card className='bg-card w-md max-w-full'>
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
                  className='pointer-events-auto'
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
                  className='min-h-28 pointer-events-auto'
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
                className='w-full pointer-events-auto'
              >
                {(isSubmitting || isLoadingWorkflowId) && (
                  <Loader2Icon className='animate-spin' />
                )}

                <span>Generate image</span>
              </Button>
            )}
          />
        </form>
      </Card>

      <img
        src='/down-arrow-light.svg'
        alt='Down Arrow'
        className='w-5 pointer-events-none block dark:hidden'
      />

      <img
        src='/down-arrow-dark.svg'
        alt='Down Arrow'
        className='w-5 pointer-events-none hidden dark:block'
      />

      <div className='relative group flex flex-col gap-4 w-full max-w-4xl select-none'>
        <Card className='relative bg-card overflow-hidden pointer-events-none'>
          <NextImage
            src={currentGenerationImage.imageUrl}
            alt={
              currentGenerationImage.altText ||
              `Generated billboard image for @${currentGeneration.githubUsername}`
            }
            width={currentGenerationImage.width}
            height={currentGenerationImage.height}
            placeholder={currentGenerationImage.blurDataUrl ? 'blur' : 'empty'}
            blurDataURL={currentGenerationImage.blurDataUrl}
            loading='eager'
            className={cn(
              'rounded-3xl w-full pointer-events-auto'
              // currentGenerationImage.type === 'github-contribution-graph'
              //   ? 'p-6'
              //   : ''
            )}
          />

          {(isLoadingWorkflowId ||
            generationWorkflow?.type === 'inProgress') && (
            <div className='absolute top-0 left-0 right-0 bottom-0 bg-background/70 pointer-events-none rounded-3xl'>
              <LoadingIndicator fill />
            </div>
          )}
        </Card>

        <ImageActionMenu
          generatedImage={currentGenerationImage}
          className='place-self-end pointer-events-auto mr-2'
        />
      </div>
    </div>
  )
}
