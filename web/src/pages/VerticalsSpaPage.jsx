import { memo } from "react"
import InjectedMainColumn from "../components/spa/InjectedMainColumn.jsx"
import { spaVerticalsMainHtml, spaPageTitles } from "../generated/spaPageBundles.js"

function VerticalsSpaPage() {
  return <InjectedMainColumn title={spaPageTitles.verticals} html={spaVerticalsMainHtml} />
}

export default memo(VerticalsSpaPage)
