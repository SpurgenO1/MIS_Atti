import { memo, useLayoutEffect } from "react"
import PageBanner from "../components/common/PageBanner.jsx"
import InitiativesSection from "../components/home/InitiativesSection.jsx"

function InitiativesPage() {
  useLayoutEffect(() => {
    document.title = "Initiatives | Yi YUVA REC"
  }, [])

  return (
    <>
      <PageBanner
        title="YUVA Initiatives"
        crumbs={[{ label: "Initiatives" }]}
      />
      <InitiativesSection showIntro />
    </>
  )
}

export default memo(InitiativesPage)
