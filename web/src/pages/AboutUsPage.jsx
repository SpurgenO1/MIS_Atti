import { memo } from "react"
import InjectedMainColumn from "../components/spa/InjectedMainColumn.jsx"
import { spaAboutMainHtml, spaPageTitles } from "../generated/spaPageBundles.js"

function AboutUsPage() {
  return <InjectedMainColumn title={spaPageTitles.about} html={spaAboutMainHtml} />
}

export default memo(AboutUsPage)
