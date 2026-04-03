import { memo, useMemo } from "react"
import HeroSection from "../components/home/HeroSection.jsx"
import MembershipSection from "../components/home/MembershipSection.jsx"
import AboutHomeSection from "../components/home/AboutHomeSection.jsx"
import RecentEventsSection, {
  RECENT_EVENTS_COUNT,
} from "../components/home/RecentEventsSection.jsx"
import InitiativesSection from "../components/home/InitiativesSection.jsx"
import { portfolioItems } from "../data/portfolioItems.js"
import { extraEventPages } from "../data/extraEventPages.js"
import { getRecentPortfolioItems } from "../utils/sortPortfolio.js"
import StatsSection from "../components/home/StatsSection.jsx"
import TestimonialSection from "../components/home/TestimonialSection.jsx"
import InstagramFeed from "../components/home/InstagramFeed.jsx"
import CuratorFeed from "../components/home/CuratorFeed.jsx"

const allPortfolio = [...portfolioItems, ...extraEventPages]

function HomePage() {
  const homeExcludeSlugs = useMemo(() => {
    const recent = getRecentPortfolioItems(allPortfolio, RECENT_EVENTS_COUNT)
    return new Set(recent.map((item) => item.slug))
  }, [])

  return (
    <>
      <HeroSection />
      <MembershipSection />
      <AboutHomeSection />
      <RecentEventsSection />
      <InitiativesSection excludeSlugs={homeExcludeSlugs} />
      <StatsSection />
      <TestimonialSection />
      <InstagramFeed />
      <CuratorFeed />
    </>
  )
}

export default memo(HomePage)
