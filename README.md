# Shakil Ur Rehman — Portfolio (redesign)

A redesigned, highly interactive version of the portfolio. Same content, new design system and motion layer. The original project lives untouched in `../shakil-ur-rehman-portfolio`.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

Fonts are self-hosted through Fontsource, so the build does not need to reach Google Fonts.

## Design system

**Color** — a cool mist / deep ink base, plus four accent colors with one meaning each, used consistently across the site:

| Token | Light | Dark | Meaning |
| --- | --- | --- | --- |
| `cobalt` | `#3B5BFD` | `#788EFF` | Backend & systems |
| `marigold` | `#F5A524` | `#FFBE45` | Front end & motion |
| `orchid` | `#8C52F0` | `#B68DFF` | Generative AI |
| `mint` | `#0AA07A` | `#2FD9A9` | Real-time |

Tokens are RGB triplets in `src/app/globals.css`, exposed to Tailwind in `tailwind.config.js` (`bg-cobalt/20`, `text-ink`, `border-line/10`, …).

**Type** — *Anybody* (variable: width 50–150, weight 100–900) for display, *Instrument Sans* for text, *JetBrains Mono* only for code and terminal output.

## Sections

Hero (stretchy name + clickable stack map) → skills marquee → featured projects (RepoLens, TaskFlow, CrashLedger with load-test metrics) → open source PRs → experience, education, skills, certifications, achievements → contact. `/projects` lists every project with filters and search.

Content comes from the résumé (`src/data/resume.js`, `src/data/projects.js`). The PDF is served from `public/Shakil_Ur_Rehman_Resume.pdf`; replace that file to update the "Open PDF" and "Download" buttons.

## Motion

- Name letters swell slightly near the cursor; stack map sends requests and logs latency.
- Metric counters animate into view, the TaskFlow board shuffles tasks, the experience timeline draws on scroll.
- Smooth scrolling (Lenis), circular theme switch, hide-on-scroll nav, slide-in case studies.
- `prefers-reduced-motion` turns the animation off.

## Structure

```
src/
  app/            layout, home page, /projects, 404, globals.css
  components/     AppShell (theme, sound, smooth scroll, dialogs), TopNav, HeroSection,
                  KineticName, SystemGraph, StackMarquee, ProjectsSection, ProjectVisual,
                  OpenSource, Experience, Footer, Dialog, CaseStudyModal, ResumeModal,
                  ScrollProgress, Magnetic, Icons
  data/resume.js     résumé content: summary, open source, experience, skills, certifications
  data/projects.js   projects, case studies and contact links
  lib/sound.js       Web Audio UI sounds
```

## Contact

- Email: [rehmanshakil21@gmail.com](mailto:rehmanshakil21@gmail.com)
- LinkedIn: [linkedin.com/in/shakilurrehman21](https://linkedin.com/in/shakilurrehman21)
- GitHub: [github.com/ShakilUrRehman21](https://github.com/ShakilUrRehman21)
- Phone: +91 8750250416
