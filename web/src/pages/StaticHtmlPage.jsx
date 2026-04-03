import { memo, useEffect, useState } from "react"
import {
  extractTitle,
  fetchLegacyPage,
  prepareLegacyBody,
} from "../utils/legacyHtml.js"

function StaticHtmlPage({ filename }) {
  const [html, setHtml] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    ;(async () => {
      try {
        const raw = await fetchLegacyPage(filename)
        if (cancelled) return
        document.title = extractTitle(raw)
        setHtml(prepareLegacyBody(raw))
      } catch (e) {
        if (!cancelled) setError(e.message || "Could not load page")
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [filename])

  if (loading) {
    return (
      <main className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4">
        <div
          className="h-10 w-10 animate-spin rounded-full border-2 border-brand-200 border-t-brand-600"
          aria-hidden
        />
        <p className="text-sm text-muted">Loading…</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-20 text-center">
        <p className="text-red-600">{error}</p>
      </main>
    )
  }

  return (
    <main
      className="legacy-content min-h-[40vh] w-full overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export default memo(StaticHtmlPage)
