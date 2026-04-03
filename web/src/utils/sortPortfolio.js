/** Parse DD/MM/YYYY; supports leading range "DD/MM/YYYY - …" */
export function parsePortfolioDate(dateStr) {
  if (!dateStr || typeof dateStr !== "string") return null
  const first = dateStr.split("-")[0].trim()
  const m = first.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
  if (!m) return null
  const d = Number(m[1])
  const mo = Number(m[2]) - 1
  const y = Number(m[3])
  const t = Date.UTC(y, mo, d)
  return Number.isNaN(t) ? null : t
}

export function sortPortfolioByDateDesc(items) {
  return [...items].sort((a, b) => {
    const tb = parsePortfolioDate(b.date) ?? -Infinity
    const ta = parsePortfolioDate(a.date) ?? -Infinity
    return tb - ta
  })
}

export function getRecentPortfolioItems(items, count) {
  return sortPortfolioByDateDesc(items).slice(0, count)
}
