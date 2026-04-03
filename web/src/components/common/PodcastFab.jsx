import { memo, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function PodcastFab() {
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => {
      setVisible(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      id="back-to-top"
      className="wow tada"
      role="button"
      tabIndex={0}
      style={{ display: visible ? "block" : "none" }}
      onClick={() => navigate("/podcast")}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          navigate("/podcast")
        }
      }}
    >
      <img src="/assets/images/podcast/spotify.svg" alt="" />
      Check out our Podcast
    </div>
  )
}

export default memo(PodcastFab)
