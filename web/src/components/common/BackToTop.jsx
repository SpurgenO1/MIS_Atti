import { memo, useEffect, useState } from "react"

function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (!visible) return null

  return (
    <a
      href="#"
      className="back-to-top"
      aria-label="Back to top"
      onClick={(e) => {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: "smooth" })
      }}
    >
      <i className="far fa-angle-up" />
    </a>
  )
}

export default memo(BackToTop)
