import { memo } from "react"
import { Link } from "react-router-dom"

function InitiativeCard({ item }) {
  const to = `/events/${item.slug}`
  const mediaPath = `/${item.image.replace(/^\/?/, "")}`
  const catClass = (item.categories || []).join(" ")

  return (
    <div className={`col-lg-4 col-md-6 col-sm-6 portfolio-column ${catClass}`.trim()}>
      <div className="portfolio-item portfolio-style-one mb-55 wow fadeInUp">
        <div className="img-holder">
          {item.mediaType === "video" ? (
            <video autoPlay loop muted playsInline>
              <source src={mediaPath} type="video/mp4" />
            </video>
          ) : (
            <img src={mediaPath} alt="Img" loading="lazy" />
          )}
          <Link to={to} className="portfolio-hover">
            <div className="hover-content">
              <i className="far fa-external-link" />
            </div>
          </Link>
        </div>
        <div className="text">
          <h3 className="title">
            <Link to={to}>{item.title}</Link>
          </h3>
          {item.date ? <span className="cat-link">{item.date}</span> : null}
        </div>
      </div>
    </div>
  )
}

export default memo(InitiativeCard)
