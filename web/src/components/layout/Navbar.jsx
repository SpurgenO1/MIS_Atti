import { memo, useCallback, useEffect, useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"

const navCls = ({ isActive }) => `nav-link${isActive ? " active" : ""}`

function Navbar({ onOpenPanel }) {
  const { pathname } = useLocation()
  const heroTransparentHeader = pathname === "/"
  const [menuOn, setMenuOn] = useState(false)
  const [whoOpen, setWhoOpen] = useState(false)
  const [sticky, setSticky] = useState(false)
  const [showOnScrollUp, setShowOnScrollUp] = useState(true)
  const [pointerY, setPointerY] = useState(Number.POSITIVE_INFINITY)

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const currentY = window.scrollY
      const isSticky = currentY >= 100
      setSticky(isSticky)

      if (!heroTransparentHeader && isSticky) {
        setShowOnScrollUp(currentY < lastY || pointerY <= 24)
      } else {
        setShowOnScrollUp(true)
      }

      lastY = currentY
    }

    const onPointerMove = (event) => {
      if (heroTransparentHeader) {
        return
      }

      setPointerY(event.clientY)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("mousemove", onPointerMove, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("mousemove", onPointerMove)
    }
  }, [heroTransparentHeader])

  const closeMenu = useCallback(() => {
    setMenuOn(false)
    setWhoOpen(false)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOn ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOn])

  return (
    <header
      className={
        heroTransparentHeader ? "theme-header transparent-header" : "theme-header shell-header-solid"
      }
    >
      <div
        className={`header-navigation navigation-style-v1${sticky ? " sticky" : ""}${
          !heroTransparentHeader && sticky && !(showOnScrollUp || pointerY <= 24) ? " scroll-hide" : ""
        }`}
      >
        <button
          type="button"
          className={`nav-overlay ${menuOn ? "active" : ""}`}
          aria-label="Close menu"
          onClick={closeMenu}
        />
        <div className="container-fluid">
          <div className="primary-menu">
            <div className="site-branding">
              <Link to="/" className="brand-logo">
                <img src="/assets/images/logo/logo-1.png" alt="Site Logo" />
              </Link>
            </div>

            <div className={`nav-menu ${menuOn ? "menu-on" : ""}`}>
              <button type="button" className="navbar-close" onClick={closeMenu} aria-label="Close">
                <i className="far fa-times" />
              </button>
              <nav className="main-menu">
                <ul>
                  <li>
                    <NavLink to="/" className={navCls} end onClick={closeMenu}>
                      Home
                    </NavLink>
                  </li>
                  <li className={`menu-item has-children${whoOpen ? " active" : ""}`}>
                    <a
                      href="#who-we-are"
                      className="nav-link"
                      onClick={(e) => {
                        if (window.matchMedia("(max-width: 1199px)").matches) {
                          e.preventDefault()
                          setWhoOpen((v) => !v)
                        }
                      }}
                      aria-expanded={whoOpen}
                    >
                      Who We Are
                    </a>
                    <ul className="sub-menu">
                      <li>
                        <NavLink to="/about" className={navCls} onClick={closeMenu}>
                          About Us
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/team" className={navCls} onClick={closeMenu}>
                          Our Team
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/verticals" className={navCls} onClick={closeMenu}>
                          Verticals
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item">
                    <NavLink to="/gallery" className={navCls} onClick={closeMenu}>
                      Gallery
                    </NavLink>
                  </li>
                  <li className="menu-item">
                    <NavLink to="/initiatives" className={navCls} onClick={closeMenu}>
                      Initiatives
                    </NavLink>
                  </li>
                  <li className="menu-item">
                    <NavLink to="/accolades" className={navCls} onClick={closeMenu}>
                      Accolades
                    </NavLink>
                  </li>
                  <li className="menu-item">
                    <NavLink to="/registrations" className={navCls} onClick={closeMenu}>
                      Registrations
                    </NavLink>
                  </li>
                  <li className="menu-item">
                    <NavLink to="/contact" className={navCls} onClick={closeMenu}>
                      Contact
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="header-right-nav">
              <ul>
                <li className="bar-item">
                  <button type="button" onClick={onOpenPanel} aria-label="Open info panel">
                    <img src="/assets/images/dot.png" alt="dot" />
                  </button>
                </li>
                <li className="navbar-toggle-btn">
                  <button
                    type="button"
                    className={`navbar-toggler ${menuOn ? "active" : ""}`}
                    onClick={() => setMenuOn((v) => !v)}
                    aria-expanded={menuOn}
                    aria-label="Toggle menu"
                  >
                    <span />
                    <span />
                    <span />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default memo(Navbar)
