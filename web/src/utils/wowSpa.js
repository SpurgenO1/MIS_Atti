/** Loads WOW.js (scroll / reveal animations for `.wow` + animate.css). */

export function loadWowScript() {
  return new Promise((resolve, reject) => {
    if (typeof window !== "undefined" && (window.WOW?.default || window.WOW)) {
      resolve()
      return
    }
    const existing = document.querySelector("script[data-wow-lib]")
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true })
      existing.addEventListener("error", () => reject(new Error("WOW load failed")), { once: true })
      return
    }
    const s = document.createElement("script")
    s.src = "/assets/vendor/wow.min.js"
    s.async = true
    s.dataset.wowLib = "1"
    s.onload = () => resolve()
    s.onerror = () => reject(new Error("WOW load failed"))
    document.body.appendChild(s)
  })
}

function getWowConstructor() {
  const w = window.WOW
  if (!w) return null
  return w.default || w
}

/** One global instance with live DOM watching (MutationObserver). */
export function ensureWowInitialized() {
  return loadWowScript().then(() => {
    const WOW = getWowConstructor()
    if (!WOW || window.__yuvaWowInstance) return window.__yuvaWowInstance
    const instance = new WOW({
      boxClass: "wow",
      animateClass: "animated",
      offset: 0,
      mobile: true,
      live: true,
    })
    instance.init()
    window.__yuvaWowInstance = instance
    return instance
  })
}

/** Call after injecting HTML so new `.wow` nodes are registered (fallback + scroll refresh). */
export function refreshWowForContainer(root) {
  const inst = window.__yuvaWowInstance
  if (!inst) return
  try {
    inst.sync()
  } catch {
    /* sync only does work when MutationObserver unsupported */
  }
  if (root && typeof inst.doSync === "function") {
    try {
      inst.doSync(root)
    } catch {
      /* private API; ignore */
    }
  }
  inst.scrolled = true
  window.dispatchEvent(new Event("scroll"))
}
