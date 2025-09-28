'use client'

/**
 * Converts an image to PNG format.
 *
 * @param {Blob|string} input - Image as Blob or URL string
 * @param {number} quality - PNG quality (0 to 1)
 * @returns {Promise<Blob>} - PNG image as Blob
 */
export async function convertImageToPng({
  input,
  quality = 0.8
}: {
  input: string | Blob
  quality?: number
}): Promise<Blob> {
  // Create an Image object
  const img = new Image()

  // Create a canvas element
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!

  // Create a promise to handle the image loading
  return new Promise((resolve, reject) => {
    img.addEventListener('load', () => {
      try {
        // Set canvas dimensions to match the image
        canvas.width = img.width
        canvas.height = img.height

        // Draw the image onto the canvas
        ctx.fillStyle = '#111111'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0)

        // Convert canvas content to JPG
        canvas.toBlob(
          (blob) => {
            resolve(blob!)
          },
          'image/png',
          quality
        )
      } catch (err) {
        reject(err)
      }
    })

    img.addEventListener('error', () => {
      reject(new Error('Failed to load image'))
    })

    // Set the source of the image
    if (typeof input === 'string') {
      // If input is a URL
      img.src = input
    } else {
      // If input is a Blob
      img.src = URL.createObjectURL(input)
    }
  })
}
