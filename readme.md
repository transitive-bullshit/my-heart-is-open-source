<p>
  <a href="https://github.com/transitive-bullshit/my-heart-is-open-source/actions/workflows/main.yml"><img alt="Build Status" src="https://github.com/transitive-bullshit/my-heart-is-open-source/actions/workflows/main.yml/badge.svg" /></a>
  <a href="https://prettier.io"><img alt="Prettier Code Formatting" src="https://img.shields.io/badge/code_style-prettier-brightgreen.svg" /></a>
</p>

# My heart is open source 💕 <!-- omit from toc -->

> Show your love for open source with a custom billboard image _based on live data_ from your GitHub contribution graph.

## Examples

<p align="center">
  <img alt="example billboard image" src="https://raw.githubusercontent.com/transitive-bullshit/my-heart-is-open-source/main/public/examples/0.jpg" width="45">
  &nbsp; &nbsp; &nbsp; &nbsp;

  <img alt="example billboard image" src="https://raw.githubusercontent.com/transitive-bullshit/my-heart-is-open-source/main/public/examples/1.jpg" width="45">
</p>

<p align="center">
  <img alt="example billboard image" src="https://raw.githubusercontent.com/transitive-bullshit/my-heart-is-open-source/main/public/examples/2.jpg" width="45">
  &nbsp; &nbsp; &nbsp; &nbsp;

  <img alt="example billboard image" src="https://raw.githubusercontent.com/transitive-bullshit/my-heart-is-open-source/main/public/examples/10.jpg" width="45">
</p>

## How it works

First we take a screenshot of your GitHub contribution graph using headless Chrome via Playwright hosted in the cloud with [Kernel](https://www.onkernel.com).

<img alt="github contributor graph" src="https://raw.githubusercontent.com/transitive-bullshit/my-heart-is-open-source/main/public/github-contribution-graph.png">

Second, we use [nano banana](https://aistudio.google.com/models/gemini-2-5-flash-image) to create a billboard image with a green screen background and your contribution graph on top.

Breaking this into its own step helps the image model match your contribution graph more closely, though it likely still won't be 100% accurate.

<img alt="green screen output image" src="https://raw.githubusercontent.com/transitive-bullshit/my-heart-is-open-source/main/public/examples/step-1.jpg">

Lastly, we use [nano banana](https://aistudio.google.com/models/gemini-2-5-flash-image) again to create the final composite image with a specific style.

<img alt="final output image" src="https://raw.githubusercontent.com/transitive-bullshit/my-heart-is-open-source/main/public/examples/step-2.jpg">

## Tech stack

- [TypeScript](https://www.typescriptlang.org), [React](https://react.dev), [Next.js](https://nextjs.org) - full-stack webapp
- [Convex](https://convex.dev/referral/TRAVIS5611) - reactive backend, database, serverless functions, and lite durable workflows
- [Vercel](https://vercel.com) - web hosting and analytics
- [Kernel](https://www.onkernel.com) - hosted headless browser
- [OpenRouter](https://openrouter.ai/?referral=hrg) - used to call the [gemini nano banana api](https://aistudio.google.com/models/gemini-2-5-flash-image)

## License

MIT © [Travis Fischer](https://x.com/transitive_bs)
