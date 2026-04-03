import { memo } from "react"
import { Link } from "react-router-dom"

function OffcanvasPanel({ open, onClose }) {
  return (
    <div className={`offcanvas-panel ${open ? "panel-on" : ""}`} aria-hidden={!open}>
      <div className="panel-overlay" onClick={onClose} role="presentation" />
      <div className="offcanvas-panel-inner">
        <div className="panel-logo">
          <Link to="/" onClick={onClose}>
            <img src="/assets/images/logo/logo-1.png" alt="YUVA REC" />
          </Link>
        </div>
        <div className="about-us">
          <h5 className="panel-widget-title">About Us</h5>
          <p className="text-justify">
            We passionately orchestrate various events, workshops, and initiatives that foster a
            profound culture of community service, ignite entrepreneurial prowess, and present
            awareness campaigns. Our relentless pursuit of empowering students, harnesses their
            potential to create a transformative impact on society. Together, we forge a future
            where their actions become a crescendo of positive impact, best benefitting the society.
          </p>
        </div>
        <div className="contact-us">
          <h5 className="panel-widget-title">Contact Us</h5>
          <ul>
            <li>
              <i className="fal fa-map-marker-alt" />
              Rajalakshmi Engineering College, Rajalakshmi Nagar, Thandalam, Chennai - 602 105.
            </li>
            <li>
              <i className="fal fa-envelope-open" />
              <a href="mailto:yiyuva2019@gmail.com">yiyuva2019@gmail.com</a>
              <a href="mailto:yuva@rajalakshmi.edu.in">yuva@rajalakshmi.edu.in</a>
            </li>
            <li>
              <i className="fal fa-phone" />
              <a href="tel:9841937389">Linghesh B - 9841937389</a>
              <a href="tel:9894376855">Nandhini R - 9894376855</a>
            </li>
          </ul>
        </div>
        <button type="button" className="panel-close" onClick={onClose} aria-label="Close">
          <i className="fal fa-times" />
        </button>
      </div>
    </div>
  )
}

export default memo(OffcanvasPanel)
