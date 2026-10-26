---
version: 1.0.0
name: gopi-photography-design-system
description: >-
  Official design system and visual specification for Gopi Photography. A photography-first,
  editorial luxury aesthetic blending warm charcoal obsidian surfaces with radiant sunset amber embers
  and classical serif typography. Designed to highlight authentic human emotions and natural melanin
  skin tones across South Indian and Tamil wedding celebrations.

colors:
  canvas-deep: "#11100E"
  canvas-surface: "#171717"
  surface-card: "#1E1D1A"
  surface-card-hover: "#262420"
  surface-glass: "rgba(23, 23, 23, 0.85)"
  
  ink-primary: "#FFFFFF"
  ink-secondary: "rgba(255, 255, 255, 0.78)"
  ink-muted: "rgba(255, 255, 255, 0.45)"
  ink-subtle: "rgba(255, 255, 255, 0.24)"
  
  accent-ember: "#F0803C"
  accent-ember-dark: "#E85A1A"
  accent-gold: "#D4AF37"
  accent-glow: "rgba(240, 128, 60, 0.28)"
  
  border-hairline: "rgba(255, 255, 255, 0.08)"
  border-subtle: "rgba(255, 255, 255, 0.14)"
  border-accent: "rgba(240, 128, 60, 0.35)"
  
  interactive-whatsapp: "#25D366"
  interactive-whatsapp-hover: "#1EBE5D"

typography:
  heading-display:
    fontFamily: "'Cormorant Garamond', Garamond, Georgia, serif"
    weights: [400, 500, 600, 700]
    letterSpacing: "-0.015em"
    style: "editorial, classical, romantic"
  
  body-text:
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
    weights: [300, 400, 500, 600, 700]
    lineHeight: 1.65
    letterSpacing: "0.01em"
    style: "clean, neutral, high-legibility"

layout-and-grid:
  max-width-container: "1280px"
  section-padding-desktop: "110px 32px"
  section-padding-mobile: "70px 20px"
  grid-gap: "28px"
  breakpoints:
    mobile: "480px"
    tablet: "820px"
    desktop: "1280px"

radii-and-geometry:
  buttons: "8px"
  cards: "14px"
  images: "12px"
  badges-and-pills: "999px"
  modals: "16px"

motion-and-interactions:
  transition-default: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
  scroll-reveal: "fade-up with IntersectionObserver, 60px rootMargin"
  hover-elevation: "translateY(-4px) with subtle ambient ember glow"
  user-drag-protection: "none (client photo copyright protection)"
---

# Gopi Photography — Design Philosophy

1. **Photographic Reverence**: Every layout choice serves the photography. UI chrome, borders, and controls recede into deep obsidian warmth so the couple's expressions, silk saree textures, and gold jewelry shine with cinematic clarity.
2. **Honest Emotion over Artificial Trends**: Never use neon artificial palettes, cold sterile blues, or generic startup gradients. Warm ember accents (`#F0803C`) honor South Indian culture, sacred temple flames, and golden-hour sunset lighting.
3. **Tactile & Editorial Rhythm**: Asymmetrical masonry grids, editorial pull quotes, before/after comparison sliders, and handcrafted album spread previews provide tactile dignity that matches a luxury heirloom physical album.
