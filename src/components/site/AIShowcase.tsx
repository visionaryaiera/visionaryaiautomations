import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Workflow,
  Bot,
  PhoneCall,
  Headset,
  Sparkles,
  Globe,
  LayoutTemplate,
  Video,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { WhatsAppButton } from "./WhatsAppButton";
import type { ServiceKey } from "@/lib/whatsapp";
import { getFormUrl, trackFormClick } from "@/lib/forms";

type Slide = {
  key: string;
  service: ServiceKey;
  eyebrow: string;
  title: string;
  desc: string;
  icon: typeof Workflow;
  accent: string; // tailwind color class prefix (blue|purple|cyan)
  visual: React.ReactNode;
};

function AutomationVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-canvas/80 p-5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(59,130,246,0.28),transparent_55%),radial-gradient(circle_at_80%_90%,rgba(168,85,247,0.25),transparent_55%)]" />
      <div className="relative grid h-full grid-cols-3 gap-3">
        {["Trigger", "Enrich", "Route", "Score", "Notify", "Sync"].map((n, i) => (
          <motion.div
            key={n}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
          >
            <div className="flex size-6 items-center justify-center rounded-md bg-accent-blue/15 text-[10px] font-bold text-accent-blue">
              {i + 1}
            </div>
            <div className="mt-2 text-[11px] font-medium text-neutral-100">{n}</div>
            <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${40 + i * 10}%` }}
                transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                className="h-full rounded-full bg-gradient-to-r from-accent-blue to-accent-cyan"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ChatVisual() {
  const msgs = [
    { me: false, t: "Hi! Book a table for 4 tonight?" },
    { me: true, t: "Sure — 7:30 PM at Marina works ✓" },
    { me: false, t: "Perfect. Any window seat?" },
    { me: true, t: "Reserved. Confirmation sent 📩" },
  ];
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-canvas/80 p-5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,197,94,0.18),transparent_60%)]" />
      <div className="relative flex h-full flex-col gap-2">
        {msgs.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.25 }}
            className={`max-w-[80%] rounded-2xl px-3 py-2 text-[11px] leading-snug ${
              m.me
                ? "self-end bg-[#25D366] text-white"
                : "self-start border border-white/10 bg-white/5 text-neutral-100"
            }`}
          >
            {m.t}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function VoiceVisual() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-canvas/80 p-5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.28),transparent_55%)]" />
      <div className="relative flex items-end gap-1.5">
        {Array.from({ length: 22 }).map((_, i) => (
          <motion.span
            key={i}
            animate={{ height: [8, 24 + (i % 5) * 8, 8] }}
            transition={{ duration: 1 + (i % 3) * 0.3, repeat: Infinity, delay: i * 0.05 }}
            className="w-1.5 rounded-full bg-gradient-to-t from-accent-purple to-accent-cyan"
          />
        ))}
      </div>
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-[10px] text-zinc-300 backdrop-blur">
        <span className="inline-flex items-center gap-2">
          <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
          Live · AI Receptionist
        </span>
        <span className="text-accent-cyan">00:42</span>
      </div>
    </div>
  );
}

function ReceptionistVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-canvas/80 p-5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(34,211,238,0.18),transparent_55%)]" />
      <div className="relative grid h-full grid-cols-2 gap-3">
        {[
          { t: "09:00 · Dr. Kapoor consult", c: "text-accent-cyan" },
          { t: "10:30 · New patient intake", c: "text-accent-blue" },
          { t: "11:15 · Follow-up call", c: "text-accent-purple" },
          { t: "13:00 · Insurance verify", c: "text-emerald-400" },
        ].map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
          >
            <div className={`text-[10px] font-semibold uppercase tracking-widest ${it.c}`}>
              Booked
            </div>
            <div className="mt-1 text-[11px] text-neutral-100">{it.t}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AdminVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-canvas/80 p-5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.22),transparent_55%)]" />
      <div className="relative flex h-full flex-col gap-2">
        {["Invoice #4218 sent", "CRM synced · 34 leads", "Payroll drafted", "Report generated"].map(
          (t, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-[11px]"
            >
              <span className="text-neutral-100">{t}</span>
              <span className="text-[10px] font-semibold text-emerald-400">Done</span>
            </motion.div>
          )
        )}
      </div>
    </div>
  );
}

function WebsiteVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-canvas/80 p-4">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.2),transparent_60%)]" />
      <div className="relative flex h-full flex-col rounded-xl border border-white/10 bg-black/30">
        <div className="flex items-center gap-1.5 border-b border-white/5 px-3 py-2">
          <span className="size-2 rounded-full bg-red-400/70" />
          <span className="size-2 rounded-full bg-amber-400/70" />
          <span className="size-2 rounded-full bg-emerald-400/70" />
        </div>
        <div className="grid flex-1 grid-cols-3 gap-2 p-3">
          <div className="col-span-2 rounded-lg bg-gradient-to-br from-accent-blue/30 to-accent-purple/20" />
          <div className="flex flex-col gap-2">
            <div className="h-2 rounded bg-white/10" />
            <div className="h-2 w-3/4 rounded bg-white/10" />
            <div className="mt-auto h-6 rounded-full bg-accent-blue/70" />
          </div>
          <div className="col-span-3 grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="aspect-[4/3] rounded-lg border border-white/10 bg-white/[0.03]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LandingVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-canvas/80 p-5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(34,211,238,0.22),transparent_55%)]" />
      <div className="relative flex h-full flex-col items-center justify-center gap-3 text-center">
        <div className="h-2 w-24 rounded bg-white/20" />
        <div className="h-3 w-40 rounded bg-white/30" />
        <div className="h-2 w-32 rounded bg-white/10" />
        <motion.div
          animate={{ boxShadow: ["0 0 0px rgba(59,130,246,0)", "0 0 40px rgba(59,130,246,0.6)", "0 0 0px rgba(59,130,246,0)"] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          className="mt-2 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple px-5 py-2 text-[11px] font-semibold text-white"
        >
          Get Started →
        </motion.div>
        <div className="mt-4 grid w-full grid-cols-3 gap-2">
          {["+312%", "9.4×", "0.8s"].map((v) => (
            <div key={v} className="rounded-lg border border-white/10 bg-white/[0.02] p-2 text-[10px]">
              <div className="text-accent-cyan">{v}</div>
              <div className="text-zinc-500">lift</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VideoAdVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-canvas/80 p-4">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.28),transparent_60%)]" />
      <div className="relative flex h-full items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="relative aspect-video w-full max-w-md overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-accent-purple/40 via-accent-blue/30 to-black"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_60%)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-white/90 text-black backdrop-blur">
              <span className="ml-1 border-y-8 border-l-[14px] border-y-transparent border-l-black" />
            </div>
          </div>
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] text-white/80">
            <span>Brand · 00:00</span>
            <span>4K · CGI</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const SLIDES: Slide[] = [
  {
    key: "automation",
    service: "ai-automation",
    eyebrow: "AI Automation",
    title: "Workflows that run your business at 3 AM.",
    desc: "n8n orchestration, CRM sync, lead routing, and API glue — every process, autonomous.",
    icon: Workflow,
    accent: "blue",
    visual: <AutomationVisual />,
  },
  {
    key: "chatbot",
    service: "whatsapp-chatbot",
    eyebrow: "WhatsApp Chatbots",
    title: "Book, sell, and support — all in WhatsApp.",
    desc: "Conversational commerce that closes at midnight and speaks 30+ languages.",
    icon: Bot,
    accent: "cyan",
    visual: <ChatVisual />,
  },
  {
    key: "voice",
    service: "voice-agent",
    eyebrow: "AI Voice Agents",
    title: "Human-like voice, machine-scale patience.",
    desc: "Inbound receptionists, outbound sales callers, follow-ups — 24/7, zero missed calls.",
    icon: PhoneCall,
    accent: "purple",
    visual: <VoiceVisual />,
  },
  {
    key: "receptionist",
    service: "voice-agent",
    eyebrow: "AI Receptionist",
    title: "Your front desk, now infinite.",
    desc: "Answers, books, verifies, and routes — indistinguishable from your best receptionist.",
    icon: Headset,
    accent: "cyan",
    visual: <ReceptionistVisual />,
  },
  {
    key: "admin",
    service: "ai-automation",
    eyebrow: "Administrative AI",
    title: "Back-office on autopilot.",
    desc: "Invoices, CRM hygiene, reports, and reminders — done before your team logs in.",
    icon: Sparkles,
    accent: "blue",
    visual: <AdminVisual />,
  },
  {
    key: "website",
    service: "website",
    eyebrow: "AI Business Websites",
    title: "Sites engineered to convert.",
    desc: "SEO-first, fast, and stunning — with AI baked into every touchpoint.",
    icon: Globe,
    accent: "blue",
    visual: <WebsiteVisual />,
  },
  {
    key: "landing",
    service: "website",
    eyebrow: "Landing Pages",
    title: "One-page conversion machines.",
    desc: "Purpose-built for launches, ads, and campaigns — with sub-second LCP.",
    icon: LayoutTemplate,
    accent: "cyan",
    visual: <LandingVisual />,
  },
  {
    key: "video-ads",
    service: "video-ads",
    eyebrow: "AI Video Ads",
    title: "Cinema-grade ads at internet speed.",
    desc: "CGI, UGC, product spots, and motion graphics — engineered to scroll-stop.",
    icon: Video,
    accent: "purple",
    visual: <VideoAdVisual />,
  },
];

export function AIShowcase() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % SLIDES.length), 6000);
    return () => clearInterval(id);
  }, []);

  const slide = SLIDES[active];
  const next = () => setActive((a) => (a + 1) % SLIDES.length);
  const prev = () => setActive((a) => (a - 1 + SLIDES.length) % SLIDES.length);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface">
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-accent-blue/15 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-32 right-0 -z-10 h-[420px] w-[420px] rounded-full bg-accent-purple/15 blur-[120px]" />

      <div className="grid gap-0 lg:grid-cols-[1.1fr_1fr]">
        {/* Left: copy */}
        <div className="relative p-6 sm:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={`inline-flex items-center gap-2 rounded-full border border-accent-${slide.accent}/30 bg-accent-${slide.accent}/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-accent-${slide.accent}`}>
                <slide.icon className="size-3" />
                {slide.eyebrow}
              </div>
              <h3 className="mt-5 text-balance text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-neutral-100">
                {slide.title}
              </h3>
              <p className="mt-4 max-w-[46ch] text-sm sm:text-base text-zinc-400">
                {slide.desc}
              </p>

              <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <WhatsAppButton
                  serviceKey={slide.service}
                  source={`showcase-${slide.key}`}
                  label="Get Free Consultation"
                  variant="primary"
                />
                <a
                  href={getFormUrl(slide.service)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackFormClick(`showcase-${slide.key}`, slide.service)}
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-neutral-100 backdrop-blur-md transition-colors hover:bg-white/10"
                >
                  <ExternalLink className="size-4" />
                  Submit Requirements
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="mt-10 flex items-center gap-3">
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="inline-flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-200 hover:bg-white/10"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="inline-flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-200 hover:bg-white/10"
            >
              <ChevronRight className="size-4" />
            </button>
            <div className="ml-2 flex flex-wrap gap-1.5">
              {SLIDES.map((s, i) => (
                <button
                  key={s.key}
                  onClick={() => setActive(i)}
                  aria-label={`Go to ${s.eyebrow}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === active
                      ? "w-8 bg-gradient-to-r from-accent-blue to-accent-purple"
                      : "w-3 bg-white/15 hover:bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right: visual */}
        <div className="relative min-h-[360px] p-6 sm:p-8 lg:min-h-[520px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.key + "-v"}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="h-full min-h-[320px]"
            >
              {slide.visual}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}