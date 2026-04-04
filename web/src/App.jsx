import { memo, useLayoutEffect } from "react"
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

function ScrollToTop() {
  const { pathname } = useLocation()
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
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
          <Route path="/team" element={<TeamSpaPage />} />
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
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default memo(App)
