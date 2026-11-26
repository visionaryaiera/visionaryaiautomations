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
  problems: { title: string; desc: string }[];
  industries: string[];
  facts: { value: string; label: string }[];
  pricing: PriceCard[];
}

export const SERVICE_EXTRAS: Record<string, ServiceExtra> = {
  "whatsapp-chatbot": {
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
      { name: "Starter", price: "₹2,999", unit: "/month", note: "+ ₹14,999 setup", perks: ["WhatsApp AI agent 24/7", "FAQs, prices & menu buttons", "Appointment booking", "Monthly report"] },
      { name: "Growth", price: "₹6,999", unit: "/month", note: "+ ₹34,999 setup", featured: true, perks: ["Everything in Starter", "CRM dashboard & lead scoring", "Auto follow-ups", "Instagram + Messenger"] },
    ],
  },
  "voice-agent": {
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
      { name: "Voice add-on", price: "₹7,999", unit: "/month", note: "+ ₹24,999 setup · 300 min included", perks: ["AI voice agent (Telugu / English)", "Calls new leads instantly", "Qualifies & books appointments", "Call summaries to your team"] },
      { name: "Pro (all-in-one)", price: "₹14,999", unit: "/month", note: "+ ₹74,999 setup · 500 min included", featured: true, perks: ["Voice + WhatsApp + CRM", "Sales routing to your team", "Custom integrations", "Priority support"] },
    ],
  },
  "ai-automation": {
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
      { name: "Growth", price: "₹6,999", unit: "/month", note: "+ ₹34,999 setup", featured: true, perks: ["Up to 3 automated workflows", "CRM & WhatsApp sync", "Dashboards & alerts", "Monitoring & fixes"] },
      { name: "Custom workflow", price: "from ₹19,999", note: "one-time per workflow", perks: ["Scoped to your process", "Sheets, CRM, email, APIs", "Documentation & handover", "Optional maintenance"] },
    ],
  },
  "ai-business-website": {
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
      { name: "Business website", price: "₹24,999", note: "one-time + ₹999/month hosting & care", featured: true, perks: ["Up to 6 pages, mobile-first", "AI chat + WhatsApp button", "Local SEO & Google setup", "Hosting, SSL & updates"] },
      { name: "Premium website", price: "₹49,999", note: "one-time + ₹999/month hosting & care", perks: ["Up to 15 pages + blog", "Booking & lead forms to CRM", "Analytics & ad tracking", "Speed & SEO optimisation"] },
    ],
  },
  "ai-video-ads": {
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
