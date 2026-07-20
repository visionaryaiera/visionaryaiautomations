import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Visionary AI Automations" },
      { name: "description", content: "Terms governing use of Visionary AI Automations' website and services." },
      { property: "og:title", content: "Terms of Service — Visionary AI Automations" },
      { property: "og:description", content: "Terms governing use of Visionary AI Automations' website and services." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <main className="min-h-screen bg-canvas text-neutral-100 font-sans">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <Link to="/" className="text-xs uppercase tracking-widest text-accent-cyan">
          ← Back home
        </Link>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight">Terms of Service</h1>
        <p className="mt-4 text-sm text-zinc-500">Last updated: today</p>
        <div className="prose prose-invert mt-10 space-y-6 text-zinc-300">
          <p>These terms govern your use of the Visionary AI Automations website and services.</p>
          <h2 className="text-lg font-semibold text-white">Use of service</h2>
          <p>You agree to use our services lawfully and not to attempt to disrupt, reverse engineer, or misuse them.</p>
          <h2 className="text-lg font-semibold text-white">Engagements</h2>
          <p>Paid engagements are governed by a separate written statement of work signed by both parties.</p>
          <h2 className="text-lg font-semibold text-white">Liability</h2>
          <p>Services are provided as-is. Liability is limited to fees paid in the prior three months, except where prohibited by law.</p>
          <h2 className="text-lg font-semibold text-white">Contact</h2>
          <p>Questions? Email hello@visionary-ai.co.</p>
        </div>
      </div>
    </main>
  );
}