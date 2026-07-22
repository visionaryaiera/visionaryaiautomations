import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowLeft, Check, Sparkles } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WhatsAppButton } from "./WhatsAppButton";
import { getFormUrl, trackFormClick } from "@/lib/forms";
import type { ServiceMeta } from "@/lib/services";

const accentClasses: Record<string, { text: string; bg: string; ring: string; grad: string }> = {
  blue: {
    text: "text-accent-blue",
    bg: "bg-accent-blue/10",
    ring: "ring-accent-blue/30",
    grad: "from-accent-blue/20 to-transparent",
  },
  cyan: {
    text: "text-accent-cyan",
    bg: "bg-accent-cyan/10",
    ring: "ring-accent-cyan/30",
    grad: "from-accent-cyan/20 to-transparent",
  },
  purple: {
    text: "text-accent-purple",
    bg: "bg-accent-purple/10",
    ring: "ring-accent-purple/30",
    grad: "from-accent-purple/20 to-transparent",
  },
};

function trackServiceView(slug: string) {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", "service_view", {
      event_category: "engagement",
      service: slug,
    });
  } catch { /* no-op */ }
  try {
    window.fbq?.("trackCustom", "ServiceView", { service: slug });
  } catch { /* no-op */ }
}

export function ServicePage({ service }: { service: ServiceMeta }) {
  const accent = accentClasses[service.accent] ?? accentClasses.blue;
  const Icon = service.icon;
  const formUrl = getFormUrl(service.key);

  useEffect(() => {
    trackServiceView(service.slug);
  }, [service.slug]);

  const ctaRow = (
    <div className="flex flex-col items-start gap-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <WhatsAppButton
          serviceKey={service.key}
          source={`service-page-${service.slug}`}
          label="Book Free Consultation"
          variant="primary"
        />
        <a
          href={formUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackFormClick(`service-page-${service.slug}`, service.key)}
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
  );

  return (
    <div className="min-h-screen bg-canvas text-neutral-100 antialiased">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-canvas/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-200 hover:text-white"
          >
            <span className="inline-flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple">
              <Sparkles className="size-3.5 text-white" />
            </span>
            Visionary AI
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white"
          >
            <ArrowLeft className="size-3.5" />
            Back to home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className={`pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-radial ${accent.grad} blur-3xl opacity-70`} />
        <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-20 sm:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className={`inline-flex items-center gap-2 rounded-full ${accent.bg} ${accent.text} px-3 py-1.5 text-xs font-medium ring-1 ${accent.ring}`}>
              <Icon className="size-3.5" />
              {service.hero.kicker}
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {service.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              {service.hero.subtitle}
            </p>
            <div className="mt-8">{ctaRow}</div>
          </motion.div>

          {/* Interactive mock */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-14 rounded-3xl border border-white/10 bg-surface/80 p-2 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.6)] backdrop-blur"
          >
            <ServiceMock service={service} />
          </motion.div>
        </div>
      </section>

      {/* Results strip */}
      <section className="border-y border-white/5 bg-surface/40">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 py-10 sm:grid-cols-3">
          {service.results.map((r) => (
            <div key={r.label} className="text-center sm:text-left">
              <div className={`text-3xl font-semibold ${accent.text} sm:text-4xl`}>{r.value}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-zinc-500">{r.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-widest text-zinc-500">How it works</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            From brief to live in weeks.
          </h2>
          <p className="mt-3 text-sm text-zinc-400">
            A proven, low-risk delivery process refined across dozens of deployments.
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {service.workflow.map((w) => (
            <div
              key={w.step}
              className="rounded-2xl border border-white/5 bg-surface p-6 transition-colors hover:border-white/10"
            >
              <div className={`text-xs font-mono ${accent.text}`}>{w.step}</div>
              <div className="mt-3 text-base font-semibold text-white">{w.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits + Features */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <div className="text-xs uppercase tracking-widest text-zinc-500">Business benefits</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Built for outcomes, not vanity metrics.
            </h2>
            <div className="mt-8 space-y-5">
              {service.benefits.map((b) => (
                <div key={b.title} className="flex gap-4">
                  <div className={`mt-1 flex size-8 shrink-0 items-center justify-center rounded-full ${accent.bg} ${accent.text}`}>
                    <Check className="size-4" />
                  </div>
                  <div>
                    <div className="text-base font-semibold text-white">{b.title}</div>
                    <div className="mt-1 text-sm text-zinc-400">{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-zinc-500">What you get</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Every feature, out of the box.
            </h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {service.features.map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-2 rounded-xl border border-white/5 bg-surface/60 px-3 py-3 text-sm text-zinc-200"
                >
                  <Check className={`size-4 ${accent.text}`} />
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <div className="text-center">
          <div className="text-xs uppercase tracking-widest text-zinc-500">FAQ</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Answers before you ask.
          </h2>
        </div>
        <Accordion type="single" collapsible className="mt-10 space-y-3">
          {service.faq.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="rounded-2xl border border-white/5 bg-surface px-5"
            >
              <AccordionTrigger className="text-left text-sm font-medium text-neutral-100 hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-zinc-400">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden border-t border-white/5">
        <div className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${accent.grad} opacity-40`} />
        <div className="relative mx-auto max-w-4xl px-6 py-20 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Ready to launch your {service.name.toLowerCase()}?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-zinc-400 sm:text-base">
            Chat with us on WhatsApp or send your requirements — we'll reply within minutes.
          </p>
          <div className="mt-8 flex justify-center">{ctaRow}</div>
        </div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Service-specific animated mock                                             */
/* -------------------------------------------------------------------------- */

function ServiceMock({ service }: { service: ServiceMeta }) {
  switch (service.key) {
    case "ai-automation":
      return <AutomationMock />;
    case "whatsapp-chatbot":
      return <ChatbotMock />;
    case "voice-agent":
      return <VoiceMock />;
    case "website":
      return <WebsiteMock />;
    case "video-ads":
      return <VideoAdsMock />;
    default:
      return null;
  }
}

function MockShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-[#0a0a0a] ring-1 ring-white/5">
      <div className="flex items-center gap-1.5 border-b border-white/5 px-4 py-3">
        <span className="size-2.5 rounded-full bg-red-500/70" />
        <span className="size-2.5 rounded-full bg-yellow-500/70" />
        <span className="size-2.5 rounded-full bg-green-500/70" />
        <span className="ml-3 text-xs text-zinc-500">{title}</span>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function AutomationMock() {
  const nodes = ["Lead form", "AI Qualifier", "CRM sync", "WhatsApp", "Slack alert"];
  return (
    <MockShell title="n8n workflow — Lead Automation">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {nodes.map((n, i) => (
          <div key={n} className="flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.15, duration: 0.4 }}
              className="rounded-xl border border-accent-blue/30 bg-accent-blue/10 px-4 py-2.5 text-xs font-medium text-accent-blue"
            >
              {n}
            </motion.div>
            {i < nodes.length - 1 && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: i * 0.15 + 0.1, duration: 0.3 }}
                className="h-px w-6 origin-left bg-accent-blue/40"
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          { l: "Leads processed", v: "1,284" },
          { l: "Response time", v: "22s" },
          { l: "Success rate", v: "98.4%" },
        ].map((s) => (
          <div key={s.l} className="rounded-lg border border-white/5 bg-white/5 p-3">
            <div className="text-lg font-semibold text-white">{s.v}</div>
            <div className="text-[10px] uppercase tracking-widest text-zinc-500">{s.l}</div>
          </div>
        ))}
      </div>
    </MockShell>
  );
}

function ChatbotMock() {
  const messages: { from: "bot" | "user"; text: string }[] = [
    { from: "user", text: "Hi, do you have appointments today?" },
    { from: "bot", text: "Yes! I have 3:00 PM or 5:30 PM open. Which works?" },
    { from: "user", text: "5:30 PM please" },
    { from: "bot", text: "Booked ✅ Reminder sent. Anything else?" },
  ];
  return (
    <MockShell title="WhatsApp — Live Chat">
      <div className="mx-auto max-w-md space-y-2">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.3, duration: 0.3 }}
            className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                m.from === "user"
                  ? "bg-[#25D366] text-white"
                  : "bg-white/10 text-neutral-100"
              }`}
            >
              {m.text}
            </div>
          </motion.div>
        ))}
      </div>
    </MockShell>
  );
}

function VoiceMock() {
  return (
    <MockShell title="AI Voice Agent — Live Call">
      <div className="flex flex-col items-center gap-6 py-6">
        <div className="relative flex size-24 items-center justify-center rounded-full bg-accent-purple/20 ring-1 ring-accent-purple/40">
          <span className="absolute inset-0 animate-ping rounded-full bg-accent-purple/30" />
          <span className="text-2xl">📞</span>
        </div>
        <div className="flex items-end gap-1.5">
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.span
              key={i}
              animate={{ height: ["8px", `${12 + Math.random() * 30}px`, "8px"] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.05,
                ease: "easeInOut",
              }}
              className="w-1 rounded-full bg-accent-purple"
            />
          ))}
        </div>
        <div className="text-center">
          <div className="text-sm font-medium text-white">Speaking with Priya</div>
          <div className="text-xs text-zinc-500">Inbound reception · 00:47</div>
        </div>
      </div>
    </MockShell>
  );
}

function WebsiteMock() {
  return (
    <MockShell title="visionary-client.com">
      <div className="grid gap-3 md:grid-cols-3">
        <div className="md:col-span-2 rounded-xl bg-gradient-to-br from-accent-blue/30 to-accent-purple/20 p-6">
          <div className="h-2 w-24 rounded-full bg-white/40" />
          <div className="mt-4 h-8 w-3/4 rounded-lg bg-white/70" />
          <div className="mt-2 h-3 w-full rounded-full bg-white/20" />
          <div className="mt-2 h-3 w-5/6 rounded-full bg-white/20" />
          <div className="mt-6 flex gap-2">
            <div className="h-9 w-32 rounded-full bg-white" />
            <div className="h-9 w-24 rounded-full bg-white/20" />
          </div>
        </div>
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="rounded-xl border border-white/5 bg-white/5 p-4"
            >
              <div className="h-3 w-16 rounded-full bg-accent-blue/50" />
              <div className="mt-2 h-4 w-full rounded-full bg-white/20" />
              <div className="mt-1 h-3 w-2/3 rounded-full bg-white/10" />
            </motion.div>
          ))}
        </div>
      </div>
    </MockShell>
  );
}

function VideoAdsMock() {
  return (
    <MockShell title="Ad variants — Meta / YouTube / TikTok">
      <div className="grid gap-3 sm:grid-cols-3">
        {["9:16", "1:1", "16:9"].map((r, i) => (
          <motion.div
            key={r}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-accent-purple/30 via-accent-blue/20 to-accent-cyan/20 p-4"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.15),transparent_60%)]" />
            <div className="relative flex h-full flex-col justify-between">
              <div className="text-[10px] font-mono uppercase tracking-widest text-white/70">
                {r}
              </div>
              <div>
                <div className="h-2 w-16 rounded-full bg-white/50" />
                <div className="mt-2 h-3 w-24 rounded-full bg-white/80" />
              </div>
            </div>
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />
          </motion.div>
        ))}
      </div>
    </MockShell>
  );
}