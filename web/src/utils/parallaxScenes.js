/** Loads legacy Parallax.js (mouse/cursor tilt on `.scene` layers). */
export function loadParallaxScript() {
  return new Promise((resolve, reject) => {
    if (typeof window !== "undefined" && window.Parallax) {
      resolve()
      return
    }
    const existing = document.querySelector("script[data-parallax-lib]")
    if (existing) {
      if (window.Parallax) {
        resolve()
        return
      }
      existing.addEventListener("load", () => resolve(), { once: true })
      existing.addEventListener("error", () => reject(new Error("Parallax script failed")), {
        once: true,
      })
      return
    }
    const s = document.createElement("script")
    s.src = "/assets/vendor/parallax.min.js"
    s.async = true
    s.dataset.parallaxLib = "1"
    s.onload = () => resolve()
    s.onerror = () => reject(new Error("Parallax script failed"))
    document.body.appendChild(s)
  })
}

/**
 * @param {HTMLElement | null} root
 * @returns {Promise<() => void>} cleanup
 */
export async function initParallaxScenesInRoot(root) {
  if (!root) return () => {}
  await loadParallaxScript()
  if (!window.Parallax) return () => {}
  const instances = []
  root.querySelectorAll(".scene").forEach((el) => {
    try {
      instances.push(new window.Parallax(el))
    } catch {
      /* ignore */
    }
  })
  return () => {
    instances.forEach((p) => {
      if (p && typeof p.disable === "function") p.disable()
    })
  }
}
