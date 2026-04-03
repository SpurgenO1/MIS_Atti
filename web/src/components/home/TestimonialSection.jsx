import { memo } from "react"

function TestimonialSection() {
  return (
    <section className="testimonial-area testimonial-area-v1 dark-blue-bg pattern-bg pt-130 pb-5">
      <div className="shape-img wow fadeInRight animate-float-y">
        <span>
          <img src="/assets/images/testimonial/img-3.jpg" alt="" />
        </span>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="section-title section-title-white wow fadeInLeft">
              <span className="sub-title st-one">Testimonials</span>
              <h2>What Our Parent Club Say About Us</h2>
              <p />
            </div>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="testimonial-slider-one mt-5 mb-10 wow fadeInRight">
            <div className="testimonial-item align-items-center">
              <div className="testimonial-content row align-items-center" style={{ position: "relative" }}>
                <div style={{ width: "5%" }} />
                <div className="img-holder mt-5 mb-50 wow fadeInLeft" style={{ width: "30%" }}>
                  <img src="/assets/images/testimonial/img-1.jpg" alt="" />
                </div>
                <div style={{ width: "1%" }} />
                <div style={{ width: "61%" }}>
                  <i className="flaticon-quotation" style={{ fontSize: "3.9vw", lineHeight: "3.8vw" }} />
                  <h3 style={{ fontSize: "1.7vw", lineHeight: "3.5vw" }}>
                    I have personally worked with the Yuva students from the Rajalakshmi Engineering
                    College (REC) - Yuva club in multiple occasion during my leadership stint at Yi
                    Chennai Chapter.
                    <br />
                    <br />
                    The students are very methodical and disciplined. They take good care in planning
                    and organizing the REC projects and events. They were also very forthcoming and
                    proactive when it comes to Yuva participation in all the Yi Chennai led events.
                    <br />
                    <br />
                    We wish them a very happy journey in Yuva and learn leaps and bounds through our
                    projects and initiatives, which is going to help them in achieving their desired
                    career and future goal.
                  </h3>
                  <div className="author-title" style={{ position: "relative" }}>
                    <h4 style={{ fontSize: "2.1vw", lineHeight: "3.9vw" }}>Mr. Pratheep Chandramohan</h4>
                    <p className="position" style={{ fontSize: "1.7vw", lineHeight: "3.4vw" }}>
                      Mentor - Yi Chennai Chapter
                    </p>
                  </div>
                </div>
                <div style={{ width: "3%" }}>
                  <p />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(TestimonialSection)
