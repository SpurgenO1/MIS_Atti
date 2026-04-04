import fs from "fs"
import path from "path"
import { fileURLToPath, pathToFileURL } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const sourceDir = path.join(__dirname, "../source-site")
const outFile = path.join(__dirname, "../src/generated/spaPageBundles.js")

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

async function loadRouteMaps() {
  const { portfolioItems } = await import(
    pathToFileURL(path.join(__dirname, "../src/data/portfolioItems.js")).href
  )
  const { extraEventPages } = await import(
    pathToFileURL(path.join(__dirname, "../src/data/extraEventPages.js")).href
  )
  const { htmlFileToRoute } = await import(
    pathToFileURL(path.join(__dirname, "../src/data/routeMap.js")).href
  )
  return { portfolioItems, extraEventPages, htmlFileToRoute }
}

function buildEventRouteByFile(portfolioItems, extraEventPages) {
  const m = new Map()
  for (const p of portfolioItems) m.set(p.file, `/events/${p.slug}`)
  for (const p of extraEventPages) m.set(p.file, `/events/${p.slug}`)
  return m
}

function rewriteLinks(html, portfolioItems, extraEventPages, htmlFileToRoute) {
  let s = html
  const eventPaths = buildEventRouteByFile(portfolioItems, extraEventPages)
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
  s = s.replace(/href=(["'])AnnualReport23\.html(#[^"']*)?\1/gi, (_m, q, hash) => {
    return `href=${q}/annual-report${hash || ""}${q}`
  })
  s = s.replace(/href=(["'])FlipBook\//gi, "href=$1/FlipBook/")
  s = s.replace(/href=(["'])FlipBook1\//gi, "href=$1/FlipBook1/")
  return s
}

/** Main column: page-banner → before footer (matches live YUVA pages). */
function extractMainColumn(html) {
  const startMark = "<!--====== Start Page-banner section ======-->"
  const endMark = "<!--====== Start Footer ======-->"
  const start = html.indexOf(startMark)
  let end = html.indexOf(endMark)
  if (end === -1) end = html.search(/<footer\s[^>]*class="[^"]*footer-area/i)
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("Could not extract main column (page-banner → footer)")
  }
  return html.slice(start, end)
}

function extractFirstStyleBlock(html) {
  const bodyIdx = html.search(/<body[\s>]/i)
  const headPart = bodyIdx === -1 ? html : html.slice(0, bodyIdx)
  const m = headPart.match(/<style[^>]*>([\s\S]*?)<\/style>/i)
  return m ? m[1].trim() : ""
}

function extractAchievementsHeadStyle(html) {
  const m = html.match(/<style[^>]*>([\s\S]*?#overlay[\s\S]*?)<\/style>/i)
  return m ? m[1].trim() : ""
}

function extractTeamInlineScript(html) {
  const m = html.match(/<script>\s*([\s\S]*?openPopup1[\s\S]*?)<\/script>\s*<\/body>/i)
  if (!m) return ""
  let inner = m[1].trim()
  inner = inner.replace(/const overlay = document\.getElementById\('overlay'\);\s*/g, "")
  inner = inner.replace(/const triggerImage =[^\n]+;\s*/g, "")
  inner = inner.replace(/const closeBtn =[^\n]+;\s*/g, "")
  const prefix = `const overlay1 = document.getElementById("overlay1");
const overlay2 = document.getElementById("overlay2");
const overlay3 = document.getElementById("overlay3");
const overlay4 = document.getElementById("overlay4");
const overlay5 = document.getElementById("overlay5");
const closeBtn = document.querySelector(".close-btn");
`
  inner = inner.replace(/\b(overlay[1-5])\.addEventListener/g, "$1 && $1.addEventListener")
  return prefix + inner
}

function addTopTargetToInternalLinks(html) {
  return html.replace(/<a(\s[^>]*?)href="(\/[^"]*)"/gi, (full, pre, href) => {
    if (/target\s*=/i.test(pre)) return full
    return `<a${pre}target="_top" href="${href}"`
  })
}

function buildTeamIframeDocument(mainHtml, headExtraCss, inlineScript, maps) {
  let core = rewriteLinks(mainHtml, maps.portfolioItems, maps.extraEventPages, maps.htmlFileToRoute)
  core = addTopTargetToInternalLinks(core)
  const body =
    `<div id="header-area" style="display:none" aria-hidden="true"></div>` +
    `<div id="footer-area" style="display:none" aria-hidden="true"></div>` +
    core

  const links = [
    "/assets/vendor/bootstrap/css/bootstrap.min.css",
    "/assets/css/default.css",
    "/assets/css/style.css",
    "/assets/css/responsive.css",
    "https://fonts.googleapis.com/css?family=Poppins:400,500,600",
    "/assets/fonts/fontawesome/css/all.min.css",
    "/assets/fonts/flaticon/flaticon.css",
  ]
  const linkTags = links
    .map((h) =>
      h.startsWith("http")
        ? `<link rel="stylesheet" href="${h}" crossorigin="anonymous"/>`
        : `<link rel="stylesheet" href="${h}"/>`
    )
    .join("\n")

  const scripts = [
    "/assets/vendor/jquery-3.6.0.min.js",
    "/assets/vendor/popper/popper.min.js",
    "/assets/vendor/bootstrap/js/bootstrap.min.js",
    "/assets/vendor/slick/slick.min.js",
    "/assets/vendor/magnific-popup/dist/jquery.magnific-popup.min.js",
    "/assets/vendor/isotope.min.js",
    "/assets/vendor/imagesloaded.min.js",
    "/assets/vendor/jquery.counterup.min.js",
    "/assets/vendor/jquery.waypoints.js",
    "/assets/vendor/nice-select/js/jquery.nice-select.min.js",
    "/assets/vendor/wow.min.js",
    "/assets/vendor/parallax.min.js",
    "/assets/js/theme.js",
  ]
  const scriptTags = scripts.map((s) => `<script src="${s}"></script>`).join("\n")

  const safeInline = inlineScript
    .replace(/<\/script/gi, "<\\/script")
    .replace(/\bon\w+=/gi, (m) => m)

  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><base href="/"/>
${linkTags}
<style>${headExtraCss.replace(/<\/style/gi, "<\\/style")}</style>
</head><body>
${body}
${scriptTags}
<script>${safeInline}</script>
</body></html>`
}

async function main() {
  if (!fs.existsSync(sourceDir)) {
    console.error("bundle-spa-pages: missing web/source-site — copy HTML from YUVA Copy first")
    process.exit(1)
  }

  const maps = await loadRouteMaps()
  const read = (name) => fs.readFileSync(path.join(sourceDir, name), "utf8")

  const aboutRaw = read("about.html")
  const verticalsRaw = read("Verticals.html")
  const galleryRaw = read("Gallery.html")
  const achievementsRaw = read("Achievements and recognitions.html")
  const teamRaw = read("team.html")

  const aboutMain = rewriteLinks(
    extractMainColumn(aboutRaw),
    maps.portfolioItems,
    maps.extraEventPages,
    maps.htmlFileToRoute
  )
  const verticalsMain = rewriteLinks(
    extractMainColumn(verticalsRaw),
    maps.portfolioItems,
    maps.extraEventPages,
    maps.htmlFileToRoute
  )
  const galleryMain = rewriteLinks(
    extractMainColumn(galleryRaw),
    maps.portfolioItems,
    maps.extraEventPages,
    maps.htmlFileToRoute
  )
  const accoladesMain = rewriteLinks(
    extractMainColumn(achievementsRaw),
    maps.portfolioItems,
    maps.extraEventPages,
    maps.htmlFileToRoute
  )

  const teamMain = extractMainColumn(teamRaw)
  const teamHeadCss = extractFirstStyleBlock(teamRaw)
  const teamInline = extractTeamInlineScript(teamRaw)
  const teamIframeSrcDoc = buildTeamIframeDocument(teamMain, teamHeadCss, teamInline, maps)

  const accoladesExtraCss = extractAchievementsHeadStyle(achievementsRaw)

  const payload = {
    aboutMain,
    verticalsMain,
    galleryMain,
    accoladesMain,
    accoladesExtraCss,
    teamIframeSrcDoc,
    titles: {
      about: "Yi YUVA REC",
      verticals: "YUVA REC Verticals",
      gallery: "YUVA REC Gallery",
      accolades: "Yi YUVA REC",
      team: "YUVA REC Team",
    },
  }

  fs.mkdirSync(path.dirname(outFile), { recursive: true })
  fs.writeFileSync(
    outFile,
    `// Auto-generated by web/scripts/bundle-spa-pages.mjs — do not edit
export const spaAboutMainHtml = ${JSON.stringify(payload.aboutMain)};
export const spaVerticalsMainHtml = ${JSON.stringify(payload.verticalsMain)};
export const spaGalleryMainHtml = ${JSON.stringify(payload.galleryMain)};
export const spaAccoladesMainHtml = ${JSON.stringify(payload.accoladesMain)};
export const spaAccoladesExtraCss = ${JSON.stringify(payload.accoladesExtraCss)};
export const spaTeamIframeSrcDoc = ${JSON.stringify(payload.teamIframeSrcDoc)};
export const spaPageTitles = ${JSON.stringify(payload.titles)};
`
  )
  console.error("wrote spaPageBundles.js (about, verticals, gallery, accolades, team iframe)")
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
