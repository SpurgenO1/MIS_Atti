import { memo, useCallback, useState } from "react"
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar.jsx"
import Footer from "./Footer.jsx"
import OffcanvasPanel from "./OffcanvasPanel.jsx"
import BackToTop from "../common/BackToTop.jsx"
import PodcastFab from "../common/PodcastFab.jsx"

function Layout() {
  const [panelOpen, setPanelOpen] = useState(false)
  const openPanel = useCallback(() => setPanelOpen(true), [])
  const closePanel = useCallback(() => setPanelOpen(false), [])

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar onOpenPanel={openPanel} />
      <OffcanvasPanel open={panelOpen} onClose={closePanel} />
      <Outlet />
      <Footer />
      <BackToTop />
      <PodcastFab />
    </div>
  )
}

export default memo(Layout)
