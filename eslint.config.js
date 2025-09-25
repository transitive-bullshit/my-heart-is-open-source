import { config } from '@fisch0920/config/eslint'
import { globalIgnores } from 'eslint/config'

export default [
  ...config,
  globalIgnores([
    'src/lib/extract-gh/extract-github-contributions.js',
    'convex/_generated',
    'convex/_generated/**/*',
    'next-env.d.ts'
  ]),
  {
    rules: {
      'unicorn/filename-case': 'off'
    }
  }
]
