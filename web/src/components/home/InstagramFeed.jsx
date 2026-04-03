import { memo, useMemo, useState } from "react"
import { instagramPosts } from "../../data/instagramPosts.js"

function InstagramFeed() {
  const [index, setIndex] = useState(0)
  const post = useMemo(() => instagramPosts[index], [index])

  const prev = () =>
    setIndex((i) => (i - 1 + instagramPosts.length) % instagramPosts.length)
  const next = () => setIndex((i) => (i + 1) % instagramPosts.length)

  return (
    <>
      <div className="container mt-60">
        <div className="row justify-content-center">
          <div className="section-title text-center mb-10 wow fadeInUp">
            <span className="sub-title st-one">Our Instagram Feed</span>
          </div>
        </div>
      </div>
      <style>{`
        .instagram-section {
          background: white;
          padding: 0px;
          max-width: 500px;
          margin: auto;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          overflow: hidden;
          position: relative;
        }
        .instagram-header {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 10px;
          border-bottom: 1px solid #ddd;
        }
        .profile-pic {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 10px;
        }
        .username {
          font-weight: bold;
          font-size: 16px;
        }
        .instagram-image {
          width: 100%;
          height: auto;
          display: block;
          cursor: pointer;
        }
        .caption {
          padding: 15px;
          font-size: 14px;
          color: #333;
          text-align: left;
        }
        .caption strong {
          color: #000;
        }
        .nav-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          padding: 10px;
          cursor: pointer;
          font-size: 18px;
          border-radius: 0%;
        }
        .nav-button.prev {
          left: 10px;
        }
        .nav-button.next {
          right: 10px;
        }
      `}</style>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-auto">
            <div className="instagram-section">
        <div className="instagram-header">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
            className="profile-pic"
            alt="Profile"
          />
          <a
            href="https://www.instagram.com/yiciirec?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            className="username"
            target="_blank"
            rel="noreferrer"
          >
            yiciiirec
          </a>
        </div>
        <a href={post.link} target="_blank" rel="noreferrer">
          <img src={post.img} className="instagram-image" alt="Instagram Post" />
        </a>
        <div className="caption" id="postCaption">
          <p
            dangerouslySetInnerHTML={{
              __html: `<strong>@yiciiirec</strong><br/>${post.caption}`,
            }}
          />
        </div>
        <button type="button" className="nav-button prev" onClick={prev} aria-label="Previous">
          ❮
        </button>
        <button type="button" className="nav-button next" onClick={next} aria-label="Next">
          ❯
        </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(InstagramFeed)
