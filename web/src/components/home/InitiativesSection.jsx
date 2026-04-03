import { memo, useMemo, useState } from "react"
import { portfolioItems } from "../../data/portfolioItems.js"
import { extraEventPages } from "../../data/extraEventPages.js"
import { INITIATIVE_FILTERS } from "../../data/filters.js"
import InitiativeCard from "./InitiativeCard.jsx"

const allItems = [...portfolioItems, ...extraEventPages]

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
    <section className="portfolio-area portfolio-area-v1 light-gray-bg pt-130 pb-70" id={id}>
      <div className="container">
        {showIntro ? (
          <div className="row">
            <div className="col-lg-8">
              <div className="section-title mb-45 wow fadeInUp">
                <span className="sub-title st-one">Our Works</span>
                <h2>Prior Initiatives</h2>
                <p>Creating Greater Impacts for a Better Tomorrow</p>
              </div>
            </div>
          </div>
        ) : null}

        <div className="row">
          <div className="col-lg-12">
            <div className="portfolio-filter-button mb-50 wow fadeInLeft">
              <ul className="filter-btn mb-20">
                {INITIATIVE_FILTERS.map((f) => (
                  <li
                    key={f.id}
                    data-filter={f.id === "*" ? "*" : `.${f.id}`}
                    className={filter === f.id ? "active" : ""}
                    onClick={() => setFilter(f.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        setFilter(f.id)
                      }
                    }}
                    role="presentation"
                  >
                    {f.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="row portfolio-grid">
          {filtered.map((item) => (
            <InitiativeCard key={item.slug + item.file} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default memo(InitiativesSection)
