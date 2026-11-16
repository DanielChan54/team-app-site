# Team App: static rebuild

A plain HTML/CSS/JS rebuild of the Webflow site daniel-team-app.webflow.io. There's no build step.

## Deploy / update on Vercel
- **First deploy:** upload this folder's contents to a GitHub repo, then go to **Vercel → Add New → Project**, import the repo and click Deploy. Set Application Preset to **Other** and leave the build settings empty.
- **Updates:** upload the changed files to the same repo (**Add file → Upload files → Commit changes**). Vercel redeploys on its own.

## Pages
- `/`: Home
- `/blog/` and `/blog/page/2/`: Blog listing, 12 posts per page like the original
- `/post/<slug>/`: all 21 blog posts

## Notes
- **Hero image:** stored in `images/hero/` at six sizes (640 to 2576px wide) in WebP and JPG, plus a 4:3 crop for phones. Each browser downloads the smallest file that's still sharp on that screen. On wider screens the photo fills the right 70% of the hero so the subject sits on the right-third line, and its left edge fades into the background behind the headline.
- **Other images** still load from your Webflow CDN. If you delete the Webflow project, download those images and point the pages at local copies.
- **Forms** show their success message but **don't send anything**, because the site has no backend. To collect sign-ups, hook them up to Formspree, Basin or a Vercel function.
