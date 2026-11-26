import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, MessageCircle, Clock, Sparkles, ArrowLeft } from "lucide-react";

const API = "https://api.visionaryaiautomations.com/api/trial";

export const Route = createFileRoute("/trial")({
  head: () => ({
    meta: [
      { title: "Start your 3-day free AI trial — Visionary AI Automations" },
      {
        name: "description",
        content: "Try a WhatsApp AI assistant trained on your own business for 3 days, free. Replies in Telugu, English & Hindi, books appointments, 24/7.",
      },
    ],
  }),
  component: TrialPage,
});

type Result = { code: string; link: string; ends_at: string };

const FIELDS: { name: string; label: string; placeholder: string; required?: boolean; area?: boolean; type?: string }[] = [
  { name: "business_name", label: "Business name", placeholder: "Sri Dental Clinic", required: true },
  { name: "owner_name", label: "Your name", placeholder: "Ravi Kumar" },
  { name: "owner_phone", label: "Your WhatsApp number", placeholder: "98765 43210", required: true, type: "tel" },
  { name: "industry", label: "Industry", placeholder: "Dental clinic / Real estate / Coaching…" },
  { name: "location", label: "Location / address", placeholder: "Dilsukhnagar, Hyderabad" },
  { name: "timings", label: "Working hours", placeholder: "Mon–Sat 10 AM – 8 PM" },
  { name: "services", label: "Services & prices", placeholder: "Teeth cleaning ₹800\nRoot canal ₹4,500\nBraces from ₹35,000", required: true, area: true },
  { name: "faqs", label: "Common customer questions & answers (optional)", placeholder: "Do you accept insurance? Yes, most major insurers.\nIs parking available? Yes, free parking.", area: true },
  { name: "enquiries_per_month", label: "Enquiries you get per month (approx.)", placeholder: "100", type: "number" },
];

function TrialPage() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const body = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const r = await fetch(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || !j.code) throw new Error(j.error || "Something went wrong. Please try again.");
      setResult(j);
      (window as any).fbq?.("track", "Lead", { content_name: "free_trial" });
      (window as any).gtag?.("event", "generate_lead", { method: "free_trial" });
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-canvas px-4 py-16 text-neutral-100 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-neutral-100">
          <ArrowLeft className="size-4" /> Back to home
        </Link>
        <p className="mt-8 text-[10px] font-medium uppercase tracking-[0.25em] text-accent-cyan">3-day free trial · No card needed</p>
        <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Try an AI assistant trained on <span className="text-accent-cyan">your business</span>
        </h1>
        <p className="mt-4 text-zinc-400">
          Tell us about your business. In minutes you get a WhatsApp demo that answers like your best front-desk staff — in Telugu,
          English & Hindi — and books appointments. You'll get a report on Day 1 and Day 2.
        </p>

        <div className="mt-6 grid gap-3 text-sm text-zinc-300 sm:grid-cols-3">
          <p className="flex items-center gap-2"><Clock className="size-4 text-accent-cyan" /> Ready in minutes</p>
          <p className="flex items-center gap-2"><MessageCircle className="size-4 text-accent-cyan" /> Test on WhatsApp</p>
          <p className="flex items-center gap-2"><Sparkles className="size-4 text-accent-cyan" /> Daily results report</p>
        </div>

        {result ? (
          <div className="mt-10 rounded-3xl border border-[#25D366]/30 bg-[#25D366]/10 p-6 sm:p-8">
            <CheckCircle2 className="size-10 text-[#25D366]" />
            <h2 className="mt-4 text-2xl font-semibold">Your demo is ready! 🎉</h2>
            <p className="mt-2 text-zinc-300">
              Your trial code is <span className="font-mono font-semibold text-neutral-100">{result.code}</span>. Tap the button, send the code on
              WhatsApp and start chatting like a customer. Share the same link with your staff and friends.
            </p>
            <a
              href={result.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#20BF5B]"
            >
              <MessageCircle className="size-4" /> Open my demo on WhatsApp
            </a>
            <p className="mt-4 text-xs text-zinc-400">
              Active until {new Date(result.ends_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}. Send EXIT in the chat to leave the demo.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-10 space-y-5 rounded-3xl border border-white/5 bg-surface p-6 sm:p-8">
            {FIELDS.map((f) => (
              <label key={f.name} className="block">
                <span className="text-sm text-zinc-300">
                  {f.label} {f.required && <span className="text-rose-400">*</span>}
                </span>
                {f.area ? (
                  <textarea
                    name={f.name}
                    required={f.required}
                    placeholder={f.placeholder}
                    rows={4}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-neutral-100 placeholder:text-zinc-600 focus:border-accent-cyan focus:outline-none"
                  />
                ) : (
                  <input
                    name={f.name}
                    type={f.type || "text"}
                    required={f.required}
                    placeholder={f.placeholder}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-neutral-100 placeholder:text-zinc-600 focus:border-accent-cyan focus:outline-none"
                  />
                )}
              </label>
            ))}
            <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            {error && <p className="text-sm text-rose-400">{error}</p>}
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#20BF5B] disabled:opacity-60"
            >
              {busy ? "Creating your demo…" : "Start my free 3-day trial"}
            </button>
            <p className="text-xs text-zinc-500">
              By starting the trial you agree that we may contact you on WhatsApp about it. See our{" "}
              <Link to="/privacy" className="underline">privacy policy</Link>.
            </p>
          </form>
        )}
      </div>
    </main>
  );
}
