import { memo, useLayoutEffect, useMemo, useEffect, useRef } from "react"
import { getLegacyRender } from "../utils/legacyHtml.js"
import { ensureWowInitialized, refreshWowForContainer } from "../utils/wowSpa.js"

function normalizeLegacyAssetPaths(html) {
  if (!html) return html

  // Some legacy pages contain Windows-style URL separators and missing leading slash.
  let normalized = html.replace(/(src|href)=(["'])([^"']*\\[^"']*)\2/gi, (_, attr, quote, value) => {
    return `${attr}=${quote}${value.replace(/\\/g, "/")}${quote}`
  })

  normalized = normalized.replace(/(src|href)=(["'])assets\//gi, "$1=$2/assets/")

  return normalized
}

function StaticHtmlPage({ filename }) {
  const page = useMemo(() => getLegacyRender(filename), [filename])
  const pageHtml = useMemo(() => normalizeLegacyAssetPaths(page?.html), [page])
  const mainRef = useRef(null)

  useLayoutEffect(() => {
    if (page?.title) document.title = page.title
  }, [page])

  useEffect(() => {
    if (!page || page.mode !== "body") return undefined
    const root = mainRef.current
    if (!root) return undefined
    let alive = true
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!alive) return
        ensureWowInitialized()
          .then(() => {
            if (alive) refreshWowForContainer(root)
          })
          .catch(() => {})
      })
    })
    return () => {
      alive = false
      cancelAnimationFrame(id)
    }
  }, [page])

  useEffect(() => {
    if (!page || page.mode !== "body") return undefined
    const root = mainRef.current
    if (!root) return undefined

    const gallerySections = Array.from(root.querySelectorAll(".team-area-v2")).filter((section) => {
      const heading = section.querySelector(".section-title h2")
      return heading?.textContent?.trim() === "Event Gallery"
    })

    if (!gallerySections.length) return undefined

    let rafId = 0

    const updateGalleryMotion = () => {
      const viewportHeight = window.innerHeight || 1

      for (const section of gallerySections) {
        const rect = section.getBoundingClientRect()
        const sectionHeight = Math.max(rect.height, 1)
        const settlePoint = viewportHeight * 0.55
        const isSettled = rect.top <= settlePoint && rect.bottom >= viewportHeight * 0.28

        section.classList.toggle("legacy-event-gallery-motion", true)
        section.classList.toggle("legacy-event-gallery-settled", isSettled)

        if (isSettled) {
          section.style.setProperty("--event-gallery-shift", "0px")
          section.style.setProperty("--event-gallery-tilt", "0deg")
          section.style.setProperty("--event-gallery-card-shift", "0px")
          continue
        }

        const progress = Math.min(1, Math.max(0, (viewportHeight - rect.top) / (viewportHeight + sectionHeight * 0.35)))
        const shift = Math.round(-48 + progress * 48)
        const tilt = ((1 - progress) * 3.25).toFixed(2)
        const cardShift = Math.round(-22 + progress * 22)

        section.style.setProperty("--event-gallery-shift", `${shift}px`)
        section.style.setProperty("--event-gallery-tilt", `${tilt}deg`)
        section.style.setProperty("--event-gallery-card-shift", `${cardShift}px`)
      }
    }

    const scheduleUpdate = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(updateGalleryMotion)
    }

    updateGalleryMotion()

    window.addEventListener("scroll", scheduleUpdate, { passive: true })
    window.addEventListener("resize", scheduleUpdate)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener("scroll", scheduleUpdate)
      window.removeEventListener("resize", scheduleUpdate)
    }
  }, [page])

  if (!page) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-20 text-center">
        <p className="text-red-600">Page not found</p>
      </main>
    )
  }

  if (page.mode === "iframe") {
    return (
      <iframe
        title={page.title}
        className="legacy-iframe block min-h-[90vh] w-full border-0"
        srcDoc={pageHtml}
        sandbox="allow-scripts allow-same-origin allow-popups"
      />
    )
  }

  return (
    <main
      ref={mainRef}
      className="legacy-content premium-page-shell min-h-[40vh] w-full overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: pageHtml }}
    />
  )
}

export default memo(StaticHtmlPage)
