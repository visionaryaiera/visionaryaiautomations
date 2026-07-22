## Advanced WhatsApp + Google Form Lead System

I'll build 5 dedicated service pages plus a shared post-submission flow. WhatsApp + analytics infrastructure already exists — this expands on it.

### 1. Dedicated service routes

Create 5 new routes with full SEO `head()` metadata:

```
src/routes/services.ai-automation.tsx
src/routes/services.whatsapp-chatbot.tsx
src/routes/services.voice-agent.tsx
src/routes/services.website.tsx
src/routes/services.video-ads.tsx
```

Each page includes: hero with animated demo, "how it works" workflow rail, realistic dashboard/chat/voice/website/video mockup, feature grid, business benefits, client-results stat strip, service-specific FAQ, and dual CTAs ("Book Free Consultation" → WhatsApp, "Submit Requirements" → Google Form).

Extract a shared `ServicePageLayout` + reusable blocks (`ServiceHero`, `WorkflowRail`, `BenefitsGrid`, `ServiceFAQ`, `ServiceCTA`) into `src/components/site/service/`. Per-service animated visuals reuse `AIShowcase` primitives.

### 2. Wire service cards to the new routes

Landing service cards become clickable → route to `/services/<slug>`, keeping the existing WhatsApp + form buttons inline. Nav gets a "Services" dropdown / anchor.

### 3. Google Form submission → WhatsApp thank-you

Create `src/routes/thank-you.tsx` with query params `?service=...&business=...&ref=...`:
- Shows "Thank you. Your request has been received."
- Generates a short reference ID (timestamp-based) if none passed
- After 2s auto-redirects to WhatsApp with a pre-filled thank-you message including submitted service, business, and reference ID
- Fires GA4 `form_submit` and Meta `Lead` events

Because Google Forms' native confirmation can't redirect, I'll document (in a comment + `/settings/analytics` help text) that each form should use the "link to another site" trick via a short custom confirmation, OR use a Google Apps Script `onFormSubmit` trigger to notify n8n. Practical path: after clicking "Submit Requirements" we open the form in a new tab AND surface `/thank-you` in the current tab so users always hit our redirect flow.

### 4. Central config for GA4/Pixel and form URLs

`src/lib/forms.ts` already exists (placeholders remain until you paste real URLs). Add:
- `SERVICE_META` in `src/lib/services.ts` — single source of truth: slug, title, tagline, WhatsApp key, form URL, benefits, features, FAQ, workflow steps.
- All service pages + landing cards read from this registry.

### 5. Automation (n8n / Sheets → WhatsApp) — instructions, not code

The website side ends at the Google Form. The Sheets → n8n → WhatsApp Business API leg runs outside the repo. I'll add `docs/AUTOMATION_SETUP.md` with:
- Google Form → Sheets link steps
- n8n workflow JSON template (Sheets trigger → format lead → WhatsApp Cloud API POST to +91 94910 71248)
- Required env vars (WhatsApp phone_number_id, permanent token)
- Sample notification template matching your spec

### 6. Analytics events

Extend `src/lib/analytics.ts` with typed events already covered plus:
- `service_view` (per service page mount)
- `demo_view` (when animated demo enters viewport, via IntersectionObserver)
- `cta_click` (variant + service)

Existing `whatsapp_click` and `form_click` stay.

### Technical notes

- All routes use `createFileRoute` with route-specific `head()` (title, description, og:title/description). No og:image at root.
- TanStack `<Link>` used for internal nav; WhatsApp/Form links stay as `<a target="_blank">` with tracking on click.
- Fully responsive, semantic HTML, one `<h1>` per page.
- No backend changes — pure frontend + docs.

### What I need from you (can proceed without, using placeholders)

1. Real Google Form URLs per service (still placeholder in `src/lib/forms.ts`).
2. Confirm you want the automation setup as a docs file (I can't provision n8n from here).

Say "go" and I'll build it.