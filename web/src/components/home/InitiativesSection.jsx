import { memo, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { portfolioItems } from "../../data/portfolioItems.js"
import { extraEventPages } from "../../data/extraEventPages.js"
import { INITIATIVE_FILTERS } from "../../data/filters.js"
import InitiativeCard from "./InitiativeCard.jsx"

const allItems = [...portfolioItems, ...extraEventPages]

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
}

const blockReveal = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

function InitiativesSection({ id = "initiatives", showIntro = true, excludeSlugs = null }) {
  const [filter, setFilter] = useState("*")

  const filtered = useMemo(() => {
    let list = filter === "*" ? allItems : allItems.filter((item) => item.categories?.includes(filter))
    if (excludeSlugs?.size) {
      list = list.filter((item) => !excludeSlugs.has(item.slug))
    }
    return list
  }, [filter, excludeSlugs])

  return (
    <section className="portfolio-area portfolio-area-v1 light-gray-bg pt-130 pb-70 initiatives-premium-theme" id={id}>
      <div className="container">
        {showIntro ? (
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title mb-45 works-heading works-heading-shell">
                <span className="sub-title st-one works-kicker">Our Works</span>
                <h2>Prior Initiatives</h2>
                <p>Creating Greater Impacts for a Better Tomorrow</p>
              </div>
            </div>
          </div>
        ) : null}

        <motion.div
          className="row"
          variants={blockReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="col-lg-12">
            <div className="portfolio-filter-button mb-50">
              <ul className="filter-btn mb-20">
                {INITIATIVE_FILTERS.map((f) => (
                  <li
                    key={f.id}
                    data-filter={f.id === "*" ? "*" : `.${f.id}`}
                    className={`initiative-filter-chip ${filter === f.id ? "active" : ""}`.trim()}
                    onClick={() => setFilter(f.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        setFilter(f.id)
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    {f.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="row portfolio-grid"
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          key={filter}
        >
          {filtered.map((item) => (
            <InitiativeCard key={item.slug + item.file} item={item} initiativesMode />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default memo(InitiativesSection)
