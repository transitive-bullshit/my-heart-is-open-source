import type { Id } from '@/convex/_generated/dataModel'
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
import ExampleHero from '@/public/examples/hero.jpg'
import ExampleMoon from '@/public/examples/moon.jpg'

import type { GeneratedImage, Generation } from './types'

const images = [
  {
    image: ExampleHero,
    template: 'billboard',
    prompt:
      `place this billboard into the vibrant city of Bangkok at night. make sure that the billboard content is clearly visible`.trim()
  },
  {
    image: Example0,
    template: 'billboard',
    prompt:
      `place this billboard into a vibrant new york city avenue with spider-man web swinging in the foreground. the scene is at dusk and it is raining slightly. the focus of the scene is the billboard`.trim()
  },
  {
    image: Example1,
    template: 'billboard',
    prompt:
      `place this billboard naturally next to a curved highway outside of a large city at dusk with blurred time-lapse traffic. the focus of the scene is the billboard`.trim()
  },
  {
    image: Example2,
    template: 'billboard',
    prompt:
      `place this billboard into a vibrant whimsical city in the style of an animated studio ghibli movie. the focus of the image is the billboard, so make sure it is large and clearly visible`.trim()
  },
  {
    image: Example3,
    template: 'billboard',
    prompt:
      `place this billboard into a vibrant whimsical city in the style of an animated studio ghibli movie. the focus of the image is the billboard, so make sure it is large and clearly visible`.trim()
  },
  {
    image: Example4,
    template: 'billboard',
    prompt:
      `place this billboard into a vibrant whimsical city in the style of an isekai anime. make sure the billboard is clearly visible with lighting.`.trim()
  },
  {
    image: Example5,
    template: 'billboard',
    prompt:
      `replace the background of this image with a Disco Elysium-inspired collage of colors`.trim()
  },
  {
    image: Example6,
    template: 'billboard',
    prompt:
      `replace the background of this image by placing the billboard into a vibrant new york city plaza with spider-man swinging in the foreground. keep the billboard as-is`.trim()
  },
  {
    image: Example7,
    template: 'billboard',
    prompt:
      `place this billboard into a a dark, rainy, black & white comic book city from Watchmen`.trim()
  },
  {
    image: Example8,
    template: 'billboard',
    prompt:
      `replace the background of this image with a a very cinematic shot taken from the surface of mars. picturesque, beautiful stars in the background`.trim()
  },
  {
    image: Example9,
    template: 'billboard',
    prompt:
      `replace the background of this image with a a very cinematic shot taken from the surface of mars. picturesque, beautiful stars in the background. make the billboard just a tiny bit rugged to fit in with the landscape, but make sure the content of the billboard is clearly visible`.trim()
  },
  {
    image: ExampleMoon,
    template: 'billboard',
    prompt:
      `replace the background of this image with a very cinematic shot taken from the moon's surface with the earth in the background. make sure the content of the billboard is clearly visible as it is the focus of the scene`.trim()
  },

  {
    image: Example10,
    template: 'billboard',
    prompt:
      `place this billboard into the vibrant city of Coruscant from Star Wars. make sure there are plenty of flying vehicles in the air and that the billboard content is clearly visible`.trim()
  },
  {
    image: Example11,
    template: 'billboard',
    prompt:
      `place this billboard into the Hidden Leaf Village from the anime Naruto and match its style`.trim()
  },
  {
    image: Example12,
    template: 'billboard',
    prompt:
      `place this billboard into a vibrant city from the anime JoJo's Bizarre Adventure. make the billboard match JoJo's art style, but make sure the billboard's contents are clearly visible`.trim()
  },
  {
    image: Example13,
    template: 'billboard',
    prompt:
      `place this billboard into the vibrant city of Manhattan in Times Square at night. make sure that the billboard content is clearly visible`.trim()
  },
  {
    image: Example14,
    template: 'billboard',
    prompt:
      `place this billboard into a vibrant plaza in Manhattan. make sure that the billboard content is clearly visible`.trim()
  },
  {
    image: Example15,
    template: 'billboard',
    prompt:
      `place this billboard into a dark, dense, and grimy city in the style of the black & white movie Sin City. make the billboard a little grimy and rugged, but make sure the billboard's contents are clearly visible with lighting on the main body of the billboard`.trim()
  },
  {
    image: Example16,
    template: 'billboard',
    prompt:
      `place this billboard into the vibrant city of Central City from the anime Fullmetal Alchemist Brotherhood. make the billboard match the anime's art style, but make sure the billboard's contents are clearly visible`.trim()
  },
  {
    image: Example17,
    template: 'billboard',
    prompt:
      `place this billboard into a a dark, rainy, black & white comic book city from Watchmen`.trim()
  },
  {
    image: Example18,
    template: 'billboard',
    prompt:
      `place this billboard into a vibrant, dense modern city plaza with skyscrapers in the background styled using 3D and basic phong shading and a simple skybox in a 3D editor like Blender. make sure the billboard's content is clearly visible`.trim()
  }
] as const

export const exampleImages: Generation[] = images.map(
  ({ image, template, prompt }, index) => {
    const generatedImage: GeneratedImage = {
      imageUrl: image.src,
      width: image.width,
      height: image.height,
      blurDataUrl: image.blurDataURL,
      contentType: 'image/jpeg',
      type: 'final',
      altText: `Example billboard image for @transitive-bullshit`
    }

    return {
      _id: `example-${index}` as Id<'generations'>,
      _creationTime: 0,
      githubUsername: 'transitive-bullshit',
      template,
      prompt,
      images: [generatedImage]
    }
  }
)
