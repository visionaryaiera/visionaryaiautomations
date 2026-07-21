import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bot,
  Workflow,
  PhoneCall,
  Globe,
  Video,
  Zap,
  ShieldCheck,
  Target,
  Lock,
  Scaling,
  Headset,
  Sparkles,
  Check,
  MessageCircle,
  Mail,
  Phone as PhoneIcon,
  MapPin,
  ArrowUp,
  Menu,
  X,
  Stethoscope,
  Building2,
  GraduationCap,
  UtensilsCrossed,
  Factory,
  ShoppingBag,
  Landmark,
  ShoppingCart,
  HeartHandshake,
  Church,
  Briefcase,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Toaster } from "sonner";
import heroDashboard from "@/assets/hero-dashboard.jpg";
import { WhatsAppButton } from "./WhatsAppButton";
import { WHATSAPP_DISPLAY, buildWhatsAppUrl, trackWhatsAppClick, type ServiceKey } from "@/lib/whatsapp";
import { getFormUrl, trackFormClick } from "@/lib/forms";
import { AIShowcase } from "./AIShowcase";

const nav = [
  { label: "Services", href: "#services" },
  { label: "Showcase", href: "#showcase" },
  { label: "Industries", href: "#industries" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const services = [
  {
    icon: Workflow,
    key: "ai-automation" as ServiceKey,
    color: "text-accent-blue",
    bg: "bg-accent-blue/10",
    border: "hover:border-accent-blue/40",
    title: "AI Automation",
    desc: "End-to-end workflow automation with n8n, custom APIs, and CRM orchestration that removes manual busywork.",
    tags: ["n8n", "CRM", "WhatsApp", "Appointments", "Leads", "Email", "APIs", "Custom"],
  },
  {
    icon: Bot,
    key: "whatsapp-chatbot" as ServiceKey,
    color: "text-accent-cyan",
    bg: "bg-accent-cyan/10",
    border: "hover:border-accent-cyan/40",
    title: "WhatsApp AI Chatbots",
    desc: "24/7 sales, support, and booking chatbots that speak your customers' language — fluent, fast, on-brand.",
    tags: ["Sales", "Support", "Lead-gen", "FAQ", "Bookings", "Order Tracking", "Multilingual"],
  },
  {
    icon: PhoneCall,
    key: "voice-agent" as ServiceKey,
    color: "text-accent-purple",
    bg: "bg-accent-purple/10",
    border: "hover:border-accent-purple/40",
    title: "AI Voice Agents",
    desc: "Human-like receptionists and outbound sales callers that never miss a lead — inbound, outbound, follow-ups.",
    tags: ["Receptionist", "Sales Calling", "Support", "Reminders", "Follow-ups", "Inbound", "Outbound"],
  },
  {
    icon: Globe,
    key: "website" as ServiceKey,
    color: "text-accent-blue",
    bg: "bg-accent-blue/10",
    border: "hover:border-accent-blue/40",
    title: "AI Business Websites",
    desc: "SEO-optimized, conversion-focused websites: landing pages, booking sites, portfolios, and full e-commerce.",
    tags: ["Business", "Landing", "Booking", "Portfolio", "E-commerce", "SEO"],
  },
  {
    icon: Video,
    key: "video-ads" as ServiceKey,
    color: "text-accent-purple",
    bg: "bg-accent-purple/10",
    border: "hover:border-accent-purple/40",
    title: "AI Video Ads",
    desc: "Cinematic commercial, product, CGI, and UGC-style ads that scroll-stop your audience and lift conversions.",
    tags: ["Commercial", "Product", "CGI", "UGC", "Brand", "Motion", "Social", "Explainer"],
  },
];

const whyUs = [
  { icon: Zap, title: "Fast Delivery", desc: "Ship in weeks, not quarters." },
  { icon: Sparkles, title: "Premium Design", desc: "Award-worthy craft on every pixel." },
  { icon: Target, title: "Business Focused", desc: "Every build tied to a revenue KPI." },
  { icon: Lock, title: "Enterprise Security", desc: "SOC2-minded stack, zero shortcuts." },
  { icon: Scaling, title: "Scalable Solutions", desc: "Built to survive 100× growth." },
  { icon: Headset, title: "Dedicated Support", desc: "A team on call, not a ticket queue." },
  { icon: ShieldCheck, title: "Latest AI Tech", desc: "GPT-5, Claude, Gemini — always current." },
];

const process = [
  "Free Consultation",
  "Business Analysis",
  "AI Strategy",
  "Development",
  "Testing",
  "Launch",
  "Support",
];

const industries = [
  { icon: Stethoscope, label: "Healthcare" },
  { icon: Building2, label: "Real Estate" },
  { icon: GraduationCap, label: "Education" },
  { icon: UtensilsCrossed, label: "Restaurants" },
  { icon: Factory, label: "Manufacturing" },
  { icon: ShoppingBag, label: "Retail" },
  { icon: Landmark, label: "Finance" },
  { icon: ShoppingCart, label: "E-commerce" },
  { icon: HeartHandshake, label: "NGOs" },
  { icon: Church, label: "Churches" },
  { icon: Briefcase, label: "Professional Services" },
];

const portfolio = [
  { tag: "Automation", title: "Real estate lead router", metric: "+312% qualified leads" },
  { tag: "Voice Agent", title: "Clinic AI receptionist", metric: "24/7 · 0 missed calls" },
  { tag: "Chatbot", title: "Restaurant booking bot", metric: "18k bookings/mo" },
  { tag: "Website", title: "SaaS launch site", metric: "4.2s → 0.8s LCP" },
  { tag: "Video Ad", title: "CGI product commercial", metric: "9.4× ROAS" },
  { tag: "Before / After", title: "Manufacturing ops rebuild", metric: "−67% manual hours" },
];

const techStack = [
  "OpenAI",
  "Gemini",
  "Claude",
  "n8n",
  "WhatsApp API",
  "ElevenLabs",
  "Supabase",
  "Firebase",
  "Vercel",
  "Cloudflare",
  "Stripe",
  "Razorpay",
];

const faqs = [
  {
    q: "How fast can you deliver a project?",
    a: "Most automations and chatbots ship in 2–4 weeks. Voice agents and full websites take 4–8 weeks depending on scope.",
  },
  {
    q: "Do you work with businesses outside the US?",
    a: "Yes — we serve clients globally with async delivery and a shared Slack channel. Voice agents and chatbots support 30+ languages.",
  },
  {
    q: "Which AI models do you use?",
    a: "We're model-agnostic. We pick the best fit per task from OpenAI, Anthropic (Claude), Google (Gemini), and open-source models.",
  },
  {
    q: "Do you handle hosting and maintenance?",
    a: "Yes. Every plan includes hosting on Vercel / Cloudflare and monitoring. Growth and above get priority incident response.",
  },
  {
    q: "Is my data secure?",
    a: "We follow SOC2-aligned practices, encrypt data in transit and at rest, and never train shared models on your customer data.",
  },
  {
    q: "Can you integrate with our existing CRM/tools?",
    a: "Yes — HubSpot, Salesforce, Zoho, Pipedrive, Google Workspace, Slack, and 400+ tools via n8n and native APIs.",
  },
  {
    q: "What if I don't know what to automate yet?",
    a: "That's what the free strategy call is for. We map your workflows and identify the top 3 highest-ROI automations.",
  },
  {
    q: "How do payments work?",
    a: "Monthly retainer via Stripe or Razorpay. Enterprise engagements support wire and PO terms.",
  },
];

export default function Landing() {
  const [scrolled, setScrolled] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setScrolled(pct);
      setShowTop(h.scrollTop > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-canvas text-neutral-100 font-sans antialiased selection:bg-accent-blue/40">
      {/* Scroll progress */}
      <div className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan transition-[width]"
          style={{ width: `${scrolled}%` }}
        />
      </div>

      {/* Nav */}
      <nav className="fixed top-2 z-50 w-full px-3 sm:px-4 pt-2">
        <div className="mx-auto flex h-12 max-w-6xl items-center justify-between rounded-full border border-white/10 bg-canvas/70 px-3 sm:px-4 backdrop-blur-xl ring-1 ring-black/5">
          <a href="#top" className="flex items-center gap-2 min-w-0">
            <span className="inline-block size-6 shrink-0 rounded-full bg-gradient-to-tr from-accent-blue via-accent-purple to-accent-cyan animate-pulse" />
            <span className="text-sm font-semibold tracking-tight truncate">Visionary AI</span>
          </a>
          <div className="hidden md:flex items-center gap-6">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-xs font-medium text-zinc-400 transition-colors hover:text-white"
              >
                {n.label}
              </a>
            ))}
          </div>
          <a
            href={buildWhatsAppUrl("general")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("nav", "general")}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-1.5 text-xs font-semibold text-white ring-1 ring-[#25D366]/60 transition-transform hover:scale-[1.02] active:scale-95"
          >
            <MessageCircle className="size-3" />
            Book Free Consultation
          </a>
          <button
            className="md:hidden inline-flex size-9 items-center justify-center rounded-full border border-white/10"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden mx-auto mt-2 max-w-6xl rounded-2xl border border-white/10 bg-canvas/95 p-4 backdrop-blur-xl">
            <div className="grid gap-1">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-white/5"
                >
                  {n.label}
                </a>
              ))}
              <a
                href={buildWhatsAppUrl("general")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setMenuOpen(false);
                  trackWhatsAppClick("nav-mobile", "general");
                }}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white"
              >
                <MessageCircle className="size-4" />
                Book Free Consultation
              </a>
            </div>
          </div>
        )}
      </nav>

      <main id="top">
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
          <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-accent-blue/20 blur-[140px]" />
          <div className="pointer-events-none absolute top-40 -left-20 -z-10 h-72 w-72 rounded-full bg-accent-purple/20 blur-[120px]" />
          <div className="pointer-events-none absolute top-20 right-0 -z-10 h-72 w-72 rounded-full bg-accent-cyan/10 blur-[120px]" />

          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-accent-blue/20 bg-accent-blue/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-accent-cyan">
                <span className="relative inline-flex size-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-accent-cyan opacity-75" />
                  <span className="relative inline-block size-1.5 rounded-full bg-accent-cyan" />
                </span>
                Intelligence, Refined
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 text-balance text-center text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
            >
              Transform Your Business With{" "}
              <span className="bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan bg-clip-text text-transparent">
                AI Automation
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-6 max-w-[52ch] text-pretty text-center text-base sm:text-lg text-zinc-400"
            >
              Automate operations. Increase revenue. Reduce costs. Scale faster
              with enterprise-grade AI agents engineered for the modern era.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-col items-center gap-4"
            >
              <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
                <WhatsAppButton
                  serviceKey="general"
                  source="hero-primary"
                  label="Book Free Consultation"
                  variant="primary"
                />
                <a
                  href="#services"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-neutral-200 backdrop-blur-md transition-colors hover:bg-white/10 sm:w-auto"
                >
                  View Services
                </a>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-zinc-500">
                <span className="relative inline-flex size-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-75" />
                  <span className="relative inline-block size-1.5 rounded-full bg-[#25D366]" />
                </span>
                Typically replies within minutes
              </span>
            </motion.div>
          </div>

          {/* Dashboard visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-20 px-4"
          >
            <div className="mx-auto max-w-5xl">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface glow-blue">
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent-blue/60 to-transparent" />
                <img
                  src={heroDashboard}
                  alt="Visionary AI automation dashboard preview"
                  width={1600}
                  height={1000}
                  className="w-full"
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Tech marquee */}
        <section className="border-y border-white/5 bg-canvas py-12">
          <p className="mb-8 text-center text-[10px] font-medium uppercase tracking-[0.25em] text-zinc-500">
            Engineered with the world's best
          </p>
          <div className="relative overflow-hidden">
            <div className="flex w-max animate-marquee gap-14 whitespace-nowrap px-6 opacity-60">
              {[...techStack, ...techStack].map((t, i) => (
                <span
                  key={i}
                  className="text-lg font-semibold tracking-tight text-zinc-400"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-canvas to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-canvas to-transparent" />
          </div>
        </section>

        {/* Stats */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { v: "120+", l: "Enterprises served" },
              { v: "48k", l: "Hours automated / mo" },
              { v: "$14M+", l: "Client revenue lifted" },
              { v: "99.98%", l: "Uptime across builds" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-2xl border border-white/5 bg-surface p-6"
              >
                <div className="text-3xl font-semibold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                  {s.v}
                </div>
                <div className="mt-2 text-xs uppercase tracking-widest text-zinc-500">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <Section id="services" eyebrow="01 — Capabilities" title="Core Intelligence" desc="Specialized AI solutions built to integrate seamlessly into your existing workflows.">
          <div className="grid gap-4">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative overflow-hidden rounded-3xl border border-white/5 bg-surface p-8 transition-all ${s.border} hover:-translate-y-0.5`}
              >
                <div className="pointer-events-none absolute -right-16 -top-16 size-52 rounded-full bg-accent-blue/5 blur-3xl transition-opacity group-hover:opacity-100 opacity-0" />
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <div className={`flex size-11 items-center justify-center rounded-xl ${s.bg} ${s.color}`}>
                      <s.icon className="size-5" />
                    </div>
                    <h3 className="mt-6 text-xl font-semibold tracking-tight text-neutral-100">
                      {s.title}
                    </h3>
                    <p className="mt-3 max-w-[56ch] text-sm leading-relaxed text-zinc-400">
                      {s.desc}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {s.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-zinc-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 flex flex-col items-start gap-3">
                      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                        <WhatsAppButton
                          serviceKey={s.key}
                          source={`service-${s.key}`}
                          label="Get Free Consultation"
                          variant="primary"
                        />
                        <a
                          href={getFormUrl(s.key)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackFormClick(`service-${s.key}`, s.key)}
                          className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-neutral-100 backdrop-blur-md transition-colors hover:bg-white/10"
                        >
                          Submit Requirements
                          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                        </a>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-zinc-500">
                        <span className="relative inline-flex size-1.5">
                          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-75" />
                          <span className="relative inline-block size-1.5 rounded-full bg-[#25D366]" />
                        </span>
                        Typically replies within minutes
                      </span>
                    </div>
                  </div>
                  <div className="hidden md:flex shrink-0">
                    <span className="text-xs font-mono text-zinc-600">
                      0{i + 1}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Why Choose Us */}
        <Section id="about" eyebrow="02 — Why Visionary" title="Built for enterprise. Priced for growth." desc="Seven reasons ambitious teams choose us over agencies twice our size.">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyUs.map((w) => (
              <div
                key={w.title}
                className="rounded-2xl border border-white/5 bg-surface p-6 transition-colors hover:border-white/15"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-white/5 text-accent-cyan">
                  <w.icon className="size-4" />
                </div>
                <h3 className="mt-5 text-base font-semibold text-neutral-100">
                  {w.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-400">{w.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Process */}
        <Section id="process" eyebrow="03 — Method" title="How we work" desc="A calm, seven-step operating rhythm that stays predictable from kickoff to launch.">
          <ol className="relative grid gap-4 md:grid-cols-7">
            <div className="pointer-events-none absolute left-6 top-6 hidden h-px w-[calc(100%-3rem)] bg-gradient-to-r from-accent-blue/40 via-accent-purple/40 to-accent-cyan/40 md:block" />
            {process.map((step, i) => (
              <li
                key={step}
                className="relative rounded-2xl border border-white/5 bg-surface p-5"
              >
                <div className="flex size-8 items-center justify-center rounded-full border border-white/10 bg-canvas text-xs font-semibold text-accent-cyan">
                  {i + 1}
                </div>
                <p className="mt-4 text-sm font-medium text-neutral-100">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </Section>

        {/* Industries */}
        <Section id="industries" eyebrow="04 — Verticals" title="Industries we serve" desc="Deep operating context across sectors — from clinics to congregations.">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {industries.map((it) => (
              <div
                key={it.label}
                className="flex items-center gap-3 rounded-2xl border border-white/5 bg-surface p-4 transition-colors hover:border-accent-blue/30"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-accent-blue">
                  <it.icon className="size-4" />
                </div>
                <span className="text-sm font-medium text-neutral-200">
                  {it.label}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* Portfolio */}
        <Section id="portfolio" eyebrow="05 — Selected Work" title="Recent deployments" desc="A small slice of the systems we've shipped in the last twelve months.">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {portfolio.map((p) => (
              <div
                key={p.title}
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-surface"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/30 via-accent-purple/20 to-transparent" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.35),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.3),transparent_50%)]" />
                  <div className="absolute inset-0 backdrop-blur-[2px]" />
                  <div className="absolute inset-4 rounded-xl border border-white/10 bg-canvas/60" />
                </div>
                <div className="p-5">
                  <span className="text-[10px] font-medium uppercase tracking-widest text-accent-cyan">
                    {p.tag}
                  </span>
                  <h3 className="mt-2 text-base font-semibold text-neutral-100">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-500">{p.metric}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Testimonials */}
        <Section eyebrow="06 — Trust" title="What clients say" desc="Operators shipping revenue with Visionary systems.">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                q: "Their voice agent replaced three receptionists in a month. Booking rate is up 41%.",
                n: "Dr. Amara Okafor",
                r: "Founder, Meridian Health",
              },
              {
                q: "We stopped losing WhatsApp leads overnight. It felt like hiring a whole team.",
                n: "Rohan Mehta",
                r: "COO, Sundara Realty",
              },
              {
                q: "The video ad they built for our launch outperformed our agency's work 6:1.",
                n: "Lena Petrova",
                r: "CMO, Northline Foods",
              },
            ].map((t) => (
              <figure
                key={t.n}
                className="rounded-2xl border border-white/5 bg-surface p-6"
              >
                <blockquote className="text-sm leading-relaxed text-neutral-200">
                  "{t.q}"
                </blockquote>
                <figcaption className="mt-6 border-t border-white/5 pt-4">
                  <div className="text-sm font-medium text-neutral-100">
                    {t.n}
                  </div>
                  <div className="text-xs text-zinc-500">{t.r}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>

        {/* Pricing */}
        <Section id="pricing" eyebrow="07 — Investment" title="Scale your intelligence" desc="Transparent plans. Cancel or upgrade any month.">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {pricing.map((p) => (
              <div
                key={p.name}
                className={`relative flex flex-col rounded-2xl border p-6 ${
                  p.highlighted
                    ? "border-accent-blue/50 bg-surface ring-1 ring-accent-blue/30 glow-blue"
                    : "border-white/5 bg-surface"
                }`}
              >
                {p.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent-blue px-3 py-1 text-[10px] font-bold uppercase text-white">
                    Most Popular
                  </div>
                )}
                <p
                  className={`text-xs font-semibold uppercase tracking-[0.2em] ${
                    p.highlighted ? "text-accent-blue" : "text-zinc-500"
                  }`}
                >
                  {p.name}
                </p>
                <p className="mt-4 text-3xl font-semibold tracking-tight text-neutral-100">
                  {p.price}
                  <span className="text-sm font-normal text-zinc-500">
                    {p.cadence}
                  </span>
                </p>
                <p className="mt-2 text-sm text-zinc-400">{p.desc}</p>
                <ul className="mt-6 space-y-3 border-t border-white/5 pt-6">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-zinc-300"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-accent-cyan" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <WhatsAppButton
                    serviceKey="general"
                    source={`pricing-${p.name.toLowerCase()}`}
                    label={p.name === "Enterprise" ? "Talk to Sales" : "Get Started"}
                    variant={p.highlighted ? "primary" : "ghost"}
                    fullWidth
                  />
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* FAQ */}
        <Section id="faq" eyebrow="08 — Answers" title="Frequently asked" desc="Everything operators ask before signing.">
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/5 bg-surface p-2 sm:p-4">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border-white/5 px-3 last:border-b-0"
                >
                  <AccordionTrigger className="text-left text-sm font-medium text-neutral-100 hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-zinc-400">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Section>

        {/* Contact — WhatsApp first */}
        <Section id="contact" eyebrow="09 — Talk to us" title="Chat with us on WhatsApp" desc="Skip the forms. One tap opens a real conversation with our team.">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div className="relative overflow-hidden rounded-3xl border border-[#25D366]/20 bg-surface p-8 sm:p-10">
              <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-[#25D366]/10 blur-3xl" />
              <div className="relative">
                <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-[#25D366]/15 text-[#25D366]">
                  <MessageCircle className="size-6" />
                </div>
                <h3 className="mt-5 text-2xl sm:text-3xl font-semibold tracking-tight">
                  Start the conversation
                </h3>
                <p className="mt-3 max-w-[52ch] text-sm text-zinc-400">
                  We reply within minutes on WhatsApp. Send us a quick note about
                  your business — we'll come back with a tailored plan.
                </p>
                <div className="mt-6">
                  <WhatsAppButton
                    serviceKey="general"
                    source="contact-primary"
                    label={`Chat on WhatsApp · ${WHATSAPP_DISPLAY}`}
                    variant="primary"
                    showReplyNote
                  />
                </div>

                <div className="mt-10 border-t border-white/5 pt-8">
                  <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-zinc-500">
                    Or pick a service to pre-fill your message
                  </p>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {services.map((s) => (
                      <a
                        key={s.key}
                        href={buildWhatsAppUrl(s.key)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackWhatsAppClick(`contact-${s.key}`, s.key)}
                        className="group flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:border-[#25D366]/40 hover:bg-white/[0.04]"
                      >
                        <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${s.bg} ${s.color}`}>
                          <s.icon className="size-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-medium text-neutral-100">
                            {s.title}
                          </div>
                          <div className="text-[11px] text-zinc-500">
                            Pre-filled brief · one tap
                          </div>
                        </div>
                        <ArrowRight className="size-4 text-zinc-500 transition-transform group-hover:translate-x-0.5 group-hover:text-[#25D366]" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {[
                { icon: MessageCircle, label: "WhatsApp", value: WHATSAPP_DISPLAY, href: buildWhatsAppUrl("general"), track: "contact-tile-whatsapp" },
                { icon: PhoneIcon, label: "Phone", value: WHATSAPP_DISPLAY, href: "tel:+919491071248", track: "contact-tile-phone" },
                { icon: Mail, label: "Email", value: "hello@visionary-ai.co", href: "mailto:hello@visionary-ai.co", track: "contact-tile-email" },
                { icon: MapPin, label: "Availability", value: "Mon–Sat · Replies in minutes", href: buildWhatsAppUrl("general"), track: "contact-tile-availability" },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  onClick={() => {
                    if (c.href.includes("wa.me")) trackWhatsAppClick(c.track, "general");
                  }}
                  className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-surface p-4 transition-colors hover:border-[#25D366]/30"
                >
                  <div className="flex size-10 items-center justify-center rounded-lg bg-white/5 text-[#25D366]">
                    <c.icon className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] uppercase tracking-widest text-zinc-500">
                      {c.label}
                    </div>
                    <div className="truncate text-sm text-neutral-100">
                      {c.value}
                    </div>
                  </div>
                  <ArrowRight className="size-4 text-zinc-500 transition-transform group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
          </div>
        </Section>

        {/* Final CTA */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900 via-canvas to-canvas p-10 sm:p-16 text-center">
            <div className="pointer-events-none absolute" />
            <h2 className="text-balance text-3xl sm:text-5xl font-semibold tracking-tight">
              Ready to automate?
            </h2>
            <p className="mx-auto mt-6 max-w-[46ch] text-pretty text-zinc-400">
              Join 120+ industry leaders redefining operations with Visionary AI.
            </p>
            <div className="mt-10 flex flex-col items-center gap-3">
              <WhatsAppButton
                serviceKey="general"
                source="final-cta"
                label="Book Your Free Consultation"
                variant="primary"
                showReplyNote
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2">
              <span className="inline-block size-5 rounded-full bg-gradient-to-tr from-accent-blue via-accent-purple to-accent-cyan" />
              <span className="text-sm font-semibold">Visionary AI Automations</span>
            </div>
            <p className="mt-4 text-sm text-zinc-500">
              Architecting the future of autonomous business operations.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <FooterCol
              title="Agency"
              links={[
                { l: "Services", h: "#services" },
                { l: "Portfolio", h: "#portfolio" },
                { l: "Pricing", h: "#pricing" },
                { l: "Contact", h: "#contact" },
              ]}
            />
            <FooterCol
              title="Company"
              links={[
                { l: "About", h: "#about" },
                { l: "FAQ", h: "#faq" },
                { l: "Industries", h: "#industries" },
              ]}
            />
            <FooterCol
              title="Legal"
              links={[
                { l: "Privacy", h: "/privacy" },
                { l: "Terms", h: "/terms" },
              ]}
            />
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-6xl items-center justify-between border-t border-white/5 pt-8">
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">
            © {new Date().getFullYear()} Visionary AI Automations
          </p>
          <div className="flex gap-3 text-[10px] uppercase tracking-widest text-zinc-600">
            <a href="#" className="hover:text-zinc-300">LinkedIn</a>
            <a href="#" className="hover:text-zinc-300">X</a>
            <a href="#" className="hover:text-zinc-300">YouTube</a>
          </div>
        </div>
      </footer>

      {/* Back to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-24 left-5 sm:bottom-6 sm:left-auto sm:right-24 z-[58] inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-canvas/80 text-neutral-200 backdrop-blur-md transition-transform hover:scale-105"
        >
          <ArrowUp className="size-4" />
        </button>
      )}

      <Toaster theme="dark" position="top-center" richColors />
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  desc,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-6 py-24 scroll-mt-24">
      <div className="mb-12 max-w-2xl">
        <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-accent-cyan">
          {eyebrow}
        </p>
        <h2 className="mt-4 text-balance text-3xl sm:text-4xl font-semibold tracking-tight">
          {title}
        </h2>
        <p className="mt-4 max-w-[56ch] text-pretty text-zinc-400">{desc}</p>
      </div>
      {children}
    </section>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { l: string; h: string }[];
}) {
  return (
    <div>
      <p className="text-xs font-semibold text-neutral-100">{title}</p>
      <ul className="mt-4 space-y-2">
        {links.map((it) => (
          <li key={it.l}>
            {it.h.startsWith("/") ? (
              <Link
                to={it.h}
                className="text-sm text-zinc-500 transition-colors hover:text-neutral-200"
              >
                {it.l}
              </Link>
            ) : (
              <a
                href={it.h}
                className="text-sm text-zinc-500 transition-colors hover:text-neutral-200"
              >
                {it.l}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
