import { memo, useMemo } from "react"
import { Link } from "react-router-dom"
import { portfolioItems } from "../../data/portfolioItems.js"
import { extraEventPages } from "../../data/extraEventPages.js"
import { getRecentPortfolioItems } from "../../utils/sortPortfolio.js"
import InitiativeCard from "./InitiativeCard.jsx"

export const RECENT_EVENTS_COUNT = 6
const allItems = [...portfolioItems, ...extraEventPages]

function RecentEventsSection() {
  const recent = useMemo(() => getRecentPortfolioItems(allItems, RECENT_EVENTS_COUNT), [])

  return (
    <section className="portfolio-area portfolio-area-v1 pt-130 pb-70" aria-labelledby="recent-events-heading">
      <div className="container">
        <div className="row align-items-end mb-45">
          <div className="col-lg-8">
            <div className="section-title works-heading">
              <span className="sub-title st-one works-kicker">Our Works</span>
              <h2 id="recent-events-heading">Recent Events</h2>
              <p>Highlights from our latest initiatives</p>
            </div>
          </div>
          <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
            <Link to="/initiatives" className="main-btn bordered-btn btn-blue arrow-btn">
              All initiatives
            </Link>
          </div>
        </div>
        <div className="row portfolio-grid">
          {recent.map((item) => (
            <InitiativeCard key={item.slug + item.file} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default memo(RecentEventsSection)
