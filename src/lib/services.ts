import type { ServiceKey } from "./whatsapp";
import {
  Workflow,
  Bot,
  PhoneCall,
  Globe,
  Video,
  type LucideIcon,
} from "lucide-react";

export interface ServiceMeta {
  key: ServiceKey;
  slug: string;
  icon: LucideIcon;
  accent: string; // tailwind color token suffix (blue|cyan|purple)
  name: string;
  tagline: string;
  seoTitle: string;
  seoDescription: string;
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
  };
  benefits: { title: string; desc: string }[];
  features: string[];
  workflow: { step: string; title: string; desc: string }[];
  results: { value: string; label: string }[];
  faq: { q: string; a: string }[];
}

export const SERVICES: ServiceMeta[] = [
  {
    key: "ai-automation",
    slug: "ai-automation",
    icon: Workflow,
    accent: "blue",
    name: "AI Automation",
    tagline: "End-to-end workflow automation that removes manual work.",
    seoTitle: "AI Automation Services — Visionary AI Automations",
    seoDescription:
      "Custom AI workflow automation with n8n, CRM orchestration, and API integrations. Eliminate manual work and scale operations.",
    hero: {
      kicker: "AI Automation",
      title: "Automate every repetitive workflow in your business.",
      subtitle:
        "We design custom AI workflows that connect your CRM, WhatsApp, email, calendar, and internal tools — so your team ships work while automation runs the ops.",
    },
    benefits: [
      { title: "Cut manual work by 70%+", desc: "Automate lead capture, follow-ups, invoicing, and reporting end-to-end." },
      { title: "Zero missed leads", desc: "Every enquiry gets qualified, routed, and answered in seconds — 24/7." },
      { title: "Scale without headcount", desc: "Handle 10x volume without hiring — automation runs your back office." },
      { title: "Real-time visibility", desc: "Dashboards and Slack/WhatsApp alerts so you always know what's happening." },
    ],
    features: [
      "n8n & Make workflows",
      "CRM sync (HubSpot, Zoho, Salesforce)",
      "WhatsApp & email automation",
      "Google Sheets & Airtable pipelines",
      "Custom API integrations",
      "AI-powered lead qualification",
      "Automated invoicing & reporting",
      "Slack / WhatsApp alerts",
    ],
    workflow: [
      { step: "01", title: "Discovery", desc: "We map every repetitive process across your team." },
      { step: "02", title: "Design", desc: "Custom workflow blueprint with tools, triggers, and AI nodes." },
      { step: "03", title: "Build", desc: "We build, connect, and stress-test in a staging environment." },
      { step: "04", title: "Deploy", desc: "Live rollout with training, docs, and 24/7 monitoring." },
    ],
    results: [
      { value: "70%", label: "Manual work removed" },
      { value: "3.2x", label: "Faster lead response" },
      { value: "24/7", label: "Always-on operations" },
    ],
    faq: [
      { q: "Which tools do you integrate with?", a: "Anything with an API — CRMs, ERPs, Google Workspace, WhatsApp Business, Slack, Notion, Airtable, custom databases, and 400+ SaaS tools via n8n and Make." },
      { q: "How long does a typical build take?", a: "Simple workflows go live in 5–7 days. Multi-system automations take 2–4 weeks. We'll give you an exact timeline after discovery." },
      { q: "Do you provide ongoing support?", a: "Yes — every deployment includes 30 days of hyper-care and optional monthly retainers for updates, monitoring, and new workflows." },
    ],
  },
  {
    key: "whatsapp-chatbot",
    slug: "whatsapp-chatbot",
    icon: Bot,
    accent: "cyan",
    name: "WhatsApp AI Chatbot",
    tagline: "24/7 AI chatbots that sell, support, and book on WhatsApp.",
    seoTitle: "WhatsApp AI Chatbot Development — Visionary AI Automations",
    seoDescription:
      "Custom WhatsApp AI chatbots for sales, support, appointments, and lead qualification. Multilingual, always-on, and on-brand.",
    hero: {
      kicker: "WhatsApp AI Chatbot",
      title: "Turn WhatsApp into your #1 sales and support channel.",
      subtitle:
        "Fluent, multilingual AI chatbots that qualify leads, book appointments, answer FAQs, and hand off cleanly to your team — with the official WhatsApp Business API.",
    },
    benefits: [
      { title: "Reply in seconds, 24/7", desc: "Never lose a lead to a slow reply again — your bot answers instantly." },
      { title: "Book appointments end-to-end", desc: "Calendar sync, confirmations, reminders — fully automated." },
      { title: "Multilingual by default", desc: "Speak Hindi, English, Telugu, Tamil, and more — natively." },
      { title: "Handoff to humans", desc: "Escalates hot leads and complex issues to your team automatically." },
    ],
    features: [
      "Official WhatsApp Business API",
      "AI-powered natural conversation",
      "Appointment & booking flows",
      "Order tracking & catalog",
      "Lead qualification & CRM sync",
      "Broadcast campaigns",
      "Multilingual (10+ languages)",
      "Human handoff & analytics",
    ],
    workflow: [
      { step: "01", title: "Use-case mapping", desc: "We define every conversation flow, intent, and edge case." },
      { step: "02", title: "AI training", desc: "We fine-tune the bot on your brand, FAQs, and tone of voice." },
      { step: "03", title: "WhatsApp API setup", desc: "Business verification, number provisioning, template approval." },
      { step: "04", title: "Launch & optimize", desc: "Go live with dashboards; we iterate weekly." },
    ],
    results: [
      { value: "<30s", label: "Average response time" },
      { value: "4.2x", label: "More qualified leads" },
      { value: "10+", label: "Languages supported" },
    ],
    faq: [
      { q: "Do you use the official WhatsApp Business API?", a: "Yes — every deployment uses the official Cloud API, so your account never gets flagged or banned." },
      { q: "Can it integrate with my CRM?", a: "Yes — leads and conversations sync to HubSpot, Zoho, Salesforce, Google Sheets, or any custom system." },
      { q: "How natural is the conversation?", a: "We use GPT-class models fine-tuned on your brand voice. Most users can't tell it apart from a human agent." },
    ],
  },
  {
    key: "voice-agent",
    slug: "voice-agent",
    icon: PhoneCall,
    accent: "purple",
    name: "AI Voice Agent",
    tagline: "Human-like AI callers that never miss a lead.",
    seoTitle: "AI Voice Agent Development — Visionary AI Automations",
    seoDescription:
      "Human-like AI voice agents for inbound reception, outbound sales, appointment reminders, and 24/7 phone support.",
    hero: {
      kicker: "AI Voice Agent",
      title: "Answer every call. Call every lead. Never sleep.",
      subtitle:
        "Voice AI that sounds human, speaks your language, and handles inbound reception, outbound sales, and follow-ups — at a fraction of the cost of a call center.",
    },
    benefits: [
      { title: "Never miss a call", desc: "Inbound receptionist answers 24/7 — with your brand voice." },
      { title: "Outbound at scale", desc: "Run thousands of qualified sales calls per day without a call center." },
      { title: "Human-like voices", desc: "Natural conversation, interruption handling, and multilingual support." },
      { title: "CRM & calendar sync", desc: "Every call logged, transcribed, and pushed into your systems." },
    ],
    features: [
      "Inbound reception & IVR replacement",
      "Outbound sales & follow-up calls",
      "Appointment reminders",
      "Multilingual voice (10+ languages)",
      "Call recording & transcripts",
      "CRM & calendar integration",
      "Real-time analytics dashboard",
      "Human handoff on demand",
    ],
    workflow: [
      { step: "01", title: "Script design", desc: "We build call flows, objection handling, and handoff rules." },
      { step: "02", title: "Voice cloning", desc: "Choose from premium voices or clone your brand voice." },
      { step: "03", title: "Number & routing", desc: "Provisioning, forwarding, and integration with your PBX." },
      { step: "04", title: "Launch & tune", desc: "Weekly reviews of transcripts and continuous optimization." },
    ],
    results: [
      { value: "100%", label: "Calls answered" },
      { value: "60%", label: "Lower cost vs. call center" },
      { value: "5000+", label: "Calls per day capacity" },
    ],
    faq: [
      { q: "Can the voice sound like a specific person?", a: "Yes — we can clone your brand voice with consent, or pick from a library of premium natural voices." },
      { q: "What languages are supported?", a: "English, Hindi, Telugu, Tamil, Marathi, Bengali, Gujarati, Kannada, Malayalam, Punjabi and more." },
      { q: "Does it work with my existing phone number?", a: "Yes — we can route calls from your existing number or provision a new one." },
    ],
  },
  {
    key: "website",
    slug: "ai-business-website",
    icon: Globe,
    accent: "blue",
    name: "AI Business Website",
    tagline: "SEO-optimized, conversion-focused websites built with AI.",
    seoTitle: "AI Business Website Development — Visionary AI Automations",
    seoDescription:
      "Premium AI-powered business websites: landing pages, booking sites, portfolios, and e-commerce — SEO-optimized and conversion-tuned.",
    hero: {
      kicker: "AI Business Website",
      title: "A website that sells for you — 24/7.",
      subtitle:
        "Premium, mobile-first business websites with built-in AI chatbots, SEO optimization, analytics, and conversion-tuned layouts. Ready to rank and convert from day one.",
    },
    benefits: [
      { title: "Rank on Google", desc: "SEO-optimized architecture, schema markup, and Core Web Vitals built in." },
      { title: "Convert visitors", desc: "Conversion-tuned layouts with CTAs, forms, and WhatsApp integration." },
      { title: "AI-powered", desc: "Built-in AI chatbot, dynamic content, and lead qualification." },
      { title: "Live in 2 weeks", desc: "Design, build, and launch in as little as 14 days." },
    ],
    features: [
      "Custom design & branding",
      "Mobile-first responsive",
      "SEO & schema markup",
      "Built-in AI chatbot",
      "WhatsApp & form CTAs",
      "Google Analytics 4 & Meta Pixel",
      "Blog & content system",
      "E-commerce ready",
    ],
    workflow: [
      { step: "01", title: "Brand & strategy", desc: "Positioning, IA, and conversion strategy." },
      { step: "02", title: "Design", desc: "Premium mockups reviewed section-by-section." },
      { step: "03", title: "Build & AI wiring", desc: "Development, AI chatbot, analytics, and integrations." },
      { step: "04", title: "Launch & optimize", desc: "Go live with SEO, analytics, and A/B testing." },
    ],
    results: [
      { value: "14 days", label: "Average time to launch" },
      { value: "95+", label: "PageSpeed score" },
      { value: "3.8x", label: "Higher conversion vs. templates" },
    ],
    faq: [
      { q: "What stack do you build on?", a: "Modern React (TanStack Start / Next.js) for premium sites, WordPress or Shopify when appropriate. Always fast, always SEO-friendly." },
      { q: "Do I own the code?", a: "Yes — full source and hosting handover included with every project." },
      { q: "Do you handle hosting?", a: "We can host on Cloudflare / Vercel with global CDN and SSL, or hand off to your team." },
    ],
  },
  {
    key: "video-ads",
    slug: "ai-video-ads",
    icon: Video,
    accent: "purple",
    name: "AI Video Ads",
    tagline: "Cinematic AI video ads that convert on Meta, YouTube, and TikTok.",
    seoTitle: "AI Video Ad Production — Visionary AI Automations",
    seoDescription:
      "Cinematic AI-generated video ads for Meta, YouTube, TikTok, and LinkedIn. Multiple variants, scripts, and voiceovers — production-ready in days.",
    hero: {
      kicker: "AI Video Ads",
      title: "Cinematic ads. Delivered in days. Built to convert.",
      subtitle:
        "AI-generated video ads with pro scripts, voiceovers, subtitles, and multi-variant testing — for Meta, YouTube, TikTok, and LinkedIn.",
    },
    benefits: [
      { title: "Cinematic quality", desc: "Studio-grade visuals without the studio price tag." },
      { title: "Delivered in days", desc: "First cut in 5 days, revisions included." },
      { title: "Multi-variant testing", desc: "10+ ad variants per concept for aggressive A/B testing." },
      { title: "Platform-optimized", desc: "Vertical, square, and horizontal cuts for every ad platform." },
    ],
    features: [
      "AI-generated cinematic footage",
      "Scripts & storyboards",
      "AI voiceovers (multilingual)",
      "Subtitles & captions",
      "10+ variants per concept",
      "Meta, YouTube, TikTok, LinkedIn cuts",
      "Music & sound design",
      "UGC-style options",
    ],
    workflow: [
      { step: "01", title: "Brief & angle", desc: "We define the hook, offer, and target audience." },
      { step: "02", title: "Script & storyboard", desc: "Copy, visual direction, and voice tone locked." },
      { step: "03", title: "AI production", desc: "Generation, editing, VO, subtitles, and platform cuts." },
      { step: "04", title: "Launch & iterate", desc: "Ship, measure, refresh creatives every 2 weeks." },
    ],
    results: [
      { value: "5 days", label: "First cut delivered" },
      { value: "10+", label: "Variants per concept" },
      { value: "2.4x", label: "Higher CTR vs. static" },
    ],
    faq: [
      { q: "How is this different from stock video?", a: "Every frame is custom-generated for your brand, product, and audience — never generic." },
      { q: "Can you match my brand?", a: "Yes — colors, fonts, tone, spokesperson style, and brand guidelines are all applied." },
      { q: "Do you also run the ads?", a: "We can — media buying is an optional add-on for Meta, Google, and TikTok ads." },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceMeta | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getServiceByKey(key: ServiceKey): ServiceMeta | undefined {
  return SERVICES.find((s) => s.key === key);
}