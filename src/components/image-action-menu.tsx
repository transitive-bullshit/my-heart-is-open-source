'use client'

import ky from 'ky'
import {
  Check,
  // ExternalLink,
  LoaderCircle,
  Menu,
  TriangleAlert
} from 'lucide-react'
// import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

import type * as types from '@/lib/types'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import * as config from '@/lib/config'
import { convertImageToPng } from '@/lib/convert-image-to-png'
import { toastError } from '@/lib/notifications'
import { cn } from '@/lib/utils'

type Status = 'success' | 'error' | 'loading' | 'idle'

export function ImageActionMenu({
  generatedImage,
  className
}: {
  generatedImage: types.GeneratedImage
  className?: string
}) {
  const [status, setStatus] = useState<Status>('idle')
  // const twitterShareUrl = new URL('https://x.com/intent/tweet')
  // twitterShareUrl.searchParams.set(
  //   'text',
  //   'this billboard was created from my github profile for free by @transitive_bs 💕'
  // )
  // twitterShareUrl.searchParams.set('url', config.domain)

  const onCopyImage = useCallback(async () => {
    setStatus('loading')

    try {
      const blob = await ky.get(generatedImage.imageUrl).blob()

      // not all browsers support copying jpeg images to the clipboard, so
      // convert to png first
      const pngBlobP = convertImageToPng({ input: blob })

      // Workaround for weird Safari bug
      // https://stackoverflow.com/questions/66312944/javascript-clipboard-api-write-does-not-work-in-safari
      const pngBlob = config.isSafari ? await pngBlobP : pngBlobP
      const item = new ClipboardItem({ 'image/png': pngBlob })
      await navigator.clipboard.write([item])

      toast.success('Copied image to clipboard')
      setStatus('success')
    } catch (err) {
      void toastError(err, { label: 'Error copying image to clipboard' })
      setStatus('error')
    }
  }, [generatedImage])

  const onDownloadImage = useCallback(async () => {
    setStatus('loading')

    try {
      const blob = await ky.get(generatedImage.imageUrl).blob()

      const link = document.createElement('a')
      const ext = generatedImage.contentType.split('/')[1]
      link.download = `${generatedImage.altText ?? 'generated-image'}.${ext}`
      link.href = URL.createObjectURL(blob)
      link.click()

      toast.success('Downloaded image')
      setStatus('success')
    } catch (err) {
      void toastError(err, { label: 'Error copying image to clipboard' })
      console.error('Error downloading image', err)
      toast.error('Error downloading image')
      setStatus('error')
    }
  }, [generatedImage])

  useEffect(() => {
    if (status === 'success' || status === 'error') {
      setTimeout(() => setStatus('idle'), 2000)
    }
  }, [status])

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild className={cn(className)}>
        <Button aria-label='Actions'>
          <span className='mr-1'>
            {status === 'success' ? (
              <Check />
            ) : status === 'loading' ? (
              <LoaderCircle className='animate-spin' />
            ) : status === 'error' ? (
              <TriangleAlert className='text-red-500' />
            ) : (
              <Menu />
            )}
          </span>

          <span>Image Actions</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-56'>
        <DropdownMenuGroup>
          <DropdownMenuItem className='cursor-pointer' onSelect={onCopyImage}>
            Copy Image
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            className='cursor-pointer'
            onSelect={onDownloadImage}
          >
            Download Image
          </DropdownMenuItem>
        </DropdownMenuGroup>

        {/* <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem className='cursor-pointer' asChild>
            <Link href={twitterShareUrl.toString()} target='_blank'>
              Share on X / Twitter <ExternalLink />
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
