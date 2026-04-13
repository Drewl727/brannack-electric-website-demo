# Brannack Electric — Hero Section Redesign

**Date:** 2026-04-13  
**Scope:** `index.html` hero section + related CSS in `styles.css`  
**Goal:** Replace the AI-generated look with a professional, photo-driven hero similar to [Premier Electrical Services](https://www.premierelectricalservicesllc.com/)

---

## Problem

The current hero has three traits that make it look "vibe-coded":
1. **SVG circuit pattern background** (`hero::before`) — a dead giveaway of AI-generated sites
2. **Centered layout** — generic, not grounded
3. **Flat navy background with no photo** — impersonal, looks like a template

---

## Design Direction

**Option A — Photo Background Hero** (approved)

A real electrician stock photo (Unsplash) sits behind a left-heavy dark gradient overlay. Content is left-aligned. Three trust badges appear above the headline. Stats row stays but is repositioned left.

### Reference
- [Premier Electrical Services LLC](https://www.premierelectricalservicesllc.com/) — photo background, left-aligned content, prominent trust signals, professional nav

---

## Changes to `index.html`

### Hero section structure

**Remove:**
- `hero::before` SVG circuit pattern overlay (inline SVG data URI in CSS)
- `hero::after` radial gradient blob
- `text-align: center` on `.hero-content`
- `.hero-badge` (yellow pill "Family-Owned Since 1980 · Bloomfield, CT")
- `<span class="accent">Brannack Electric Inc.</span><br>` from the headline (redundant with nav logo)

**Add:**
- `.trust-badges` row above the headline with three pill badges:
  - ✓ Licensed & Insured
  - ✓ 45+ Years Experience
  - ✓ 24/7 Emergency Service
- Bottom vignette `::after` on `.hero` (subtle gradient at bottom edge, improves photo readability)

**Modify:**
- Hero headline to: `Hartford County's <span class="accent">Trusted Electrical</span> Contractor`

### Photo background

Use a free Unsplash electrician photo. Best candidate:
- `https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1400&q=80`

Gradient overlay (applied in CSS as `background` shorthand):
```css
background:
  linear-gradient(105deg,
    rgba(10,22,40,.95) 0%,
    rgba(10,22,40,.82) 45%,
    rgba(10,22,40,.45) 75%,
    rgba(10,22,40,.3) 100%),
  url('https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1400&q=80') center/cover no-repeat;
```

---

## Changes to `styles.css`

### `.hero` block

| Property | Before | After |
|---|---|---|
| `background` | `var(--navy)` | Photo + gradient overlay (see above) |
| `::before` pseudo | SVG circuit pattern tile | **Removed** |
| `::after` pseudo | Radial yellow glow blob | Bottom vignette gradient |

### `.hero-content`

| Property | Before | After |
|---|---|---|
| `text-align` | `center` (set via sibling rules) | `left` (default, remove centering overrides) |
| `max-width` | `800px` | `620px` |
| `margin` | `0 auto` | `0` (left-aligned) |

Remove centering overrides:
```css
/* Remove these: */
.hero-sub { margin-left: auto; margin-right: auto; }
.hero-ctas { justify-content: center; }
.hero-stats { justify-content: center; }
```

### `.hero-badge`

**Remove entirely** — replaced by `.trust-badges`.

### New `.trust-badges` and `.badge` rules

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
  font-size: 11px;
}
```

---

## Files Changed

| File | Change |
|---|---|
| `index.html` | Hero section HTML — remove badge, restructure headline, add trust-badges |
| `styles.css` | Hero CSS — remove circuit pattern, add photo bg, left-align, add badge styles |

**No other pages are touched.** The trust bar, nav, and all sections below the hero are unchanged.

---

## Out of Scope

- Nav redesign (nav stays as-is)
- Other pages (services, about, reviews, contact, service-area)
- Copy changes beyond the headline restructure
- Mobile layout changes (existing responsive rules cover left-aligned well enough; minor tweaks acceptable if needed)
