### github contributor graph

<img alt="github contributor graph" src="https://raw.githubusercontent.com/transitive-bullshit/my-heart-is-open-source/main/public/github-contribution-graph.png">

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

<img alt="github repo star count" src="https://raw.githubusercontent.com/transitive-bullshit/my-heart-is-open-source/main/public/github-repo-star-count">

`http://localhost:3000/o/image.png?url=https%3A%2F%2Fgithub.com%2Ftransitive-bullshit%2Fagentic&s=%23repository-details-container+a%5Baria-label%3D%22You+must+be+signed+in+to+star+a+repository%22%5D&ob=true`

```ts
new URLSearchParams({
  url: 'https://github.com/transitive-bullshit/agentic',
  s: '#repository-details-container a[aria-label="You must be signed in to star a repository"]',
  ob: true
}).toString()
```

### twitter header

<img alt="twitter header" src="https://raw.githubusercontent.com/transitive-bullshit/my-heart-is-open-source/main/public/twitter-header.jpg" width="600">

`http://localhost:3000/o/image.png?url=https%3A%2F%2Fx.com%2Ftransitive_bs&s=div%3Ahas%28%3E+a%5Bhref%24%3D%22%2Fheader_photo%22%5D%29`

```ts
new URLSearchParams({
  url: 'https://x.com/transitive_bs',
  s: 'div:has(> a[href$="/header_photo"])',
  css: 'div[style^="position: absolute"] { display: none }'
}).toString()
```

### twitter pinned tweet

<img alt="pinned tweet" src="https://raw.githubusercontent.com/transitive-bullshit/my-heart-is-open-source/main/public/pinned-tweet.png" width="600">

`http://localhost:3000/o/image.png?url=https%3A%2F%2Fx.com%2Ftransitive_bs&s=article&css=div%5Bstyle%5E%3D%22position%3A+absolute%22%5D+%7B+display%3A+none+%7D`

```ts
new URLSearchParams({
  url: 'https://x.com/transitive_bs',
  s: 'article',
  css: 'div[style^="position: absolute"] { display: none }'
}).toString()
```

### twitter nth public tweet

<img alt="twitter-nth-tweet" src="https://raw.githubusercontent.com/transitive-bullshit/my-heart-is-open-source/main/public/twitter-nth-tweet.jpg" width="600">

```ts
new URLSearchParams({
  url: 'https://x.com/transitive_bs',
  s: 'article',
  css: 'div[style^="position: absolute"] { display: none }',
  nth: 2
}).toString()
```
