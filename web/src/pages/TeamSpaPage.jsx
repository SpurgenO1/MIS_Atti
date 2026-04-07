import { memo, useLayoutEffect } from "react"
import { spaTeamIframeSrcDoc, spaPageTitles } from "../generated/spaPageBundles.js"

function injectPremiumTeamStyles(srcDoc) {
  const premiumStyles = `
    <style>
      body {
        background: linear-gradient(180deg, #f7f9fd 0%, #ffffff 44%, #f5f7fa 100%);
        color: #13203b;
      }

      a {
        color: inherit;
      }

      .page-banner {
        background: linear-gradient(135deg, #f7f8ff 0%, #edf1ff 54%, #ffffff 100%);
      }

      .page-banner:before {
        content: "";
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at top left, rgb(115 103 240 / 0.14), transparent 34%),
          radial-gradient(circle at right center, rgb(53 120 255 / 0.12), transparent 26%);
        pointer-events: none;
      }

      .page-banner .page-title h1 {
        color: #10204a;
        letter-spacing: -0.03em;
      }

      .breadcrumbs-link li,
      .breadcrumbs-link li a {
        color: #5b6480;
      }

      .section-title h2,
      .section-title .title,
      .team-area .team-item .text h4,
      .team-area .team-item .text p,
      .team-area-v3 .team-item .text h4,
      .team-area-v3 .team-item .text p,
      .portfolio-area .team-item .text h4,
      .portfolio-area .team-item .text p {
        color: #13203b;
      }

      .section-title .sub-title.st-one {
        position: relative;
        overflow: hidden;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 13rem;
        min-height: 3.15rem;
        padding: 0.9rem 2.15rem;
        margin: 0 auto 1rem;
        border-radius: 9999px;
        border: 1px solid #c8bdf5;
        color: #2d33a8;
        background: linear-gradient(135deg, rgb(245 243 255 / 0.96) 0%, rgb(228 223 255 / 0.92) 100%);
        box-shadow: 0 12px 24px -18px rgb(80 72 170 / 0.38), inset 0 1px 0 rgb(255 255 255 / 0.88);
      }

      .section-title .sub-title.st-one:after {
        content: none;
      }

      .team-area,
      .team-area-v3,
      .portfolio-area,
      .testimonial-area {
        position: relative;
        isolation: isolate;
      }

      .team-area::before,
      .team-area-v3::before,
      .portfolio-area::before,
      .testimonial-area::before {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, rgb(255 255 255 / 0.8), rgb(243 246 255 / 0.82));
        z-index: -1;
      }

      .team-area-v2 .team-item {
        border-radius: 1.05rem;
        overflow: hidden;
        border: 1px solid rgba(191, 205, 224, 0.72);
        background: linear-gradient(180deg, rgb(255 255 255 / 0.98) 0%, rgb(246 249 255 / 0.98) 100%);
        box-shadow: 0 16px 38px -28px rgb(23 39 67 / 0.45);
        transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
      }

      .team-area-v2 .team-item:hover {
        transform: translateY(-8px);
        border-color: rgba(125, 109, 235, 0.42);
        box-shadow: 0 26px 52px -30px rgb(42 54 113 / 0.5);
      }

      .team-area-v2 .team-item .img-holder img {
        width: 100%;
        display: block;
        transition: transform 0.45s ease;
      }

      .team-area-v2 .team-item:hover .img-holder img {
        transform: scale(1.03);
      }

      .team-area-v2 .team-item .text h4,
      .team-area-v2 .team-item .text p {
        color: #13203b;
      }

      .team-area-v2 .portfolio-style-two .portfolio-hover,
      .portfolio-area .portfolio-style-one .portfolio-hover {
        border-radius: 1rem;
      }

      .team-area-v2 .portfolio-style-two .portfolio-hover .hover-content,
      .portfolio-area .portfolio-style-one .portfolio-hover .hover-content {
        border-radius: 1rem;
        background: linear-gradient(180deg, rgb(18 31 59 / 0.1), rgb(18 31 59 / 0.78));
      }

      .footer-area.page-footer {
        background: linear-gradient(180deg, #eef2ff 0%, #ffffff 100%);
      }

      .footer-area .widget,
      .footer-area .copyright-text {
        color: #13203b;
      }

      .footer-area .widget-title {
        color: #2d33a8;
      }

      .footer-area .widget-nav a,
      .footer-area .social-nav a {
        color: #13203b;
      }
    </style>
  `

  return srcDoc.includes("</head>") ? srcDoc.replace("</head>", `${premiumStyles}</head>`) : `${premiumStyles}${srcDoc}`
}

function TeamSpaPage() {
  const premiumSrcDoc = injectPremiumTeamStyles(spaTeamIframeSrcDoc)

  useLayoutEffect(() => {
    document.title = spaPageTitles.team
  }, [])

  useLayoutEffect(() => {
    const html = document.documentElement
    const body = document.body
    const root = document.getElementById("root")
    const prevHtmlOverflow = html.style.overflow
    const prevBodyOverflow = body.style.overflow
    const prevBodyMargin = body.style.margin
    const prevRootOverflow = root?.style.overflow ?? ""
    const prevRootMinH = root?.style.minHeight ?? ""
    html.style.overflow = "hidden"
    body.style.overflow = "hidden"
    body.style.margin = "0"
    if (root) {
      root.style.overflow = "hidden"
      root.style.minHeight = "100%"
    }
    return () => {
      html.style.overflow = prevHtmlOverflow
      body.style.overflow = prevBodyOverflow
      body.style.margin = prevBodyMargin
      if (root) {
        root.style.overflow = prevRootOverflow
        root.style.minHeight = prevRootMinH
      }
    }
  }, [])

  return (
    <iframe
      title={spaPageTitles.team}
      className="team-full-page-iframe fixed inset-0 z-[1] h-[100dvh] w-full border-0"
      srcDoc={premiumSrcDoc}
      sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
    />
  )
}

export default memo(TeamSpaPage)
