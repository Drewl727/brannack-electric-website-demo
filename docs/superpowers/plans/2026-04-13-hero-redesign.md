# Hero Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the flat navy + SVG circuit pattern hero with a professional photo-background, left-aligned hero matching the design approved in `docs/superpowers/specs/2026-04-13-hero-redesign-design.md`.

**Architecture:** Two files change — `styles.css` (hero CSS block) and `index.html` (hero section HTML). No new files. No JS changes. The trust bar, nav, and all other sections are untouched.

**Tech Stack:** Static HTML/CSS. No build step. Open `index.html` directly in a browser to verify.

---

## File Map

| File | What changes |
|---|---|
| `styles.css` lines 361–419 | `.hero`, `::before`, `::after`, `.hero-content`, centering overrides, `.hero-badge` |
| `styles.css` after line 419 | Add `.trust-badges` and `.badge` rules |
| `index.html` lines 181–190 | Replace `.hero-badge` element + restructure `h1` + add `.trust-badges` |

---

## Task 1: Update `.hero` background and pseudo-elements in `styles.css`

**Files:**
- Modify: `styles.css` (lines 361–390)

- [ ] **Step 1: Replace `.hero` background**

  In `styles.css`, find the `.hero` rule (line 361) and replace the `background: var(--navy);` property with the photo + gradient shorthand:

  ```css
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    background:
      linear-gradient(105deg,
        rgba(10,22,40,.95) 0%,
        rgba(10,22,40,.82) 45%,
        rgba(10,22,40,.45) 75%,
        rgba(10,22,40,.3) 100%),
      url('https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1400&q=80') center/cover no-repeat;
    overflow: hidden;
    padding-top: var(--nav-h);
  }
  ```

- [ ] **Step 2: Remove `.hero::before` entirely**

  Delete the entire `.hero::before` block (lines 371–379 in current file):

  ```css
  /* DELETE this entire block: */
  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,...");
    background-repeat: repeat;
    background-size: 80px 80px;
    pointer-events: none;
  }
  ```

- [ ] **Step 3: Replace `.hero::after` with bottom vignette**

  Replace the radial blob `::after` with a bottom vignette:

  ```css
  .hero::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 140px;
    background: linear-gradient(to top, rgba(10,22,40,.55), transparent);
    pointer-events: none;
  }
  ```

- [ ] **Step 4: Open `index.html` in a browser and verify**

  The hero should now show the Unsplash electrician photo with a dark left-heavy overlay. The circuit grid pattern should be gone. Content will still be centered — that's fixed in Task 2.

---

## Task 2: Left-align hero content and swap badge styles in `styles.css`

**Files:**
- Modify: `styles.css` (lines 392–419)

- [ ] **Step 1: Update `.hero-content` to left-aligned**

  Replace the `.hero-content` rule:

  ```css
  .hero-content {
    position: relative;
    z-index: 2;
    max-width: 620px;
    margin: 0;
    padding: 72px 0;
  }
  ```

  *(Removed: `text-align: center`, changed `max-width` 800→620, changed `margin: 0 auto` → `margin: 0`)*

- [ ] **Step 2: Remove the three centering override rules**

  Delete these three lines (currently line 401–403):

  ```css
  /* DELETE these three lines: */
  .hero-sub { margin-left: auto; margin-right: auto; }
  .hero-ctas { justify-content: center; }
  .hero-stats { justify-content: center; }
  ```

- [ ] **Step 3: Remove `.hero-badge` and `.hero-badge i` rules**

  Delete the entire `.hero-badge` block (lines 405–419):

  ```css
  /* DELETE this entire block: */
  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(245,197,24,.1);
    border: 1px solid rgba(245,197,24,.28);
    color: var(--yellow);
    padding: 8px 16px;
    border-radius: 24px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: .04em;
    margin-bottom: 28px;
  }
  .hero-badge i { width: 14px; height: 14px; stroke: var(--yellow); }
  ```

- [ ] **Step 4: Add `.trust-badges` and `.badge` rules in place of the deleted block**

  Insert these new rules where the `.hero-badge` block was:

  ```css
  .trust-badges {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 22px;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: rgba(255,255,255,.1);
    border: 1px solid rgba(255,255,255,.2);
    backdrop-filter: blur(8px);
    padding: 6px 13px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 700;
    color: var(--white);
    letter-spacing: .05em;
    text-transform: uppercase;
  }

  .badge-check {
    color: var(--yellow);
  }
  ```

- [ ] **Step 5: Verify in browser**

  Hero content should now be left-aligned. The yellow centered badge should be gone. The photo background and gradient are still visible from Task 1.

- [ ] **Step 6: Commit CSS changes**

  ```bash
  git add styles.css
  git commit -m "style: overhaul hero — photo bg, left-align, swap badge for trust pills

  Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
  ```

---

## Task 3: Update hero HTML in `index.html`

**Files:**
- Modify: `index.html` (lines 181–190)

- [ ] **Step 1: Replace `.hero-badge` element with `.trust-badges`**

  Find this block in `index.html` (lines 181–184):

  ```html
  <div class="hero-badge">
    <i data-lucide="zap" aria-hidden="true"></i>
    Family-Owned Since 1980 &nbsp;·&nbsp; Bloomfield, CT
  </div>
  ```

  Replace it with:

  ```html
  <div class="trust-badges">
    <div class="badge"><span class="badge-check">✓</span> Licensed &amp; Insured</div>
    <div class="badge"><span class="badge-check">✓</span> 45+ Years Experience</div>
    <div class="badge"><span class="badge-check">✓</span> 24/7 Emergency Service</div>
  </div>
  ```

- [ ] **Step 2: Restructure the `h1` headline**

  Find the current `h1` (lines 186–190):

  ```html
  <h1 class="hero-headline">
    <span class="accent">Brannack Electric Inc.</span><br>
    Hartford County's<br>
    Trusted Electrical Contractor
  </h1>
  ```

  Replace it with:

  ```html
  <h1 class="hero-headline">
    Hartford County's<br>
    <span class="accent">Trusted Electrical</span><br>
    Contractor
  </h1>
  ```

- [ ] **Step 3: Open `index.html` in a browser and do a full visual check**

  Verify all of the following:
  - Photo background with dark gradient overlay is visible ✓
  - Circuit pattern is gone ✓
  - Three white pill badges appear above the headline ✓
  - Headline reads "Hartford County's / Trusted Electrical / Contractor" (yellow on "Trusted Electrical") ✓
  - Content is left-aligned ✓
  - Stats row (45+, 5.0, 24/7, 424+) is visible and left-aligned ✓
  - CTA buttons are present and left-aligned ✓
  - Trust bar below hero is unchanged ✓
  - Nav is unchanged ✓
  - No layout breaks on mobile (resize browser to ~375px width) ✓

- [ ] **Step 4: Commit HTML changes**

  ```bash
  git add index.html
  git commit -m "feat: hero section overhaul — photo bg, trust badges, restructured headline

  Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
  ```
