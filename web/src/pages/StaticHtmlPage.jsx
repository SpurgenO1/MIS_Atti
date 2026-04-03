import { memo, useLayoutEffect, useMemo } from "react"
import { getLegacyRender } from "../utils/legacyHtml.js"

function StaticHtmlPage({ filename }) {
  const page = useMemo(() => getLegacyRender(filename), [filename])

  useLayoutEffect(() => {
    if (page?.title) document.title = page.title
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
      className="legacy-content min-h-[40vh] w-full overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: page.html }}
    />
  )
}

export default memo(StaticHtmlPage)
