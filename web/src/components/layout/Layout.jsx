import { memo, useCallback, useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Outlet, useLocation } from "react-router-dom"
import Navbar from "./Navbar.jsx"
import Footer from "./Footer.jsx"
import OffcanvasPanel from "./OffcanvasPanel.jsx"
import BackToTop from "../common/BackToTop.jsx"
import PodcastFab from "../common/PodcastFab.jsx"
import { ensureWowInitialized } from "../../utils/wowSpa.js"

function Layout() {
  const location = useLocation()
  const [panelOpen, setPanelOpen] = useState(false)
  const openPanel = useCallback(() => setPanelOpen(true), [])
  const closePanel = useCallback(() => setPanelOpen(false), [])

  useEffect(() => {
    ensureWowInitialized().catch(() => {})
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar onOpenPanel={openPanel} />
      <OffcanvasPanel open={panelOpen} onClose={closePanel} />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname + location.search}
          className="flex-1 w-full"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
      <Footer />
      <BackToTop />
      <PodcastFab />
    </div>
  )
}

export default memo(Layout)
