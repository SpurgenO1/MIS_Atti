import { htmlFileToRoute } from "../data/routeMap.js"
import { portfolioItems } from "../data/portfolioItems.js"
import { extraEventPages } from "../data/extraEventPages.js"

export function extractTitle(rawHtml) {
  const m = rawHtml.match(/<title>([^<]*)<\/title>/i)
  const t = m ? m[1].trim() : ""
  if (!t || t.includes("<!DOCTYPE") || t.length > 120) return "Yi YUVA REC"
  return t
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

export function buildEventRouteByFile() {
  const m = new Map()
  for (const p of portfolioItems) {
    m.set(p.file, `/events/${p.slug}`)
  }
  for (const p of extraEventPages) {
    m.set(p.file, `/events/${p.slug}`)
  }
  return m
}

/**
 * Strip chrome from legacy full-page HTML and rewrite links for SPA + absolute /assets paths.
 */
export function prepareLegacyBody(rawHtml) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(rawHtml, "text/html")

  doc.querySelectorAll("header.theme-header").forEach((el) => el.remove())
  doc.querySelectorAll(".offcanvas-panel").forEach((el) => el.remove())
  doc.querySelectorAll("footer.footer-area, footer.page-footer").forEach((el) => el.remove())
  doc.querySelectorAll(".back-to-top").forEach((el) => el.remove())
  doc.querySelectorAll("script").forEach((el) => el.remove())

  let html = doc.body.innerHTML
  html = rewriteLinks(html)
  return html
}

function rewriteLinks(html) {
  let s = html
  const eventPaths = buildEventRouteByFile()

  eventPaths.forEach((route, file) => {
    const re = new RegExp(`href=(["'])${escapeRegExp(file)}([^"']*?)\\1`, "gi")
    s = s.replace(re, `href=$1${route}$2$1`)
  })

  Object.entries(htmlFileToRoute).forEach(([file, route]) => {
    const re = new RegExp(`href=(["'])${escapeRegExp(file)}([^"']*?)\\1`, "gi")
    s = s.replace(re, `href=$1${route}$2$1`)
  })

  s = s.replace(/\b(src|href)=(["'])(\.\.\/)*assets\//gi, "$1=$2/assets/")
  s = s.replace(/\baction=(["'])email\.php\1/gi, "action=$1/email.php$1")
  return s
}

export async function fetchLegacyPage(filename) {
  const enc = encodeURIComponent(filename)
  const res = await fetch(`/site/${enc}`)
  if (!res.ok) throw new Error(`Failed to load ${filename}`)
  return res.text()
}
