import { memo, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { loadParallaxScript } from "../../utils/parallaxScenes.js"

function HeroSection() {
  const sectionRef = useRef(null)
  const parallaxInstancesRef = useRef([])

  useEffect(() => {
    let cancelled = false
    parallaxInstancesRef.current = []

    loadParallaxScript()
      .then(() => {
        if (cancelled || !sectionRef.current || !window.Parallax) return
        sectionRef.current.querySelectorAll(".scene").forEach((el) => {
          try {
            parallaxInstancesRef.current.push(new window.Parallax(el))
          } catch {
            /* ignore single-scene init errors */
          }
        })
      })
      .catch(() => {
        /* optional: parallax unavailable */
      })

    return () => {
      cancelled = true
      parallaxInstancesRef.current.forEach((p) => {
        if (p && typeof p.disable === "function") p.disable()
      })
      parallaxInstancesRef.current = []
    }
  }, [])

  return (
    <section ref={sectionRef} className="hero-banner-v1 position-relative">
      <div className="bg-one" aria-hidden />
      <div className="bg-two" aria-hidden />
      <div className="hero-img hero-img-one scene">
        <span data-depth=".5">
          <img src="/assets/images/shape/shape-2.png" className="wow fadeInLeft" alt="" />
        </span>
      </div>
      <div className="shape shape-one scene">
        <span data-depth="1">
          <img src="/assets/images/shape/shape-1.png" alt="" />
        </span>
      </div>
      <div className="shape shape-two scene">
        <span data-depth="2">
          <img src="/assets/images/shape/shape-2.png" alt="" />
        </span>
      </div>
      <div className="shape shape-three scene">
        <span data-depth="3">
          <img src="/assets/images/shape/shape-3.png" alt="" />
        </span>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-6">
            <motion.div
              className="hero-content"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="wow fadeInUp" data-wow-delay=".5s">
                A Journey Beyond Education
              </h1>
              <p align="justify" className="wow fadeInDown" data-wow-delay="1s">
                YUVA REC is a transformative platform that empowers passionate college students to
                step forward and embrace leadership role, in shaping the growth and development of our
                nation. It serves as a catalyst for fostering youth leadership, encouraging active
                participation in nation-building activities, and promoting impactful social initiatives.
              </p>
              <span className="cat-link">WE CAN! WE WILL!</span>
            </motion.div>
          </div>
          <div className="col-xl-6 col-lg-6 mt-60 hero-img-two scene">
            <span data-depth=".5">
              <img
                src="/assets/images/hero/img-10.png"
                className="wow fadeInLeft"
                alt="hero image"
              />
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(HeroSection)
