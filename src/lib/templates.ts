import type { GeneratedImageTemplate } from './types'

export const templates: Record<GeneratedImageTemplate, string> = {
  billboard: `
create a cinematic still frame photo of a large, wide billboard with sans-serif text at the top "My heart is open source 💕".  "My heart is" should be in neon light blue, and "open source 💕" should be in neon light pink, all on one line, and there should be a black bar behind the text.

the billboard should be on the right-hand side of the scene. it should be very slightly angled away from the camera facing left.

the main body of the billboard should be the attached horizontal image of a developer’s activity over the past year. make sure the billboard body matches the attached image as closely as possible. the billboard body should be bright and clearly visible.

the billboard is the only object in the scene and is set against a blank green screen
`.trim()
}
