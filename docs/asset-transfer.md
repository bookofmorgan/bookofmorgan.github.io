# Visual Asset Transfer Brief

The new site ships with eight on-brand SVG diagrams I generated for the four case studies (`public/work/{moxy,elliot,cher,goji}/`). They cover the conceptual artifacts (HMW, loop, flow, stack, persona, timeline, Yggdrasil, storyboards) and they keep the terminal aesthetic consistent.

The old morganswan.com Squarespace has a deeper bench of original assets you produced: real prototype screens, hand-drawn user journeys, mood boards, Dovetail screenshots, Polaroids from the Cairo trip, the actual moodboards and logo iterations, the funeral retrospective screenshots. Those are the assets worth bringing across.

## How Squarespace images are served

Every image is on the public CDN at predictable URLs:

```
https://images.squarespace-cdn.com/content/v1/62473949378f073143a33005/<UUID>/<filename>
```

They are public, no auth, downloadable with `curl` or right-click "Save image as". Squarespace strips your name from filenames so you can rename freely.

## The right path forward

Rather than try to mirror the old portfolio image-for-image, treat the new site's visual system as the canon and pull in **only the assets that earn their place**. The SVGs I generated do the conceptual work. Bring across real artifacts that:

1. Add proof the SVG cannot (an actual prototype screenshot, a Polaroid from Cairo, a logo iteration)
2. Show your hand (sketches, whiteboard photos)
3. Show the team (Cairo trip, hackathon)

Skip the stock Unsplash photos. Skip the duplicate "user journey" jpegs that say in screenshot form what the SVG flowchart already shows in vector.

## Recommended additions per case study

### Moxy

- `moxy thumbnail.png` — hero shot of the app
- `prototype1.jpg`, `prototype 2.jpg` — actual screens (replace nothing; add to Process section as a `<Gallery>`)
- `moodboard.jpg` (the refined one, not "old moodboard") — Brand section
- `logo iterations` — Brand section, as a `<Gallery cols={3}>`
- `PXL_20220306_203516689.jpg` — looks like an in-pub user testing photo. Adds personality to Process.

### Elliot

- The granola .m4a recording you embedded — `<audio>` element under Testing round 4 (rare in portfolios, very memorable)
- Any screenshots of the demo site you built
- Bland AI dashboard or conversation-flow screenshots

### Cher

- The Marvel POP prototype screens
- Hotel-bar photos from testing
- Logo construction grid (the Venus-symbol fusion is worth showing)
- The final brand board

### Goji

- The priest's-collar funeral screenshot. This is your peak-end moment and should be a `<Quote>` or full-bleed image at the end of the case study.
- Cairo trip photos (the pharmacy CEO mapping session)
- Anonymised redactions of the Yggdrasil Miro board (the original beats my SVG)
- Animated explainer thumbnail or embed

## Two ways to actually get them across

### Option A: cherry-pick (recommended)

Per case study, open the old page, save the images you want, drop them into:

```
public/work/<slug>/<filename>.{jpg,png}
```

Reference them from the MDX with `<Canvas src="..." alt="..." />` or `<Gallery items={[...]} />`. Compress with `cwebp` or [Squoosh](https://squoosh.app/) first so they load fast.

### Option B: bulk download

If you want everything for safekeeping, this one-liner pulls every image from a case study page into a local folder:

```bash
# from project root
mkdir -p tmp/old-moxy
curl -s https://www.morganswan.com/moxy \
  | grep -oE 'https://images\.squarespace-cdn\.com/[^"]+' \
  | sort -u \
  | xargs -n 1 -I {} curl -L -O --output-dir tmp/old-moxy {}
```

Run it once per page (`/moxy`, `/elliot`, `/cher`, `/goji`). You will have every image locally, can pick the ones you want, then drop them into `public/work/<slug>/`.

## Don't add what doesn't earn its place

- The stock photo of a sad person at a desk
- "User journey" screenshots that re-explain the SVG flowchart
- Decorative gradients or thumbnails that exist only for spacing
- Sketch photos where the sketch is illegible

Keep it lean. Three strong images per case study beats fifteen weak ones.

## When you're ready

Drop the chosen files into `public/work/<slug>/` and tell me. I will:

1. Update the MDX to reference them (replacing or supplementing the SVGs)
2. Add `<Gallery>` or `<Canvas>` blocks where appropriate
3. Run image optimisation on the build pipeline if any of them are over 200KB

The current site is fully shippable as-is. Photos are upgrades, not blockers.
