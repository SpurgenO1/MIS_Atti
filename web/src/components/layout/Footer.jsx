import { memo } from "react"
import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="footer-area page-footer light-gray-bg mt-auto">
      <div className="container">
        <div className="footer-widget pt-70 pb-40">
          <div className="row">
            <div className="col-lg-5 col-md-5 col-sm-5">
              <div className="widget footer-nav-widget mb-40 wow fadeInUp" data-wow-delay=".15s">
                <h4 className="widget-title">Links</h4>
                <ul className="widget-nav">
                  <li>
                    <Link to="/about">About Us</Link>
                  </li>
                  <li>
                    <Link to="/team">Meet The Team</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact Us</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-5 col-md-5 col-sm-5">
              <div className="widget social-widget mb-40 wow fadeInUp" data-wow-delay=".15s">
                <h4 className="widget-title">Follow</h4>
                <ul className="social-nav">
                  <li>
                    <a href="https://www.instagram.com/yiciirec/" target="_blank" rel="noreferrer">
                      <i className="fab fa-instagram" /> Instagram
                    </a>
                  </li>
                  <li>
                    <a href="https://open.spotify.com/show/13OYvzZo5LqlA2pmu5EN9J" target="_blank" rel="noreferrer">
                      <i className="fab fa-spotify" /> Spotify
                    </a>
                  </li>
                  <li>
                    <a href="https://youtube.com/@yiyuvarec6604" target="_blank" rel="noreferrer">
                      <i className="fab fa-youtube" /> Youtube
                    </a>
                  </li>
                  <li>
                    <a href="https://www.facebook.com/youngindiansrec" target="_blank" rel="noreferrer">
                      <i className="fab fa-facebook" /> Facebook
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2">
              <div className="team-item mb-55 wow fadeInUp" data-wow-delay=".10s">
                <div className="img-holder">
                  <img src="/assets/images/logo/rec.png" alt="" />
                </div>
                <div className="img-holder">
                  <br />
                  <img src="/assets/images/logo/logo-2.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="row">
            <div className="col-lg-6">
              <div className="copyright-text" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default memo(Footer)
