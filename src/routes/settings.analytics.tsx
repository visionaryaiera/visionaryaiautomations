import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import {
  getGa4Id,
  getMetaPixelId,
  setGa4Id,
  setMetaPixelId,
  loadAnalytics,
} from "@/lib/analytics";
import { trackWhatsAppClick } from "@/lib/whatsapp";

export const Route = createFileRoute("/settings/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics Settings — Visionary AI Automations" },
      { name: "description", content: "Configure GA4 and Meta Pixel IDs for WhatsApp click tracking." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AnalyticsSettings,
});

function AnalyticsSettings() {
  const [ga4, setGa4] = useState("");
  const [pixel, setPixel] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setGa4(getGa4Id());
    setPixel(getMetaPixelId());
    setReady(true);
  }, []);

  const save = () => {
    setGa4Id(ga4.trim());
    setMetaPixelId(pixel.trim());
    loadAnalytics();
    toast.success("Analytics IDs saved", {
      description: "GA4 and Meta Pixel are now tracking on this browser.",
    });
  };

  const testEvent = () => {
    trackWhatsAppClick("settings-test", "general");
    toast.success("Test event fired", {
      description: "Check GA4 DebugView and Meta Events Manager for whatsapp_click / WhatsAppClick.",
    });
  };

  const clear = () => {
    setGa4Id("");
    setMetaPixelId("");
    setGa4("");
    setPixel("");
    toast.message("Analytics IDs cleared");
  };

  const ga4Valid = ga4 === "" || /^G-[A-Z0-9]{4,}$/i.test(ga4.trim());
  const pixelValid = pixel === "" || /^\d{6,20}$/.test(pixel.trim());

  return (
    <main className="min-h-screen bg-canvas text-neutral-100 font-sans">
      <Toaster theme="dark" position="top-center" richColors />
      <div className="mx-auto max-w-2xl px-6 py-24">
        <Link to="/" className="text-xs uppercase tracking-widest text-accent-cyan">
          ← Back home
        </Link>
        <h1 className="mt-6 text-3xl sm:text-4xl font-semibold tracking-tight">
          Analytics settings
        </h1>
        <p className="mt-3 text-sm text-zinc-400">
          Enter your GA4 Measurement ID and Meta Pixel ID. WhatsApp click events
          (<code className="text-accent-cyan">whatsapp_click</code> in GA4,{" "}
          <code className="text-accent-cyan">WhatsAppClick</code> in Meta) will
          fire with <code>source</code> and <code>service</code> properties.
          Saved locally in your browser.
        </p>

        <div className="mt-10 space-y-6">
          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              GA4 Measurement ID
            </label>
            <input
              type="text"
              inputMode="text"
              autoComplete="off"
              placeholder="G-XXXXXXXXXX"
              value={ga4}
              onChange={(e) => setGa4(e.target.value)}
              disabled={!ready}
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-neutral-100 outline-none placeholder:text-zinc-600 focus:border-accent-cyan/60 focus:bg-white/10"
            />
            {!ga4Valid && (
              <p className="mt-1.5 text-xs text-red-400">
                Expected format: G-XXXXXXXXXX
              </p>
            )}
            <p className="mt-1.5 text-xs text-zinc-500">
              Google Analytics → Admin → Data streams → Web → Measurement ID.
            </p>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Meta Pixel ID
            </label>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="off"
              placeholder="1234567890123456"
              value={pixel}
              onChange={(e) => setPixel(e.target.value)}
              disabled={!ready}
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-neutral-100 outline-none placeholder:text-zinc-600 focus:border-accent-cyan/60 focus:bg-white/10"
            />
            {!pixelValid && (
              <p className="mt-1.5 text-xs text-red-400">
                Expected: numeric Pixel ID (6–20 digits).
              </p>
            )}
            <p className="mt-1.5 text-xs text-zinc-500">
              Meta Events Manager → Data sources → your pixel → Settings.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={save}
              disabled={!ga4Valid || !pixelValid}
              className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#20BF5B] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Save & activate
            </button>
            <button
              onClick={testEvent}
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-neutral-100 hover:bg-white/10"
            >
              Send test event
            </button>
            <button
              onClick={clear}
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-zinc-400 hover:text-red-400"
            >
              Clear
            </button>
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-xs text-zinc-400">
            <p className="font-semibold text-neutral-200">Current status</p>
            <ul className="mt-2 space-y-1">
              <li>
                GA4:{" "}
                <span className={getGa4Id() ? "text-emerald-400" : "text-zinc-500"}>
                  {getGa4Id() || "not configured"}
                </span>
              </li>
              <li>
                Meta Pixel:{" "}
                <span className={getMetaPixelId() ? "text-emerald-400" : "text-zinc-500"}>
                  {getMetaPixelId() || "not configured"}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
