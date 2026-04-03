import { memo, useEffect, useRef } from "react"

function CuratorFeed() {
  const injected = useRef(false)
  useEffect(() => {
    if (injected.current) return
    injected.current = true
    const s = document.createElement("script")
    s.async = true
    s.charset = "UTF-8"
    s.src = "https://cdn.curator.io/published/d6f5185b-00dc-4442-b294-e30a69a6be65.js"
    document.body.appendChild(s)
  }, [])

  return (
    <>
      <div id="curator-feed-default-feed-layout" />
      <style>{`
        @media screen and (min-width: 768px) {
          #curator-feed-default-feed-layout {
            margin-top: 50px;
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
          }
        }
        @media screen and (max-width: 767px) {
          #curator-feed-default-feed-layout {
            padding-top: 50px;
            max-width: 100%;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      `}</style>
    </>
  )
}

export default memo(CuratorFeed)
