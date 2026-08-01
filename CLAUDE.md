# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The marketing/landing site for **GRØD**, an on-device meeting-intelligence app for the Mac (records both sides of calls locally, writes briefings, learns voices, ⌘K cross-meeting search — no cloud, no account, no bot joining the call). The app itself lives in a separate repo (`../gr-d/GROD`); this repo is only the public site — per the README, "where grod will live outside of gaspery."

## Current state & commands

The entire site is one hand-written static file, `index.html` — all CSS, JS, and the SVG favicon are inlined. There is no build system, package manager, linter, or test suite.

- Preview: open `index.html` in a browser, or serve statically (`python3 -m http.server`).

A port to Astro is planned (see the HTML comment at the top of `index.html`); until then, edits go directly into the one file.

## Design constraints (don't drift)

- **The palette is ported verbatim from the app**: the Riso light theme in `GROD/Sources/DesignSystem/Themes.swift` plus the teal pins from `Toppings.swift` (both in the `gr-d` repo). Don't invent or adjust colors here — sync from the app. All colors are CSS custom properties in `:root`.
- Type pairing matches the app: Merriweather (display serif) + Inter (body). Google Fonts is a draft-only convenience; self-host both fonts when the Astro port happens.
- The visual language is risograph print — halftone dot fields, misregistered ghost headlines, overprint bars, registration crosshairs, rubber stamps — built on `mix-blend-mode: multiply` over the paper background. New sections should reuse these existing treatments rather than introduce new ones.
- Motion (staggered `.reveal` transitions, `data-para` parallax, `data-drift` misregistration) is dependency-free vanilla JS and must keep honoring `prefers-reduced-motion`: with motion disabled or JS unavailable, everything still renders fully.

## Content constraints

- **Every claim on the page must stay true of the app.** The trust section's specifics (exactly one source file can open a network connection, enforced by a build-failing test; SHA-256-pinned downloads; deletion confirmed only after verified; zero telemetry) describe real enforced properties of the app — don't soften, embellish, or generalize them when editing copy.
- The waitlist button is a `mailto:` by design — no form, no tracker, and the page itself says so. Don't swap in a hosted form or analytics unless asked.
- Screenshot placeholders (`.shot-placeholder`) are intentional; each gets replaced with a real capture at ~2x inside the same 16/10 frame.
