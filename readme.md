<p>
  <a href="https://github.com/transitive-bullshit/embed-anything/actions/workflows/main.yml"><img alt="Build Status" src="https://github.com/transitive-bullshit/embed-anything/actions/workflows/main.yml/badge.svg" /></a>
  <a href="https://prettier.io"><img alt="Prettier Code Formatting" src="https://img.shields.io/badge/code_style-prettier-brightgreen.svg" /></a>
</p>

# Embed Anything <!-- omit from toc -->

## examples

### github contributor graph

<img alt="github contributor graph" src="https://raw.githubusercontent.com/transitive-bullshit/embed-anything/main/media/github-contribution-graph.png">

`http://localhost:3000/o/image.png?url=https%3A%2F%2Fgithub.com%2Ftransitive-bullshit&s=.js-calendar-graph+%3E+div&p=16&br=12&bg=%23fff`

```ts
new URLSearchParams({
  url: 'https://github.com/transitive-bullshit',
  s: '.js-calendar-graph > div',
  p: 16,
  br: 12,
  bg: '#fff'
}).toString()
```

### github repo star count

<img alt="github repo star count" src="https://raw.githubusercontent.com/transitive-bullshit/embed-anything/main/media/github-repo-star-count">

`http://localhost:3000/o/image.png?url=https%3A%2F%2Fgithub.com%2Ftransitive-bullshit%2Fagentic&s=%23repository-details-container+a%5Baria-label%3D%22You+must+be+signed+in+to+star+a+repository%22%5D&ob=true`

```ts
new URLSearchParams({
  url: 'https://github.com/transitive-bullshit/agentic',
  s: '#repository-details-container a[aria-label="You must be signed in to star a repository"]',
  ob: true
}).toString()
```

### twitter header

<img alt="twitter header" src="https://raw.githubusercontent.com/transitive-bullshit/embed-anything/main/media/twitter-header.jpg" width="600">

`http://localhost:3000/o/image.png?url=https%3A%2F%2Fx.com%2Ftransitive_bs&s=div%3Ahas%28%3E+a%5Bhref%24%3D%22%2Fheader_photo%22%5D%29`

```ts
new URLSearchParams({
  url: 'https://x.com/transitive_bs',
  s: 'div:has(> a[href$="/header_photo"])',
  css: 'div[style^="position: absolute"] { display: none }'
}).toString()
```

### twitter pinned tweet

<img alt="pinned tweet" src="https://raw.githubusercontent.com/transitive-bullshit/embed-anything/main/media/pinned-tweet.png" width="600">

`http://localhost:3000/o/image.png?url=https%3A%2F%2Fx.com%2Ftransitive_bs&s=article&css=div%5Bstyle%5E%3D%22position%3A+absolute%22%5D+%7B+display%3A+none+%7D`

```ts
new URLSearchParams({
  url: 'https://x.com/transitive_bs',
  s: 'article',
  css: 'div[style^="position: absolute"] { display: none }'
}).toString()
```

### twitter nth public tweet

<img alt="twitter-nth-tweet" src="https://raw.githubusercontent.com/transitive-bullshit/embed-anything/main/media/twitter-nth-tweet.jpg" width="600">

```ts
new URLSearchParams({
  url: 'https://x.com/transitive_bs',
  s: 'article',
  css: 'div[style^="position: absolute"] { display: none }',
  nth: 2
}).toString()
```

---

```js
let daysRaw = Array.from(
  $$('table[role=grid] td').map((e) => {
    const label = e.getAttribute('aria-labelledby')
    if (!label) return

    const $label = $(`#${label}`)
    const labelText = $label.textContent
    const numContributions = Number.parseInt(
      labelText.match(/(\d+) contribution/i)?.[1] ?? '0'
    )
    const date = labelText.match('contributions? on ([^.]*)\.?$')?.[1]
    if (!date) {
      console.log('no date', labelText)
    }

    return {
      level: Number.parseInt(e.getAttribute('data-level')),
      numContributions,
      date
    }
  })
)

// daysRaw.sort((a, b) => a.date.localeCompare(b.date))
let stride = Math.floor(daysRaw.length / 7)
let days = []
for (let i = 0; i < 365; ++i) {
  const weekday = Math.floor(i / (stride + 1))
  const week = i % stride

  console.log({ ...daysRaw[i], weekday, week, i })
  days[week * 7 + weekday] = daysRaw[i]
}
```

## License

MIT © [Travis Fischer](https://x.com/transitive_bs)
