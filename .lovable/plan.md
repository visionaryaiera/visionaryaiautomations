## Goal
Wire WhatsApp (`+91 94910 71248`) as the primary conversion channel across the entire site, with per-service pre-filled messages, one-click open, floating + sticky CTAs, and analytics tracking.

## 1. Central WhatsApp helper
Create `src/lib/whatsapp.ts`:
- `WHATSAPP_NUMBER = "919491071248"` and `WHATSAPP_BASE = "https://wa.me/919491071248"`.
- `SERVICE_MESSAGES` map keyed by service id (`ai-automation`, `whatsapp-chatbot`, `voice-agent`, `website`, `video-ads`, `general`) — the exact multi-line templates from the brief.
- `buildWhatsAppUrl(key)` → returns `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`.
- `trackWhatsAppClick(source, serviceKey)` → fires:
  - GA4: `window.gtag?.("event", "whatsapp_click", { source, service: serviceKey })`
  - Meta Pixel: `window.fbq?.("trackCustom", "WhatsAppClick", { source, service: serviceKey })`
  - Safe no-ops if either isn't loaded.

## 2. Reusable `<WhatsAppButton>` component
`src/components/site/WhatsAppButton.tsx` — a premium button (matches obsidian palette, green WhatsApp accent) that:
- Accepts `serviceKey`, `source`, `label` (default "Get Free Consultation"), `variant` (primary / ghost / sticky / floating / card), `showReplyNote`.
- Renders as `<a target="_blank" rel="noopener">` with `href={buildWhatsAppUrl(serviceKey)}` for true one-click open on mobile + desktop.
- Optional caption underneath: **"Typically replies within minutes"** with a small pulsing green dot.
- Calls `trackWhatsAppClick` in `onClick`.

## 3. Replace every CTA with WhatsApp
In `src/components/site/Landing.tsx`:
- Hero primary CTA, navbar "Book a call", "See our work" secondary, all mid-page banners → `<WhatsAppButton serviceKey="general" source="hero|nav|banner">`.
- Each of the 5 service cards gets a **"Get Free Consultation"** `WhatsAppButton` bound to its `serviceKey` + reply note.
- Pricing tier CTAs → WhatsApp (`source="pricing-<tier>"`, message = general).
- Portfolio "Start your project" → general.
- Footer contact list: replace fake `+1 555…` with `+91 94910 71248` and `wa.me/919491071248`.

## 4. Contact section
Replace the existing form with a large **WhatsApp-first** panel:
- Big "Chat on WhatsApp" `WhatsAppButton` (general message), reply note, and 5 secondary quick-start buttons — one per service — each pre-filling that service's template.
- Keep email/phone/location as small secondary tiles. No form gate.

## 5. Floating + sticky CTAs
- Upgrade the existing floating WhatsApp bubble (bottom-right) to use the helper, add pulsing ring, tooltip "Chat with us — replies in minutes", tracked as `source="floating"`.
- Add a new **sticky "Book Free Consultation"** pill (bottom-center on mobile, bottom-left on desktop) that appears after 400px scroll, tracked as `source="sticky"`. Both visible on all routes since they live in `Landing`; also mount the floating one in `__root.tsx` so it appears on `/privacy` and `/terms`.

## 6. Analytics loaders
In `src/routes/__root.tsx` `head()`, add GA4 (`gtag.js`) and Meta Pixel `<script>` tags with placeholder IDs (`GA4_MEASUREMENT_ID`, `META_PIXEL_ID`) documented in a comment for the user to swap. Initialize `dataLayer` and `fbq` so `trackWhatsAppClick` is safe pre-load.

## 7. QA / polish
- All links use `https://wa.me/919491071248?text=…` with `encodeURIComponent` (verified multi-line preserved).
- Buttons keep obsidian premium styling; WhatsApp accent color added as `--accent-whatsapp: 142 70% 45%` token in `src/styles.css`.
- Fully responsive; sticky + floating don't overlap on mobile (stacked with safe-area padding).
- No forms, no modals — one tap → WhatsApp.

## Technical notes
- Because `wa.me` links must open in a new tab reliably on iOS Safari, use `<a href target="_blank" rel="noopener noreferrer">` — do not `window.open` from JS (popup blockers).
- Analytics IDs will be placeholders; user can replace them or store as `VITE_GA4_ID` / `VITE_META_PIXEL_ID` env vars — I'll wire both paths.
- No backend changes; entirely frontend/presentation.