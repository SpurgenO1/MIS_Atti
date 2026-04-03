import { memo } from "react"
import HeroSection from "../components/home/HeroSection.jsx"
import MembershipSection from "../components/home/MembershipSection.jsx"
import AboutHomeSection from "../components/home/AboutHomeSection.jsx"
import InitiativesSection from "../components/home/InitiativesSection.jsx"
import StatsSection from "../components/home/StatsSection.jsx"
import TestimonialSection from "../components/home/TestimonialSection.jsx"
import InstagramFeed from "../components/home/InstagramFeed.jsx"
import CuratorFeed from "../components/home/CuratorFeed.jsx"

function HomePage() {
  return (
    <>
      <HeroSection />
      <MembershipSection />
      <AboutHomeSection />
      <InitiativesSection />
      <StatsSection />
      <TestimonialSection />
      <InstagramFeed />
      <CuratorFeed />
    </>
  )
}

export default memo(HomePage)
