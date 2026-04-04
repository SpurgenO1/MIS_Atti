import { memo, useCallback } from "react"
import InjectedMainColumn from "../components/spa/InjectedMainColumn.jsx"
import { spaGalleryMainHtml, spaPageTitles } from "../generated/spaPageBundles.js"
import { initGalleryLightbox } from "../utils/injectedPageScripts.js"

function GallerySpaPage() {
  const afterInject = useCallback((root) => initGalleryLightbox(root), [])
  return (
    <InjectedMainColumn
      title={spaPageTitles.gallery}
      html={spaGalleryMainHtml}
      afterInject={afterInject}
    />
  )
}

export default memo(GallerySpaPage)
