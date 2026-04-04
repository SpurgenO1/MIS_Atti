import { memo, useLayoutEffect } from "react"
import { spaTeamIframeSrcDoc, spaPageTitles } from "../generated/spaPageBundles.js"

function TeamSpaPage() {
  useLayoutEffect(() => {
    document.title = spaPageTitles.team
  }, [])

  useLayoutEffect(() => {
    const html = document.documentElement
    const body = document.body
    const root = document.getElementById("root")
    const prevHtmlOverflow = html.style.overflow
    const prevBodyOverflow = body.style.overflow
    const prevBodyMargin = body.style.margin
    const prevRootOverflow = root?.style.overflow ?? ""
    const prevRootMinH = root?.style.minHeight ?? ""
    html.style.overflow = "hidden"
    body.style.overflow = "hidden"
    body.style.margin = "0"
    if (root) {
      root.style.overflow = "hidden"
      root.style.minHeight = "100%"
    }
    return () => {
      html.style.overflow = prevHtmlOverflow
      body.style.overflow = prevBodyOverflow
      body.style.margin = prevBodyMargin
      if (root) {
        root.style.overflow = prevRootOverflow
        root.style.minHeight = prevRootMinH
      }
    }
  }, [])

  return (
    <iframe
      title={spaPageTitles.team}
      className="team-full-page-iframe fixed inset-0 z-[1] h-[100dvh] w-full border-0"
      srcDoc={spaTeamIframeSrcDoc}
      sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
    />
  )
}

export default memo(TeamSpaPage)
