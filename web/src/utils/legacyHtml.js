import { legacyPageTitles, legacyPageBodies } from "../generated/legacyContent.js"
import { legacyFullDocuments } from "../generated/legacyFullDocuments.js"

function normalizeLegacyHtml(html) {
  if (!html) return html

  // Repair malformed legacy markup like `<section ...> id="event-gallery"`
  // so the id is attached to the section instead of rendered as text.
  return html.replace(
    /(<section\b[^>]*?)>\s*id=(["'][^"']+["'])/gi,
    "$1 id=$2>",
  )
}

/**
 * @returns {{ mode: "iframe" | "body", title: string, html: string } | null}
 */
export function getLegacyRender(filename) {
  const title = legacyPageTitles[filename] || "Yi YUVA REC"
  const full = legacyFullDocuments[filename]
  if (full) return { mode: "iframe", title, html: normalizeLegacyHtml(full) }
  const body = legacyPageBodies[filename]
  if (body) return { mode: "body", title, html: normalizeLegacyHtml(body) }
  return null
}
