import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Visionary AI Automations" },
      { name: "description", content: "How Visionary AI collects, uses, and protects your data." },
      { property: "og:title", content: "Privacy Policy — Visionary AI Automations" },
      { property: "og:description", content: "How Visionary AI collects, uses, and protects your data." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <main className="min-h-screen bg-canvas text-neutral-100 font-sans">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <Link to="/" className="text-xs uppercase tracking-widest text-accent-cyan">
          ← Back home
        </Link>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="mt-4 text-sm text-zinc-500">Last updated: today</p>
        <div className="prose prose-invert mt-10 space-y-6 text-zinc-300">
          <p>
            This page is maintained by Visionary AI Automations to answer common
            privacy questions about our services. It is not a legal certification.
          </p>
          <h2 className="text-lg font-semibold text-white">Data we collect</h2>
          <p>We collect contact information you submit via forms (name, email, company, message) to respond to inquiries.</p>
          <h2 className="text-lg font-semibold text-white">How we use it</h2>
          <p>We use your data solely to reply to inquiries, deliver services you request, and send occasional operational updates.</p>
          <h2 className="text-lg font-semibold text-white">Sharing</h2>
          <p>We don't sell your data. We may share it with vetted subprocessors (e.g. email delivery) strictly to operate the service.</p>
          <h2 className="text-lg font-semibold text-white">Contact</h2>
          <p>Reach us at hello@visionary-ai.co for privacy requests or questions.</p>
        </div>
      </div>
    </main>
  );
}