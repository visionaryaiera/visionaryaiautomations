import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, ArrowRight, MessageCircle } from "lucide-react";
import { z } from "zod";
import {
  WHATSAPP_BASE,
  trackWhatsAppClick,
  type ServiceKey,
} from "@/lib/whatsapp";
import { getServiceByKey, SERVICES } from "@/lib/services";

const searchSchema = z.object({
  service: z.string().optional(),
  business: z.string().optional(),
  ref: z.string().optional(),
});

export const Route = createFileRoute("/thank-you")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Thank you — Visionary AI Automations" },
      { name: "description", content: "Your request has been received. We'll reply on WhatsApp within minutes." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ThankYouPage,
});

function generateRef() {
  const t = Date.now().toString(36).toUpperCase();
  const r = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `VAI-${t}-${r}`;
}

function ThankYouPage() {
  const { service, business, ref } = useSearch({ from: "/thank-you" });
  const [countdown, setCountdown] = useState(5);

  const meta = useMemo(() => {
    const key = (service as ServiceKey) ?? "general";
    return getServiceByKey(key);
  }, [service]);

  const referenceId = useMemo(() => ref || generateRef(), [ref]);
  const serviceName = meta?.name ?? "General enquiry";

  const whatsappUrl = useMemo(() => {
    const text = `Hello Visionary AI Automations,

Thank you — I just submitted my requirements form.

Service: ${serviceName}
Business Name: ${business ?? ""}
Reference ID: ${referenceId}

Please confirm receipt and next steps.`;
    return `${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`;
  }, [serviceName, business, referenceId]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.gtag?.("event", "form_submit", {
        event_category: "conversion",
        service: service ?? "general",
        ref: referenceId,
      });
    } catch { /* no-op */ }
    try {
      window.fbq?.("track", "Lead", { service: service ?? "general", ref: referenceId });
    } catch { /* no-op */ }
  }, [service, referenceId]);

  useEffect(() => {
    if (countdown <= 0) {
      trackWhatsAppClick("thank-you-auto", (service as ServiceKey) ?? "general");
      window.location.href = whatsappUrl;
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown, whatsappUrl, service]);

  return (
    <div className="min-h-screen bg-canvas px-6 py-16 text-neutral-100">
      <div className="mx-auto max-w-xl">
        <div className="rounded-3xl border border-white/10 bg-surface/70 p-8 text-center shadow-[0_40px_120px_-30px_rgba(37,211,102,0.4)] backdrop-blur">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#25D366]/15 ring-1 ring-[#25D366]/40">
            <CheckCircle2 className="size-8 text-[#25D366]" />
          </div>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white">
            Thank you.
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Your request has been received.
          </p>

          <div className="mt-8 space-y-2 rounded-2xl border border-white/5 bg-white/5 p-5 text-left text-sm">
            <Row label="Service" value={serviceName} />
            {business ? <Row label="Business" value={business} /> : null}
            <Row label="Reference ID" value={referenceId} mono />
          </div>

          <p className="mt-6 text-xs text-zinc-500">
            Redirecting you to WhatsApp in {countdown}s…
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("thank-you-manual", (service as ServiceKey) ?? "general")}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#20BF5B]"
          >
            <MessageCircle className="size-4" />
            Continue on WhatsApp
            <ArrowRight className="size-4" />
          </a>

          <Link
            to="/"
            className="mt-3 inline-block text-xs text-zinc-500 hover:text-zinc-300"
          >
            Back to home
          </Link>
        </div>

        {SERVICES.length > 0 ? (
          <div className="mt-8 text-center text-xs text-zinc-600">
            Reference ID <span className="font-mono text-zinc-400">{referenceId}</span> — please keep this for your records.
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs uppercase tracking-widest text-zinc-500">{label}</span>
      <span className={`text-right text-sm text-white ${mono ? "font-mono" : ""}`}>{value}</span>
    </div>
  );
}