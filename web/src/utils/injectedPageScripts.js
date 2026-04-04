function loadCssOnce(href) {
  if (document.querySelector(`link[href="${href}"]`)) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const l = document.createElement("link")
    l.rel = "stylesheet"
    l.href = href
    l.onload = () => resolve()
    l.onerror = () => reject(new Error(href))
    document.head.appendChild(l)
  })
}

function loadScriptOnce(src) {
  const existing = document.querySelector(`script[src="${src}"]`)
  if (existing) {
    return existing.dataset.loaded === "1"
      ? Promise.resolve()
      : new Promise((resolve, reject) => {
          existing.addEventListener("load", () => resolve(), { once: true })
          existing.addEventListener("error", () => reject(new Error(src)), { once: true })
        })
  }
  return new Promise((resolve, reject) => {
    const s = document.createElement("script")
    s.src = src
    s.async = true
    s.onload = () => {
      s.dataset.loaded = "1"
      resolve()
    }
    s.onerror = () => reject(new Error(src))
    document.body.appendChild(s)
  })
}

/** @returns {() => void} cleanup */
export function initGalleryLightbox(root) {
  let destroyed = false
  ;(async () => {
    try {
      await loadCssOnce("/assets/vendor/magnific-popup/dist/magnific-popup.css")
      await loadScriptOnce("/assets/vendor/jquery-3.6.0.min.js")
      await loadScriptOnce("/assets/vendor/magnific-popup/dist/jquery.magnific-popup.min.js")
      if (destroyed || !root) return
      const $ = window.jQuery
      if (!$ || !$.fn.magnificPopup) return
      $(root).find(".img-popup").magnificPopup({
        type: "image",
        gallery: { enabled: true },
      })
    } catch {
      /* optional */
    }
  })()
  return () => {
    destroyed = true
  }
}

/** @returns {() => void} cleanup */
export function initAccoladesSlider(root) {
  let destroyed = false
  ;(async () => {
    try {
      await loadCssOnce("/assets/vendor/slick/slick.css")
      await loadScriptOnce("/assets/vendor/jquery-3.6.0.min.js")
      await loadScriptOnce("/assets/vendor/slick/slick.min.js")
      if (destroyed || !root) return
      const $ = window.jQuery
      if (!$ || !$.fn.slick) return
      const el = $(root).find(".testimonial-slider-three")
      if (!el.length) return
      el.slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 1500,
        autoplay: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        prevArrow: '<div class="prev"><i class="far fa-angle-left"></i></div>',
        nextArrow: '<div class="next"><i class="far fa-angle-right"></i></div>',
        responsive: [{ breakpoint: 991, settings: { slidesToShow: 1 } }],
      })
    } catch {
      /* optional */
    }
  })()
  return () => {
    destroyed = true
  }
}
