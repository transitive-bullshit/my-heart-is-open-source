import { config } from '@fisch0920/config/eslint'

export default [
  ...config,
  {
    ignores: ['src/lib/extract-gh/extract-github-contributions.js']
  }
]
