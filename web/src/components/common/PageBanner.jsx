import { memo } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

function PageBanner({ title, crumbs = [] }) {
  return (
    <motion.section
      className="page-banner bg_cover relative z-[1] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
    >
      <div className="shape shape-one scene pointer-events-none">
        <span>
          <img src="/assets/images/shape/shape-1.png" alt="" />
        </span>
      </div>
      <div className="shape shape-two scene pointer-events-none">
        <span>
          <img src="/assets/images/shape/shape-2.png" alt="" />
        </span>
      </div>
      <div className="shape shape-three scene pointer-events-none">
        <span>
          <img src="/assets/images/shape/shape-3.png" alt="" />
        </span>
      </div>
      <div className="shape shape-four scene pointer-events-none">
        <span>
          <img src="/assets/images/shape/shape-2.png" alt="" />
        </span>
      </div>
      <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="page-title text-center">
          <h1 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">{title}</h1>
          <ul className="breadcrumbs-link mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-muted">
            <li>
              <Link to="/" className="transition-colors hover:text-brand-600">
                Home
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className={c.href ? "" : "active text-brand-600"}>
                {c.href ? (
                  <>
                    <span className="mx-1 text-slate-300">/</span>
                    <Link to={c.href} className="transition-colors hover:text-brand-600">
                      {c.label}
                    </Link>
                  </>
                ) : (
                  <>
                    <span className="mx-1 text-slate-300">/</span>
                    {c.label}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.section>
  )
}

export default memo(PageBanner)
