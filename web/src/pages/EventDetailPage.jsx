import { memo, useMemo } from "react"
import { Link, useParams } from "react-router-dom"
import { portfolioItems } from "../data/portfolioItems.js"
import { extraEventPages } from "../data/extraEventPages.js"
import StaticHtmlPage from "./StaticHtmlPage.jsx"

const merged = [...portfolioItems, ...extraEventPages]

function EventDetailPage() {
  const { slug } = useParams()
  const item = useMemo(() => merged.find((p) => p.slug === slug), [slug])

  if (!item) {
    return (
      <main className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold text-ink">Event not found</h1>
        <p className="mt-3 text-muted">This initiative may have moved.</p>
        <Link
          to="/initiatives"
          className="mt-8 inline-block rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white"
        >
          All initiatives
        </Link>
      </main>
    )
  }

  return <StaticHtmlPage filename={item.file} />
}

export default memo(EventDetailPage)
