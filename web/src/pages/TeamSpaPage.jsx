import { memo, useLayoutEffect } from "react"
import { spaTeamIframeSrcDoc, spaPageTitles } from "../generated/spaPageBundles.js"

function TeamSpaPage() {
  useLayoutEffect(() => {
    document.title = spaPageTitles.team
  }, [])

  return (
    <iframe
      title={spaPageTitles.team}
      className="team-spa-iframe block min-h-[calc(100vh-80px)] w-full border-0"
      srcDoc={spaTeamIframeSrcDoc}
      sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
    />
  )
}

export default memo(TeamSpaPage)
