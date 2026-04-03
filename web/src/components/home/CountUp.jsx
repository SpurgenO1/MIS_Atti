import { memo, useEffect, useRef, useState } from "react"

function CountUp({ end, duration = 1200, suffix = "" }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const done = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || done.current) return
        done.current = true
        const start = performance.now()
        const step = (t) => {
          const p = Math.min((t - start) / duration, 1)
          const eased = 1 - (1 - p) ** 3
          setVal(Math.floor(eased * end))
          if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      },
      { threshold: 0.35 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [end, duration])

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  )
}

export default memo(CountUp)
