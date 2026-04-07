import { memo } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const cardVariants = {
  hidden: { opacity: 0, y: 34 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

const ICON_FILE_BY_CATEGORY = {
  "cat-1": "accessibility.png",
  "cat-2": "arts-culture.png",
  "cat-3": "climate change.png",
  "cat-4": "entrepreneurship-innovation.png",
  "cat-5": "health.png",
  "cat-6": "masoom.png",
  "cat-7": "membership.png",
  "cat-8": "projects.png",
  "cat-9": "road.png",
  "cat-10": "rural initiatives.png",
  "cat-11": "sports.png",
  "cat-12": "other.png",
}

function InitiativeCard({ item, initiativesMode = false }) {
  const to = `/events/${item.slug}`
  const mediaPath = `/${item.image.replace(/^\/?/, "")}`
  const catClass = (item.categories || []).join(" ")
  const iconCategory = item.categories?.[0] || "cat-12"
  const iconFile = ICON_FILE_BY_CATEGORY[iconCategory] || ICON_FILE_BY_CATEGORY["cat-12"]
  const iconSrc = `/assets/images/Initiatives_icon/${encodeURIComponent(iconFile)}`

  return (
    <motion.div
      className={`col-lg-4 col-md-6 col-sm-6 portfolio-column ${catClass}`.trim()}
      variants={cardVariants}
    >
      <motion.div
        className={`portfolio-item portfolio-style-one mb-55 initiative-card-base ${initiativesMode ? "initiatives-card" : ""}`.trim()}
        whileHover={{ scale: 1.04, y: -6 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="img-holder">
          {item.mediaType === "video" ? (
            <video autoPlay loop muted playsInline>
              <source src={mediaPath} type="video/mp4" />
            </video>
          ) : (
            <img src={mediaPath} alt="Img" loading="lazy" />
          )}
          <Link
            to={to}
            className={`portfolio-hover initiative-card-overlay ${initiativesMode ? "initiatives-action-btn" : "default-action-btn"}`.trim()}
          >
            <div className="hover-content">
              <i className="far fa-external-link" />
              <span>{initiativesMode ? "View details" : "Open event"}</span>
            </div>
          </Link>
        </div>
        <div className={`text ${initiativesMode ? "initiatives-card-text" : ""}`.trim()}>
          {initiativesMode ? (
            <div className="initiative-meta-row">
              <span className="initiative-icon-badge" aria-hidden="true">
                <img src={iconSrc} alt="" loading="lazy" />
              </span>
              {item.date ? <span className="cat-link initiatives-date">{item.date}</span> : null}
            </div>
          ) : null}
          <h3 className="title">
            <Link to={to}>{item.title}</Link>
          </h3>
          {!initiativesMode && item.date ? <span className="cat-link">{item.date}</span> : null}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default memo(InitiativeCard)
