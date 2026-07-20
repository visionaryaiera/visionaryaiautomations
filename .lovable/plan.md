## Visionary AI Automations — build plan

Premium matte-black AI agency site built on the selected "Obsidian control room" direction. Single-page long-scroll landing (route `/`) with anchor navigation to sections, plus separate routes for legal pages.

### Design tokens (locked from selected prototype)
- Canvas `#050505`, surface `#0a0a0a`
- Accents: electric blue `#3b82f6`, purple `#a855f7`, cyan `#22d3ee`
- Typography: Inter (400/500/600/800), tight tracking, large bold headlines
- Effects: glassmorphism, soft blue glow (`box-shadow: 0 0 40px -10px rgba(59,130,246,0.2)`), animated pulsing gradient logo, subtle blur orbs
- Corners: `rounded-2xl` cards, `rounded-full` pills/CTAs
- Load Inter via `<link>` in `__root.tsx` head

### Route structure
- `/` — full landing page (rewrite `src/routes/index.tsx`, remove placeholder)
- `/privacy` — Privacy Policy
- `/terms` — Terms of Service
- Update `__root.tsx`: real title, description, og tags for "Visionary AI Automations — AI Automation Agency"

### Section order on `/`
1. **Sticky navbar** — pill-shaped floating nav, logo (gradient pulse orb + "Visionary"), desktop menu (Home, Services, Industries, Portfolio, Pricing, About, FAQ, Contact), CTA "Book Call", mobile hamburger sheet
2. **Hero** — "Intelligence Refined" pill badge, headline "Transform Your Business With AI Automation", subheading, dual CTAs (Book Free Strategy Call / View Services), dashboard visual with blue glow
3. **Tech stack marquee** — "Engineered with the world's best" with logos: OpenAI, Gemini, Claude, n8n, WhatsApp Business API, ElevenLabs, Supabase, Firebase, Vercel, Cloudflare, Stripe, Razorpay (horizontal auto-scroll)
4. **Stats counter** — 4 stats (clients served, hours saved, revenue lifted, uptime)
5. **Core Services** — stacked large cards (matches prototype exactly), 5 services: AI Automation, WhatsApp AI Chatbots, AI Voice Agents, AI Business Websites, AI Video Ads. Each: icon in tinted square, title, description, sub-service pill tags
6. **Why Choose Us** — 7 tile grid: Fast Delivery, Premium Design, Business Focused, Enterprise Security, Scalable Solutions, Dedicated Support, Latest AI Technology
7. **How We Work** — 7-step vertical/horizontal rail with connecting line: Consultation → Analysis → Strategy → Development → Testing → Launch → Support
8. **Industries** — 11 chips/tiles: Healthcare, Real Estate, Education, Restaurants, Manufacturing, Retail, Finance, E-commerce, NGOs, Churches, Professional Services
9. **Portfolio** — 6 case tiles with category tags (Website, Automation, Chatbot, Voice Agent, Video Ad, Before/After)
10. **Testimonials** — 3 quote cards with author + role + company
11. **Pricing** — 4 tiers (Starter, Growth, Business, Enterprise) + Custom Quote card. Growth marked "Most Popular" with blue ring glow
12. **FAQ** — shadcn Accordion, ~8 questions
13. **Contact** — split: form (name/email/company/message with zod validation) + info column (WhatsApp, Email, Phone, Calendly link)
14. **Final CTA** — "Ready to automate?" gradient panel with primary CTA
15. **Footer** — logo, tagline, quick links (Services, Industries, Portfolio, Pricing, About), Legal (Privacy, Terms), Social icons, copyright

### Extra features
- Floating WhatsApp button (bottom-right)
- Scroll-progress bar (top, thin gradient)
- Back-to-top button (appears after scroll)
- Smooth scroll for anchor nav
- Framer Motion fade-up on section reveal
- Sticky CTA reappears in mobile footer bar

### Component breakdown (all in `src/components/site/`)
- `Navbar.tsx`, `Hero.tsx`, `TechMarquee.tsx`, `Stats.tsx`, `Services.tsx`, `WhyChooseUs.tsx`, `Process.tsx`, `Industries.tsx`, `Portfolio.tsx`, `Testimonials.tsx`, `Pricing.tsx`, `Faq.tsx`, `Contact.tsx`, `FinalCta.tsx`, `Footer.tsx`, `FloatingWhatsApp.tsx`, `ScrollProgress.tsx`, `BackToTop.tsx`

### Technical notes
- Add design tokens to `src/styles.css` under `@theme inline` (`--color-accent-blue`, `--color-accent-purple`, `--color-accent-cyan`, `--color-surface`); keep existing shadcn tokens
- Install: `framer-motion`, `lucide-react` (icons), `react-hook-form`, `@hookform/resolvers`, `zod` (form validation)
- Hero visual: generate one dark dashboard image via imagegen and place it in the hero glow frame
- Portfolio thumbs: use generated placeholder images (dark abstract UI/product shots)
- Contact form: client-only submit → toast success (no backend; Lovable Cloud not enabled per user request)
- SEO: proper `head()` on `/`, `/privacy`, `/terms` with distinct titles/descriptions/og tags; JSON-LD Organization schema on root
- Fully responsive; mobile-first; icon buttons get `aria-label`; single `<main>` per page

### What's out of scope for this build
- No Lovable Cloud / database (no auth, no CMS, no persisted form submissions)
- No live chat widget, no animated cursor, no premium loader, no blog, no newsletter backend
- No dark-mode toggle (site is already premium-dark by default)
- Real Calendly link and WhatsApp number use placeholders you can swap later

Confirm and I'll build it.