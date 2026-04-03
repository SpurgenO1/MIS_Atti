import { memo } from "react"
import { Link } from "react-router-dom"

function AboutHomeSection() {
  return (
    <section className="about-area about-area-v1 position-relative pt-130">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <br />
          <div className="col-lg-6 col-xl-6">
            <div className="img-holder video-container wow fadeInLeft">
              <div>
                <video autoPlay loop muted playsInline>
                  <source src="/assets/images/about/vdo.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-xl-6">
            <div className="text-wrapper mb-50 wow fadeInRight">
              <div className="section-title mt-30 mb-15">
                <span className="sub-title st-one">About Us</span>
                <h2>Making a difference since 2017</h2>
              </div>
              <h4>Harnessing the Massive Power of Youth</h4>
              <p align="justify">
                We continue to organize various events, workshops, and initiatives that promote
                community service, entrepreneurship and other activities aimed at empowering students
                to make a positive impact on society.
              </p>
              <ul className="list-style-one mb-35">
                <li>Youth Leadership</li>
                <li>Nation Building</li>
                <li>Thought Leadership</li>
              </ul>
              <Link to="/about" className="main-btn bordered-btn btn-blue arrow-btn">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(AboutHomeSection)
