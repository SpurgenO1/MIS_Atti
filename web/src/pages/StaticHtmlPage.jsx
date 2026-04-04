import { memo, useLayoutEffect, useMemo, useEffect, useRef } from "react"
import { getLegacyRender } from "../utils/legacyHtml.js"
import { ensureWowInitialized, refreshWowForContainer } from "../utils/wowSpa.js"

function StaticHtmlPage({ filename }) {
  const page = useMemo(() => getLegacyRender(filename), [filename])
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
        srcDoc={page.html}
        sandbox="allow-scripts allow-same-origin allow-popups"
      />
    )
  }

  return (
    <main
      ref={mainRef}
      className="legacy-content min-h-[40vh] w-full overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: page.html }}
    />
  )
}

export default memo(StaticHtmlPage)
