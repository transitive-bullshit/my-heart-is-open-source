<p>
  <a href="https://github.com/transitive-bullshit/embed-anything/actions/workflows/main.yml"><img alt="Build Status" src="https://github.com/transitive-bullshit/embed-anything/actions/workflows/main.yml/badge.svg" /></a>
  <a href="https://prettier.io"><img alt="Prettier Code Formatting" src="https://img.shields.io/badge/code_style-prettier-brightgreen.svg" /></a>
</p>

# Embed Anything <!-- omit from toc -->

TODO

- github contributor graph
  - `http://localhost:3000/o/image.png?url=https%3A%2F%2Fgithub.com%2Ftransitive-bullshit&s=.js-calendar-graph+%3E+div&p=16&br=12px&bg=%23fff`

- twitter header
  - `http://localhost:3000/o/image.png?url=https%3A%2F%2Fx.com%2Ftransitive_bs&s=div%3Ahas%28%3E+a%5Bhref%24%3D%22%2Fheader_photo%22%5D%29`

```ts
new URLSearchParams({
  url: 'https://github.com/transitive-bullshit/agentic',
  s: '#repository-details-container a[aria-label="You must be signed in to star a repository"]'
}).toString()
```

- github repo stars
  - `http://localhost:3000/o/image.png?url=https%3A%2F%2Fgithub.com%2Ftransitive-bullshit%2Fagentic&s=%23repository-details-container+a%5Baria-label%3D%22You+must+be+signed+in+to+star+a+repository%22%5D&ob=true`

## License

MIT © [Travis Fischer](https://x.com/transitive_bs)
