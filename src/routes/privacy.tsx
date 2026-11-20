import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Visionary AI Automations" },
      { name: "description", content: "How Visionary AI Automations collects, uses, protects and deletes your data, including WhatsApp, Messenger and Instagram conversations." },
      { property: "og:title", content: "Privacy Policy — Visionary AI Automations" },
      { property: "og:description", content: "How Visionary AI Automations collects, uses, protects and deletes your data." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: Privacy,
});

const H = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-lg font-semibold text-white">{children}</h2>
);

function Privacy() {
  return (
    <main className="min-h-screen bg-canvas text-neutral-100 font-sans">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <Link to="/" className="text-xs uppercase tracking-widest text-accent-cyan">
          ← Back home
        </Link>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="mt-4 text-sm text-zinc-500">Last updated: 21 November 2026</p>
        <div className="prose prose-invert mt-10 space-y-6 text-zinc-300">
          <p>
            Visionary AI Automations ("we", "us") builds AI chatbots, voice agents and business automation.
            This policy explains what we collect when you visit our website or message us, how we use it,
            and how you can have it deleted.
          </p>

          <H>Data we collect</H>
          <ul className="list-disc space-y-2 pl-5">
            <li>Details you share in forms or chats: name, phone number, business type, your requirement and preferred call time.</li>
            <li>
              Conversations with our assistant on our website chat, WhatsApp, Facebook Messenger and Instagram Direct:
              the messages you send us and our replies, plus the platform ID Meta gives us for your account
              (for example your WhatsApp number or a Messenger/Instagram page-scoped ID) and your public profile name.
            </li>
            <li>Website usage, only with your cookie consent: pages visited, buttons clicked and the ad or link that brought you to us.</li>
            <li>Call bookings you make with us (date, time and the expert assigned).</li>
          </ul>

          <H>How we use it</H>
          <ul className="list-disc space-y-2 pl-5">
            <li>To answer your questions, including automatic replies from our AI assistant (it always says it is an AI and you can ask for a human at any time).</li>
            <li>To book, confirm, remind you about and hold the strategy calls you request.</li>
            <li>To follow up about your enquiry and, if you agree, share relevant offers. Reply STOP at any time to stop messages.</li>
            <li>To understand which services and ads are useful, and to improve our service.</li>
          </ul>
          <p>We never sell your data.</p>

          <H>Who processes it for us</H>
          <p>
            Meta Platforms (WhatsApp, Messenger, Instagram) to deliver messages; Supabase (database hosting);
            Hostinger (server hosting); Google (AI model that drafts replies, and Google Calendar for bookings);
            and, if you agree to an AI voice call, our voice-call provider. Each processes data only to run our service.
          </p>

          <H>How long we keep it</H>
          <p>We keep enquiry and conversation data for up to 24 months after your last message, then delete it, unless you ask us to delete it sooner.</p>

          <H>Delete your data</H>
          <p>
            Send <strong>"DELETE MY DATA"</strong> to us on WhatsApp (+91 94910 71248), Facebook Messenger or Instagram
            (@visionaryaiautomations). We will delete your conversations, contact details and bookings within 30 days
            and confirm on the same channel. You can also remove our app from your Facebook settings under
            "Apps and websites" at any time.
          </p>

          <H>Your choices</H>
          <ul className="list-disc space-y-2 pl-5">
            <li>Reply STOP to stop all messages from us; send START to resume.</li>
            <li>Ask for a copy or correction of your data using the contact below.</li>
          </ul>

          <H>Contact</H>
          <p>
            Visionary AI Automations, MBD Complex, HMT Nagar, Nacharam, Hyderabad, Telangana, India.
            WhatsApp / phone: +91 94910 71248.
          </p>
        </div>
      </div>
    </main>
  );
}
