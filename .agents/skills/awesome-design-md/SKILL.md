---
name: awesome-design-md
description: Curated collection and specification for DESIGN.md design system contracts. Use when generating, evaluating, adapting, or referencing production design systems (Apple, Runway, Linear, Stripe, Framer, Vercel, Supabase, etc.) or enforcing visual tokens, typography hierarchies, and layout rules for AI coding agents.
---

# Awesome DESIGN.md

DESIGN.md is a plain-text design system document that AI agents read to generate consistent, brand-aligned, high-craft UI without requiring Figma exports or complex JSON schemas.

## Overview

A `DESIGN.md` in the project root acts as the source of truth for:
1. **Art Direction & Philosophy**: The guiding aesthetic and emotional tone.
2. **Color Palette & Contrast**: Primary, canvas, surface, borders, accents, and accessibility standards.
3. **Typography Scale**: Display, heading, body, and caption font stacks with line-heights and letter-spacing.
4. **Layout & Grid Rhythms**: Container widths, section padding, responsive breakpoints, and gap scales.
5. **Component Rules**: Micro-interactions, radius standards, shadows, button states, and form controls.

## Included Design System Reference Library

This skill bundles analyzed `DESIGN.md` specifications from 84 world-class developer, luxury, and consumer brands in `./design-md/`:
- **Photography & Luxury Visuals**: `apple`, `ferrari`, `lamborghini`, `bugatti`, `dji`, `runwayml`
- **Minimalist & Editorial**: `linear.app`, `framer`, `resend`, `superhuman`, `wired`, `theverge`
- **Modern Tech & Cloud**: `stripe`, `vercel`, `supabase`, `raycast`, `notion`, `figma`

## How To Use

1. **Review Project DESIGN.md**: Always inspect `DESIGN.md` in the project root before making UI changes to maintain visual consistency.
2. **Consult Reference Specs**: When designing a new section, component, or theme variant, reference similar brand specs from `./design-md/<brand>/DESIGN.md`.
3. **Maintain Visual Integrity**: Never introduce arbitrary colors, fonts, or shadows that deviate from the active `DESIGN.md`.
