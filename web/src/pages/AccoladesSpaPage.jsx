import { memo, useCallback } from "react"
import InjectedMainColumn from "../components/spa/InjectedMainColumn.jsx"
import { spaAccoladesMainHtml, spaAccoladesExtraCss, spaPageTitles } from "../generated/spaPageBundles.js"
import { initAccoladesSlider } from "../utils/injectedPageScripts.js"

function AccoladesSpaPage() {
  const afterInject = useCallback((root) => initAccoladesSlider(root), [])

  return (
    <>
      {spaAccoladesExtraCss ? (
        <style dangerouslySetInnerHTML={{ __html: spaAccoladesExtraCss }} />
      ) : null}
      <InjectedMainColumn
        title={spaPageTitles.accolades}
        html={spaAccoladesMainHtml}
        afterInject={afterInject}
      />
    </>
  )
}

export default memo(AccoladesSpaPage)
