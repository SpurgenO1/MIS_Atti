import { legacyPageTitles, legacyPageBodies } from "../generated/legacyContent.js"
import { legacyFullDocuments } from "../generated/legacyFullDocuments.js"

/**
 * @returns {{ mode: "iframe" | "body", title: string, html: string } | null}
 */
export function getLegacyRender(filename) {
  const title = legacyPageTitles[filename] || "Yi YUVA REC"
  const full = legacyFullDocuments[filename]
  if (full) return { mode: "iframe", title, html: full }
  const body = legacyPageBodies[filename]
  if (body) return { mode: "body", title, html: body }
  return null
}
