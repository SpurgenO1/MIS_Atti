import { memo, useLayoutEffect, useState } from "react"
import { BrowserRouter, Routes, Route, useLocation, Link } from "react-router-dom"
import Layout from "./components/layout/Layout.jsx"
import HomePage from "./pages/HomePage.jsx"
import InitiativesPage from "./pages/InitiativesPage.jsx"
import EventDetailPage from "./pages/EventDetailPage.jsx"
import StaticHtmlPage from "./pages/StaticHtmlPage.jsx"
import AboutUsPage from "./pages/AboutUsPage.jsx"
import TeamSpaPage from "./pages/TeamSpaPage.jsx"
import GallerySpaPage from "./pages/GallerySpaPage.jsx"
import VerticalsSpaPage from "./pages/VerticalsSpaPage.jsx"
import AccoladesSpaPage from "./pages/AccoladesSpaPage.jsx"
import IntroOverlay from "./components/common/IntroOverlay.jsx"

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useLayoutEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return undefined
    }

    const targetId = decodeURIComponent(hash.slice(1))
    let frameId = 0
    let timeoutId = 0
    let attempts = 0

    const scrollToHashTarget = () => {
      const target = document.getElementById(targetId)
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" })
        return
      }

      if (attempts >= 20) return
      attempts += 1
      frameId = requestAnimationFrame(() => {
        timeoutId = window.setTimeout(scrollToHashTarget, 50)
      })
    }

    scrollToHashTarget()

    return () => {
      cancelAnimationFrame(frameId)
      window.clearTimeout(timeoutId)
    }
  }, [pathname, hash])
  return null
}

function HomeTitle() {
  useLayoutEffect(() => {
    document.title = "Yi YUVA REC"
  }, [])
  return null
}

function NotFound() {
  return (
    <main className="mx-auto max-w-lg px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold text-ink">Page not found</h1>
      <Link to="/" className="mt-6 inline-block text-brand-600 hover:underline">
        Back to home
      </Link>
    </main>
  )
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/team" element={<TeamSpaPage />} />
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <>
                <HomeTitle />
                <HomePage />
              </>
            }
          />
          <Route path="/initiatives" element={<InitiativesPage />} />
          <Route path="/events/:slug" element={<EventDetailPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/gallery" element={<GallerySpaPage />} />
          <Route path="/verticals" element={<VerticalsSpaPage />} />
          <Route path="/accolades" element={<AccoladesSpaPage />} />
          <Route path="/registrations" element={<StaticHtmlPage filename="reg.html" />} />
          <Route path="/contact" element={<StaticHtmlPage filename="contact.html" />} />
          <Route path="/podcast" element={<StaticHtmlPage filename="podcast.html" />} />
          <Route path="/annual-report" element={<StaticHtmlPage filename="AnnualReport23.html" />} />
          <Route path="/yi-health" element={<StaticHtmlPage filename="YI Health report.html" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

function App() {
  const [showIntro, setShowIntro] = useState(() => {
    // Check if it's the first visit
    return !localStorage.getItem("introPlayed");
  });

  const handleIntroComplete = () => {
    localStorage.setItem("introPlayed", "true");
    setShowIntro(false);
  };

  return (
    <>
      {showIntro && <IntroOverlay onComplete={handleIntroComplete} />}
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  )
}

export default memo(App)
