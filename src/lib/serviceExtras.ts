// Extra, honest per-service content: problems, industries, pricing and capability facts.
// (Facts only – no invented client results.)

export interface PriceCard {
  name: string;
  price: string;
  unit?: string;
  note?: string;
  perks: string[];
  featured?: boolean;
}

export interface ServiceExtra {
  before: string[];
  after: string[];
  journey: { title: string; desc: string }[];
  shots: { src: string; title: string; desc: string }[];
  problems: { title: string; desc: string }[];
  industries: string[];
  facts: { value: string; label: string }[];
  pricing: PriceCard[];
}

export const SERVICE_EXTRAS: Record<string, ServiceExtra> = {
  "whatsapp-chatbot": {
    before: ["Replies only during office hours", "Same 10 questions answered by hand", "Leads forgotten after the first chat", "No idea how many enquiries you missed"],
    after: ["Every enquiry answered in seconds, 24/7", "Prices, timings & location answered automatically", "Automatic follow-ups until they book", "Dashboard + daily WhatsApp summary"],
    journey: [{ title: "Customer messages", desc: "On WhatsApp, Instagram or your website – any time of day." }, { title: "AI answers instantly", desc: "Prices, services, timings – in Telugu, English or Hindi." }, { title: "Appointment booked", desc: "Picks a day and time; confirmation + calendar link sent." }, { title: "Your team is alerted", desc: "Hot leads and bookings reach you on WhatsApp with full context." }],
    shots: [{ src: "/showcase/chatbot-1.png", title: "WhatsApp conversation", desc: "Your customers chat naturally and book in under a minute." }, { src: "/showcase/chatbot-2.png", title: "Leads dashboard", desc: "Every lead scored hot / warm / cold with source and next step." }],
    problems: [
      { title: "Enquiries after 7 PM go cold", desc: "Customers message at night and book whoever replies first." },
      { title: "Staff answer the same questions", desc: "Prices, timings, location – dozens of times a day." },
      { title: "No follow-up", desc: "Leads that don't book on the first chat are simply forgotten." },
    ],
    industries: ["Clinics & hospitals", "Real estate", "Coaching & schools", "Salons & spas", "Restaurants", "Retail & D2C"],
    facts: [
      { value: "~1.3s", label: "Average AI reply time (our live bot)" },
      { value: "24/7", label: "Always answering" },
      { value: "3", label: "Languages: Telugu · English · Hindi" },
    ],
    pricing: [
      { name: "Starter", price: "₹14,999", unit: " setup", note: "(+ ₹2,999/month support & AI usage)", perks: ["WhatsApp AI agent 24/7", "FAQs, prices & menu buttons", "Appointment booking", "Monthly report"] },
      { name: "Growth", price: "₹34,999", unit: " setup", note: "(+ ₹6,999/month support & AI usage)", featured: true, perks: ["Everything in Starter", "CRM dashboard & lead scoring", "Auto follow-ups", "Instagram + Messenger"] },
    ],
  },
  "voice-agent": {
    before: ["Missed calls during busy hours", "New leads wait hours for a call-back", "Callers repeat the same script all day", "No record of what was said"],
    after: ["Every call answered, day and night", "New leads called back in under 2 minutes", "AI qualifies and books; humans close", "Summary of every call sent to your team"],
    journey: [{ title: "Lead comes in", desc: "From an ad, website form or missed call." }, { title: "AI calls in 2 minutes", desc: "Natural Telugu or English voice introduces your business." }, { title: "Qualifies & books", desc: "Asks the right questions and books a visit or call." }, { title: "Summary to your team", desc: "Hot leads are handed over with the full call summary." }],
    shots: [{ src: "/showcase/voice-1.png", title: "Live call transcript", desc: "See exactly what the AI said and what the customer wanted." }, { src: "/showcase/voice-2.png", title: "Call summary alert", desc: "Your team gets the outcome and next step on WhatsApp." }],
    problems: [
      { title: "Missed calls = missed revenue", desc: "Calls during busy hours or after closing go unanswered." },
      { title: "Slow callback to new leads", desc: "By the time someone calls back, the lead has moved on." },
      { title: "Costly call teams", desc: "Hiring and training callers for simple, repetitive calls." },
    ],
    industries: ["Clinics & diagnostics", "Real estate", "Education admissions", "Insurance & finance", "Service businesses"],
    facts: [
      { value: "< 2 min", label: "Call-back to new leads" },
      { value: "24/7", label: "Inbound & outbound" },
      { value: "Telugu", label: "+ English natural voice" },
    ],
    pricing: [
      { name: "Voice add-on", price: "₹24,999", unit: " setup", note: "(+ ₹7,999/month · 300 call min included)", perks: ["AI voice agent (Telugu / English)", "Calls new leads instantly", "Qualifies & books appointments", "Call summaries to your team"] },
      { name: "Pro (all-in-one)", price: "₹74,999", unit: " setup", note: "(+ ₹14,999/month · 500 call min included)", featured: true, perks: ["Voice + WhatsApp + CRM", "Sales routing to your team", "Custom integrations", "Priority support"] },
    ],
  },
  "ai-automation": {
    before: ["Copy-pasting leads between apps", "Reports built by hand every week", "Follow-ups depend on someone remembering", "Problems found days later"],
    after: ["Leads flow automatically into your CRM", "Reports and alerts generated for you", "Follow-ups triggered by rules, every time", "Real-time alerts on WhatsApp"],
    journey: [{ title: "We map your process", desc: "A 30-minute call to find the repetitive work." }, { title: "We build the workflow", desc: "WhatsApp, forms, sheets, CRM and email connected." }, { title: "You approve & go live", desc: "Tested with real data before switching on." }, { title: "We monitor & improve", desc: "Alerts if anything breaks; monthly improvements." }],
    shots: [{ src: "/showcase/automation-1.png", title: "Lead workflow", desc: "New enquiry \u2192 qualify \u2192 CRM \u2192 team alert, fully automatic." }, { src: "/showcase/automation-2.png", title: "Daily summary on WhatsApp", desc: "Leads, bookings and follow-ups in one message every morning." }],
    problems: [
      { title: "Manual copy-paste work", desc: "Leads, invoices and reports moved by hand between tools." },
      { title: "Leads slip between tools", desc: "WhatsApp, forms, sheets and CRM never stay in sync." },
      { title: "No real-time picture", desc: "You find out about problems days later." },
    ],
    industries: ["Agencies", "Real estate", "Clinics", "Manufacturing & distribution", "E-commerce"],
    facts: [
      { value: "7–14", label: "Days to first live workflow" },
      { value: "24/7", label: "Runs without your team" },
      { value: "100+", label: "Apps we can connect" },
    ],
    pricing: [
      { name: "Growth", price: "₹34,999", unit: " setup", note: "(+ ₹6,999/month monitoring & support)", featured: true, perks: ["Up to 3 automated workflows", "CRM & WhatsApp sync", "Dashboards & alerts", "Monitoring & fixes"] },
      { name: "Custom workflow", price: "from ₹19,999", note: "one-time per workflow", perks: ["Scoped to your process", "Sheets, CRM, email, APIs", "Documentation & handover", "Optional maintenance"] },
    ],
  },
  "ai-business-website": {
    before: ["Slow site that isn't mobile-friendly", "Visitors leave without enquiring", "Not found on Google", "No way to know where leads come from"],
    after: ["Fast, mobile-first site in 7–14 days", "AI chat + WhatsApp button convert visitors", "Local SEO and Google Business setup", "Every enquiry tracked to its source"],
    journey: [{ title: "Share your details", desc: "Services, photos, prices – we do the writing." }, { title: "Design preview", desc: "See your homepage design within days." }, { title: "Launch", desc: "Domain, hosting, SSL, SEO and AI chat set up." }, { title: "Leads to your WhatsApp", desc: "Every enquiry lands in your CRM and phone." }],
    shots: [{ src: "/showcase/website-1.png", title: "Desktop & mobile design", desc: "A clean, fast site that works beautifully on phones." }, { src: "/showcase/website-2.png", title: "Enquiry alert", desc: "Website enquiries arrive on WhatsApp in seconds." }],
    problems: [
      { title: "Website that doesn't convert", desc: "Visitors leave without enquiring or booking." },
      { title: "Slow & not mobile-friendly", desc: "Most of your visitors are on phones." },
      { title: "Not found on Google", desc: "No local SEO, no reviews, no structured data." },
    ],
    industries: ["Clinics", "Real estate projects", "Coaching & schools", "Restaurants & cafés", "Local services"],
    facts: [
      { value: "7–14", label: "Days to launch" },
      { value: "Mobile", label: "First design" },
      { value: "AI chat", label: "Built in, 24/7" },
    ],
    pricing: [
      { name: "Business website", price: "₹24,999", unit: " one-time", note: "(+ ₹999/month hosting & care)", featured: true, perks: ["Up to 6 pages, mobile-first", "AI chat + WhatsApp button", "Local SEO & Google setup", "Hosting, SSL & updates"] },
      { name: "Premium website", price: "₹49,999", unit: " one-time", note: "(+ ₹999/month hosting & care)", perks: ["Up to 15 pages + blog", "Booking & lead forms to CRM", "Analytics & ad tracking", "Speed & SEO optimisation"] },
    ],
  },
  "ai-video-ads": {
    before: ["Expensive shoots for every ad", "Same creative runs for months", "English-only ads", "No variants to test"],
    after: ["AI video ads without a shoot", "Fresh creatives every month", "Telugu & English voice-overs", "Multiple variants to find the winner"],
    journey: [{ title: "Share your offer", desc: "Product, audience and key message." }, { title: "Script & storyboard", desc: "We write it and show you the frames." }, { title: "First cut in 5 days", desc: "Reels, Shorts and feed sizes." }, { title: "Test & improve", desc: "Variants for A/B testing; we refresh monthly." }],
    shots: [{ src: "/showcase/video-1.png", title: "Storyboard frames", desc: "Hook, problem, solution and offer \u2013 scene by scene." }, { src: "/showcase/video-2.png", title: "Ad variants", desc: "Different hooks and formats ready for testing." }],
    problems: [
      { title: "Video shoots are expensive", desc: "Crews, locations and edits for every new ad." },
      { title: "Ads go stale fast", desc: "You need fresh creatives every few weeks." },
      { title: "One version for everyone", desc: "No Telugu, no variants to test what works." },
    ],
    industries: ["Real estate launches", "Clinics", "Restaurants", "Retail & D2C", "Education"],
    facts: [
      { value: "5 days", label: "First cut delivered" },
      { value: "3", label: "Formats: Reels · Shorts · Feed" },
      { value: "Telugu", label: "+ English voice-overs" },
    ],
    pricing: [
      { name: "Single video", price: "₹4,999", unit: "/video", perks: ["15–30 sec AI video ad", "Script + voice-over", "2 revisions", "Reels / Shorts / Feed sizes"] },
      { name: "Monthly pack", price: "₹14,999", unit: "/month", featured: true, perks: ["4 videos a month", "Variants for A/B testing", "Telugu & English", "Ad-ready exports"] },
    ],
  },
};
