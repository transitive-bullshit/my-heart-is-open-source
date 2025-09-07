const months = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december'
]

const seen = new Set()

const daysRaw = Array.from(
  // eslint-disable-next-line no-undef
  $$('table[role=grid] tbody td[aria-labelledby]').map((e, index) => {
    const label = e.getAttribute('aria-labelledby')
    if (!label) return null

    const $label = $(`#${label}`)
    const labelText = $label.textContent
    const numContributions = Number.parseInt(
      labelText.match(/(\d+) contribution/i)?.[1] ?? '0'
    )
    const dateRaw = labelText.match('contributions? on ([^.]*)\.?$')?.[1]
    if (!dateRaw) {
      throw new Error(`no date: ${labelText}`)
    }

    const d = dateRaw.match(/^(\w+)\s+(\d+)/)
    if (!d) {
      throw new Error(`invalid date: ${labelText}`)
    }

    const monthRaw = d[1]?.toLowerCase()
    const day = Number.parseInt(d[2])
    const month = months.indexOf(monthRaw)

    const d2 = month * 31 + day
    if (seen.has(d2)) {
      return null
    }
    seen.add(d2)

    return {
      level: Number.parseInt(e.dataset.level),
      numContributions,
      date: dateRaw,
      month,
      day,
      index
    }
  })
).filter(Boolean)
