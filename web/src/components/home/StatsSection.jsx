import { memo } from "react"
import CountUp from "./CountUp.jsx"

const stats = [
  { icon: "flaticon-technical-support", end: 6, suffix: "+", label: "Years of Impacting Lives" },
  { icon: "flaticon-medal", end: 17, suffix: "+", label: "Awards & Recognitions" },
  { icon: "flaticon-start-up", end: 65, suffix: "+", label: "Successful Endeavors" },
  { icon: "flaticon-creativity", end: 700, suffix: "+", label: "Hands on Board" },
]

function StatsSection() {
  return (
    <section className="counter-area counter-area-v1 pb-90">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="section-title text-center mt-30 mb-55 wow fadeInUp">
              <span className="sub-title st-one">Statistics</span>
              <h2>Our Profile</h2>
              <p />
            </div>
          </div>
        </div>
        <div className="row no-gutters">
          {stats.map((s) => (
            <div key={s.label} className="col-lg-3 col-md-6 col-sm-12">
              <div className="counter-item mb-40 wow fadeInUp" data-wow-delay=".5s">
                <div className="icon">
                  <i className={s.icon} />
                </div>
                <div className="text">
                  <h2 className="number">
                    <CountUp end={s.end} suffix={s.suffix} />
                  </h2>
                  <p>{s.label}</p>
                  <br />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default memo(StatsSection)
