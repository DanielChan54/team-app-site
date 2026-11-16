# Team App: static rebuild

A plain HTML/CSS/JS rebuild of the Webflow site daniel-team-app.webflow.io. There's no build step.

## Deploy to Vercel (pick one)

**Option A: Vercel CLI (about a minute)**
1. Unzip this folder and open a terminal inside it.
2. Run `npx vercel` and log in when it asks. Accept the defaults. When it asks about a framework, choose **Other**, and leave the build command empty.
3. Run `npx vercel --prod` to get your production link.

**Option B: GitHub**
Push this folder to a new GitHub repo. Then in Vercel go to **Add New → Project**, import the repo and click Deploy. Leave Framework set to **Other** and the build command empty.

## Pages
- `/`: Home
- `/blog/` and `/blog/page/2/`: Blog listing, 12 posts per page like the original
- `/post/<slug>/`: all 21 blog posts

## Notes
- **Hero image:** a free Pexels photo served at the right resolution for each screen size. The hero uses a real `<img srcset>` instead of a CSS background, so phones and retina screens get a sharp image. To use a different Pexels photo, change `HERO_ID` in the build script, or replace the photo ID `8037019` in `index.html` (find and replace).
- **Other images** still load from your Webflow CDN. If you delete the Webflow project, download those images and point the pages at local copies.
- **Forms** (hero email, Get Early Access popup, newsletter) show their success message but **don't send anything**, because the site has no backend. To collect sign-ins, hook them up to Formspree, Basin or a Vercel function.
