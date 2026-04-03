/** Map legacy HTML filenames (keys in generated legacy content) to in-app routes */
export const htmlFileToRoute = {
  "index.html": "/",
  "about.html": "/about",
  "team.html": "/team",
  "Gallery.html": "/gallery",
  "Initiatives.html": "/initiatives",
  "Verticals.html": "/verticals",
  "Achievements and recognitions.html": "/accolades",
  "reg.html": "/registrations",
  "contact.html": "/contact",
  "podcast.html": "/podcast",
  "AnnualReport23.html": "/annual-report",
  "YI Health report.html": "/yi-health",
}

export const routeToHtmlFile = Object.fromEntries(
  Object.entries(htmlFileToRoute)
    .filter(([, r]) => r !== "/")
    .map(([f, r]) => [r, f]),
)
