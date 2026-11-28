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
  Rocket,
  Award,
  Clock,
  BadgeCheck,
  Cpu,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Toaster, toast } from "sonner";
import heroDashboard from "@/assets/hero-dashboard.jpg";
import { WhatsAppButton } from "./WhatsAppButton";
import { WHATSAPP_DISPLAY, buildWhatsAppUrl, trackWhatsAppClick, type ServiceKey } from "@/lib/whatsapp";
import { getFormUrl, trackFormClick } from "@/lib/forms";
import { AIShowcase } from "./AIShowcase";
import { Pricing } from "./Pricing";
import { getServiceByKey } from "@/lib/services";
import { ServiceVisual } from "./ServiceVisual";

const nav = [
  { label: "Services", href: "#services" },
  { label: "Showcase", href: "#showcase" },
  { label: "Industries", href: "#industries" },
  { label: "Use cases", href: "#portfolio" },
  { label: "Pricing", href: "#pricing" },
  { label: "Free Trial", href: "/trial" },
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
  { icon: Lock, title: "Secure by design", desc: "Official WhatsApp API, encrypted data, delete-on-request." },
  { icon: Scaling, title: "Scalable Solutions", desc: "Built to grow with your business." },
  { icon: Headset, title: "Dedicated Support", desc: "A team on call, not a ticket queue." },
  { icon: ShieldCheck, title: "Latest AI Tech", desc: "GPT-5, Claude, Gemini — always current." },
];

const process = [
  "Lead",
  "WhatsApp",
  "AI Agent",
  "CRM",
  "Follow-up",
  "Booking",
  "Payment",
  "Success",
];

const industries = [
  { icon: Stethoscope, label: "Dental Clinics & Hospitals", problem: "Missed calls and no-shows drain revenue.", solution: "AI receptionist books, reminds, and follows up 24/7.", benefit: "Full appointment book, zero missed calls." },
  { icon: Building2, label: "Real Estate", problem: "Slow lead response kills conversion.", solution: "WhatsApp AI qualifies buyers in seconds.", benefit: "More site visits, faster closings." },
  { icon: GraduationCap, label: "Education", problem: "Admissions teams overwhelmed by enquiries.", solution: "Automated funnels handle enquiry → counseling → enrollment.", benefit: "Higher enrollment, lower cost per lead." },
  { icon: UtensilsCrossed, label: "Restaurants", problem: "Manual bookings and repeat-order chaos.", solution: "WhatsApp bot for reservations, menus, and reorders.", benefit: "More covers, loyal regulars." },
  { icon: ShoppingBag, label: "Retail Stores", problem: "Walk-ins fluctuate, WhatsApp catalogs go stale.", solution: "AI catalog + reorder assistant on WhatsApp.", benefit: "Higher AOV, sticky customers." },
  { icon: Briefcase, label: "Service Businesses", problem: "Leads leak between calls, chats, and CRM.", solution: "Unified AI flow captures every enquiry end-to-end.", benefit: "Predictable pipeline, no lost leads." },
  { icon: ShoppingCart, label: "Local Businesses & SMEs", problem: "Too small to hire a full sales & support team.", solution: "AI runs first-line sales, support, and follow-ups.", benefit: "Enterprise capability at SME cost." },
];

const portfolio = [
  { tag: "Clinic", title: "AI front desk on WhatsApp", metric: "Answers fees & timings, books appointments, sends reminders" },
  { tag: "Real estate", title: "Lead qualifier for Meta ads", metric: "Asks budget, BHK & timeline; books site visits; routes hot buyers" },
  { tag: "Coaching", title: "Admissions assistant", metric: "Course & fee answers, demo-class booking, parent follow-ups" },
  { tag: "Voice agent", title: "Instant lead call-back", metric: "Calls new leads in under 2 minutes in Telugu or English" },
  { tag: "Website", title: "Mobile-first site with AI chat", metric: "Local SEO, WhatsApp button, enquiries straight to CRM" },
  { tag: "Video ads", title: "Telugu AI video ads", metric: "Reels & Shorts variants for A/B testing, delivered in 5 days" },
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
  "Cloudflare",
  "Razorpay",
];

const faqs = [
  {
    q: "How fast can you deliver a project?",
    a: "Your free 3-day trial is ready in minutes. WhatsApp AI agents and websites go live in 7–14 days; voice agents and custom workflows in 2–4 weeks.",
  },
  {
    q: "Do you work with businesses outside Hyderabad?",
    a: "Yes — we work remotely with businesses across India and abroad over WhatsApp and video calls. Our AI replies in Telugu, English and Hindi (other languages on request).",
  },
  {
    q: "Which AI models do you use?",
    a: "We use leading AI models (Google Gemini, Anthropic Claude, OpenAI) and pick the best fit for speed, quality and cost.",
  },
  {
    q: "Do you handle hosting and maintenance?",
    a: "Yes. Hosting, monitoring and updates are included in your monthly support plan. Pro clients get priority support.",
  },
  {
    q: "Is my data secure?",
    a: "Your data is encrypted in transit, used only to run your assistant, never sold, and deleted on request (see our privacy policy).",
  },
  {
    q: "Can you integrate with our existing CRM/tools?",
    a: "Yes — Google Sheets, Zoho, HubSpot, Google Workspace and most tools with an API, via n8n or direct integrations.",
  },
  {
    q: "What if I don't know what to automate yet?",
    a: "That's what the free strategy call is for. We map your workflows and identify the top 3 highest-ROI automations.",
  },
  {
    q: "How do payments work?",
    a: "One-time setup paid upfront (UPI or bank transfer), then a small monthly plan, billed monthly or yearly. No lock-in. Invoice provided.",
  },
];

export default function Landing() {
  const [scrolled, setScrolled] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);
  const [exitShown, setExitShown] = useState(false);
  const [lead, setLead] = useState({ name: "", business: "", phone: "", service: "general" as ServiceKey });

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

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onLeave = (e: MouseEvent) => {
      if (exitShown) return;
      if (e.clientY <= 0) {
        setExitOpen(true);
        setExitShown(true);
      }
    };
    document.addEventListener("mouseleave", onLeave);
    return () => document.removeEventListener("mouseleave", onLeave);
  }, [exitShown]);

  const submitLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lead.name || !lead.phone) {
      toast.error("Please add your name and phone.");
      return;
    }
    const msg = `Hello Visionary AI Automations,\n\nI'd like a free consultation.\n\nName: ${lead.name}\nBusiness: ${lead.business}\nPhone: ${lead.phone}\nService: ${lead.service}`;
    const url = `https://wa.me/919491071248?text=${encodeURIComponent(msg)}`;
    trackWhatsAppClick("lead-form", lead.service);
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success("Opening WhatsApp — we reply within minutes.");
  };

  return (
    <div className="min-h-screen bg-canvas text-neutral-100 font-sans antialiased selection:bg-accent-blue/40">
      {/* Ambient particles */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(37,99,235,0.15),transparent_50%),radial-gradient(circle_at_80%_60%,rgba(56,189,248,0.10),transparent_50%)]" />
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className="absolute size-1 rounded-full bg-accent-cyan/60 animate-twinkle"
            style={{
              top: `${(i * 37) % 100}%`,
              left: `${(i * 53) % 100}%`,
              animationDelay: `${(i % 8) * 0.5}s`,
            }}
          />
        ))}
      </div>
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
            <img src="/logo.png" alt="Visionary AI Automations" className="size-7 shrink-0 rounded-md object-cover ring-1 ring-white/10" />
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
          <Link
            to="/trial"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-1.5 text-xs font-semibold text-white ring-1 ring-[#25D366]/60 transition-transform hover:scale-[1.02] active:scale-95"
          >
            <MessageCircle className="size-3" />
            Free 3-day trial
          </Link>
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
                Hyderabad · Telugu · English · Hindi
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 text-balance text-center text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
            >
              Automate. Scale. Grow.{" "}
              <span className="bg-gradient-to-r from-accent-blue via-accent-electric to-accent-cyan bg-clip-text text-transparent">
                AI Solutions That Work 24/7 For Your Business.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-6 max-w-[52ch] text-pretty text-center text-base sm:text-lg text-zinc-400"
            >
              Your AI assistant replies to every WhatsApp, Instagram and website enquiry in seconds,
              books appointments and follows up — day and night. Try it free for 3 days, trained on your business.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-col items-center gap-4"
            >
              <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
                <Link
                  to="/trial"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white ring-1 ring-[#25D366]/60 transition hover:bg-[#20BF5B] sm:w-auto"
                >
                  Start 3-day free trial
                </Link>
                <WhatsAppButton
                  serviceKey="general"
                  source="hero-primary"
                  label="Chat on WhatsApp"
                  variant="ghost"
                />
                <a
                  href="#pricing"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-neutral-200 backdrop-blur-md transition-colors hover:bg-white/10 sm:w-auto"
                >
                  See pricing
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
                  decoding="async"
                  fetchPriority="high"
                  className="w-full"
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Trust Bar */}
        <section className="mx-auto max-w-6xl px-6 pb-8">
          <div className="grid grid-cols-2 gap-3 rounded-2xl border border-white/5 bg-surface/60 p-4 sm:grid-cols-5">
            {[
              { icon: Award, label: "100+ Projects" },
              { icon: Rocket, label: "Fast Delivery" },
              { icon: BadgeCheck, label: "Business Automation" },
              { icon: Cpu, label: "AI Powered" },
              { icon: Clock, label: "24/7 Support" },
            ].map((t) => (
              <div key={t.label} className="flex items-center gap-2.5 rounded-xl px-3 py-2">
                <span className="flex size-8 items-center justify-center rounded-lg bg-accent-blue/10 text-accent-cyan">
                  <t.icon className="size-4" />
                </span>
                <span className="text-xs sm:text-sm font-medium text-neutral-200">{t.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 20-second explainer video (loads only when played) */}
        <section className="mx-auto max-w-4xl px-6 pb-16">
          <p className="mb-2 text-center text-[10px] font-medium uppercase tracking-[0.25em] text-zinc-500">
            See it in 20 seconds
          </p>
          <h2 className="mb-6 text-center text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            From "Hi" to a booked appointment – automatically
          </h2>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface/60 shadow-2xl">
            <video
              className="block aspect-video w-full"
              controls
              playsInline
              preload="none"
              poster="/video/vai-promo-poster.jpg"
              aria-label="20-second video: how the Visionary AI WhatsApp assistant replies and books appointments"
            >
              <source src="/video/vai-promo.mp4" type="video/mp4" />
            </video>
          </div>
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
              { v: "~1.3s", l: "Average AI reply time" },
              { v: "24/7", l: "Always answering" },
              { v: "3", l: "Languages: Telugu · English · Hindi" },
              { v: "3 days", l: "Free trial, no card" },
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
          {/* Expanded capabilities strip */}
          <div className="mb-8 rounded-3xl border border-white/5 bg-surface/60 p-5 sm:p-6">
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-zinc-500">
              Full service stack
            </p>
            <div className="mt-4 grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "AI & Automation",
                  color: "text-accent-blue",
                  items: [
                    "AI Automation",
                    "WhatsApp Automation",
                    "AI Chatbots",
                    "AI Voice Agents",
                    "AI Calling Agents",
                    "CRM Automation",
                    "Workflow Automation",
                    "Lead Generation Systems",
                    "Business Automation",
                  ],
                },
                {
                  title: "Web Development",
                  color: "text-accent-cyan",
                  items: [
                    "Website Development",
                    "Landing Pages",
                    "E-Commerce Websites",
                    "WordPress Websites",
                  ],
                },
                {
                  title: "Performance Marketing",
                  color: "text-accent-purple",
                  items: [
                    "Google Ads",
                    "Facebook Ads",
                    "Instagram Ads",
                    "YouTube Ads",
                    "Video Ads",
                    "Voice Over Services",
                  ],
                },
              ].map((g) => (
                <div key={g.title}>
                  <h4 className={`text-sm font-semibold ${g.color}`}>{g.title}</h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {g.items.map((it) => (
                      <span
                        key={it}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-zinc-300"
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative overflow-hidden rounded-3xl border border-white/5 bg-surface p-8 transition-all duration-500 ${s.border} hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_rgba(37,99,235,0.35)]`}
              >
                {/* Animated gradient glow */}
                <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-accent-blue/10 blur-3xl transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-125" />
                <div className="pointer-events-none absolute -left-20 -bottom-20 size-64 rounded-full bg-accent-purple/10 blur-3xl transition-all duration-700 opacity-0 group-hover:opacity-100" />
                {/* Animated border sheen */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%)" }} />
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <div className={`flex size-12 items-center justify-center rounded-xl ${s.bg} ${s.color} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                      <s.icon className="size-5" />
                    </div>
                    <h3 className="mt-6 text-xl font-semibold tracking-tight text-neutral-100 transition-colors group-hover:text-white">
                      {s.title}
                    </h3>
                    <p className="mt-3 max-w-[56ch] text-sm leading-relaxed text-zinc-400">
                      {s.desc}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {s.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-zinc-300 transition-colors group-hover:border-white/20 group-hover:bg-white/10"
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
                        {getServiceByKey(s.key) ? (
                          <a
                            href={`/services/${getServiceByKey(s.key)!.slug}`}
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-neutral-100 backdrop-blur-md transition-all hover:border-accent-blue/40 hover:bg-white/10 hover:text-white"
                          >
                            Learn More
                            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                          </a>
                        ) : null}
                        <a
                          href={getFormUrl(s.key)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackFormClick(`service-${s.key}`, s.key)}
                          className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-3.5 text-sm font-semibold text-zinc-400 transition-colors hover:text-white"
                        >
                          Submit Requirements
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
                  <ServiceVisual slug={getServiceByKey(s.key)?.slug} />
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
          <ol className="relative grid gap-4 grid-cols-2 sm:grid-cols-4 lg:grid-cols-8">
            <div className="pointer-events-none absolute left-6 top-6 hidden h-px w-[calc(100%-3rem)] bg-gradient-to-r from-accent-blue/40 via-accent-purple/40 to-accent-cyan/40 lg:block" />
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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((it) => (
              <div
                key={it.label}
                className="group rounded-3xl border border-white/5 bg-surface p-6 transition-all hover:-translate-y-1 hover:border-accent-blue/40"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-accent-blue/10 text-accent-electric">
                  <it.icon className="size-5" />
                </div>
                <h3 className="mt-5 text-base font-semibold text-neutral-100">{it.label}</h3>
                <dl className="mt-4 space-y-3 text-xs">
                  <div>
                    <dt className="font-medium uppercase tracking-widest text-red-400/80">Problem</dt>
                    <dd className="mt-1 text-zinc-400">{it.problem}</dd>
                  </div>
                  <div>
                    <dt className="font-medium uppercase tracking-widest text-accent-cyan">Solution</dt>
                    <dd className="mt-1 text-zinc-400">{it.solution}</dd>
                  </div>
                  <div>
                    <dt className="font-medium uppercase tracking-widest text-emerald-400">Benefit</dt>
                    <dd className="mt-1 text-zinc-300">{it.benefit}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </Section>

        {/* Portfolio */}
        <Section id="portfolio" eyebrow="05 — Use cases" title="What we build" desc="Example setups for common businesses. Try any of them free for 3 days with your own details.">
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

        {/* Founding clients (no invented testimonials) */}
        <Section eyebrow="06 — Founding clients" title="Be one of our first 10 clients" desc="We're a new Hyderabad studio. Instead of stock testimonials, here's our promise to early clients.">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { t: "50% off setup", d: "Founding clients pay half the setup fee on any plan." },
              { t: "Try before you pay", d: "3-day free trial on our demo number, trained on your business." },
              { t: "30-day results guarantee", d: "Faster replies to your customers, or your first month is refunded." },
            ].map((x) => (
              <div key={x.t} className="rounded-3xl border border-white/5 bg-surface p-6">
                <Check className="size-5 text-[#25D366]" />
                <div className="mt-3 text-lg font-semibold text-neutral-100">{x.t}</div>
                <p className="mt-2 text-sm text-zinc-400">{x.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link to="/trial" className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#20BF5B]">Start free trial</Link>
            <a href="https://g.page/r/CU7YSR-bsjUJEBM/review" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-neutral-100 hover:bg-white/10">Read / leave a Google review</a>
          </div>
        </Section>

        {/* Premium AI Showcase */}
        <Section
          id="showcase"
          eyebrow="07 — Live Demo"
          title="A guided tour of Visionary intelligence"
          desc="An interactive slideshow through every capability — automation, chatbots, voice, receptionists, admin AI, websites, landing pages, and video ads."
        >
          <AIShowcase />
        </Section>

        {/* Pricing Preview */}
        <Section id="pricing" eyebrow="08 — Investment" title="Simple, transparent pricing" desc="One-time setup price shown upfront. A small monthly support & AI usage plan is tailored to your business and shared in your personalised quotation. Every plan starts with a 3-day free trial.">
          <Pricing />
        </Section>

        {/* FAQ */}
        <Section id="faq" eyebrow="09 — Answers" title="Frequently asked" desc="Everything operators ask before signing.">
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
                { icon: MapPin, label: "Office", value: "HMT Nagar, Nacharam, Hyderabad", href: "https://g.page/r/CU7YSR-bsjUJEBM", track: "contact-tile-office" },
                { icon: MessageCircle, label: "Availability", value: "AI 24/7 · Team Mon–Sat 7 AM–7 PM", href: buildWhatsAppUrl("general"), track: "contact-tile-availability" },
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
          {/* Lead capture */}
          <div className="mx-auto mb-16 max-w-4xl overflow-hidden rounded-3xl border border-accent-blue/20 bg-gradient-to-br from-accent-blue/10 via-surface to-surface p-8 sm:p-12">
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-accent-cyan">Lead Capture</p>
            <h2 className="mt-3 text-balance text-3xl sm:text-4xl font-semibold tracking-tight">
              Ready to automate your business?
            </h2>
            <p className="mt-3 max-w-[52ch] text-sm text-zinc-400">
              Share a few details — we'll open WhatsApp with your enquiry pre-filled and reply within minutes.
            </p>
            <form onSubmit={submitLead} className="mt-8 grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Your Name"
                value={lead.name}
                onChange={(e) => setLead({ ...lead, name: e.target.value })}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-neutral-100 outline-none placeholder:text-zinc-500 focus:border-accent-electric/60"
                required
              />
              <input
                type="text"
                placeholder="Business Name"
                value={lead.business}
                onChange={(e) => setLead({ ...lead, business: e.target.value })}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-neutral-100 outline-none placeholder:text-zinc-500 focus:border-accent-electric/60"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={lead.phone}
                onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-neutral-100 outline-none placeholder:text-zinc-500 focus:border-accent-electric/60"
                required
              />
              <select
                value={lead.service}
                onChange={(e) => setLead({ ...lead, service: e.target.value as ServiceKey })}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-neutral-100 outline-none focus:border-accent-electric/60"
              >
                <option value="general">Service required…</option>
                <option value="voice-agent">AI Voice Agent</option>
                <option value="whatsapp-chatbot">WhatsApp AI Chatbot</option>
                <option value="ai-automation">AI Automation</option>
                <option value="website">Business Website / Landing Page</option>
                <option value="video-ads">AI Video Ads</option>
              </select>
              <div className="sm:col-span-2 flex flex-col items-stretch gap-3 sm:flex-row">
                <button
                  type="submit"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#20BF5B]"
                >
                  <MessageCircle className="size-4" />
                  Book Free Consultation
                </button>
                <a
                  href={buildWhatsAppUrl("general")}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("lead-form-direct", "general")}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-neutral-100 hover:bg-white/10"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </form>
          </div>

          <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900 via-canvas to-canvas p-10 sm:p-16 text-center">
            <div className="pointer-events-none absolute" />
            <h2 className="text-balance text-3xl sm:text-5xl font-semibold tracking-tight">
              Ready to automate?
            </h2>
            <p className="mx-auto mt-6 max-w-[46ch] text-pretty text-zinc-400">
              Try your own AI assistant free for 3 days — trained on your business in minutes.
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
              <img src="/logo.png" alt="Visionary AI Automations" className="size-6 rounded-md object-cover ring-1 ring-white/10" />
              <span className="text-sm font-semibold">Visionary AI Automations</span>
            </div>
            <p className="mt-4 text-sm text-zinc-500">
              Architecting the future of autonomous business operations.
            </p>
            <address className="mt-4 text-sm not-italic leading-relaxed text-zinc-500">
              HMT Nagar, Nacharam, Hyderabad
              <br />
              <a href="tel:+919491071248" className="hover:text-zinc-300">+91 94910 71248</a>
            </address>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <FooterCol
              title="Agency"
              links={[
                { l: "Services", h: "#services" },
                { l: "Showcase", h: "#showcase" },
                { l: "Portfolio", h: "#portfolio" },
                { l: "Contact", h: "#contact" },
              ]}
            />
            <FooterCol
              title="Company"
              links={[
                { l: "About", h: "#about" },
                { l: "FAQ", h: "#faq" },
                { l: "Industries", h: "#industries" },
                { l: "AI for clinics", h: "/ai-chatbot-for-clinics-hyderabad" },
                { l: "AI for real estate", h: "/ai-chatbot-for-real-estate-hyderabad" },
                { l: "Free 3-day trial", h: "/trial" },
              ]}
            />
            <FooterCol
              title="Legal"
              links={[
                { l: "Terms", h: "/terms" },
                { l: "Privacy", h: "/privacy" },
              ]}
            />
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-6xl items-center justify-between border-t border-white/5 pt-8">
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">
            © {new Date().getFullYear()} Visionary AI Automations
          </p>
          <div className="flex gap-3 text-[10px] uppercase tracking-widest text-zinc-600">
            <a href="https://www.linkedin.com/company/145492277/" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300">LinkedIn</a>
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

      {/* Exit-intent popup */}
      {exitOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm animate-fade-up">
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-accent-blue/30 bg-surface p-8 shadow-2xl">
            <button
              onClick={() => setExitOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 inline-flex size-8 items-center justify-center rounded-full border border-white/10 text-zinc-400 hover:text-white"
            >
              <X className="size-4" />
            </button>
            <div className="pointer-events-none absolute -right-16 -top-16 size-52 rounded-full bg-accent-blue/20 blur-3xl" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-accent-cyan">
                Wait — before you go
              </span>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">Free 10-min AI call</h3>
              <p className="mt-3 text-sm text-zinc-400">
                We'll map your top 3 highest-ROI automations — no obligation, no pitch.
              </p>
              <div className="mt-6 flex flex-col gap-2">
                <WhatsAppButton
                  serviceKey="general"
                  source="exit-intent"
                  label="Claim My Free Call"
                  variant="primary"
                  fullWidth
                />
                <button
                  onClick={() => setExitOpen(false)}
                  className="text-xs text-zinc-500 hover:text-zinc-300"
                >
                  No thanks, I'll keep browsing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
