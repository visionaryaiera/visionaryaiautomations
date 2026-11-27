import { Link } from "@tanstack/react-router";
import { ArrowLeft, Check, X, Sparkles } from "lucide-react";
import { WhatsAppButton } from "./WhatsAppButton";

export interface IndustryMeta {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  kicker: string;
  title: string;
  subtitle: string;
  before: string[];
  after: string[];
  features: { title: string; desc: string }[];
  shots: { src: string; title: string }[];
  faq: { q: string; a: string }[];
}

export const INDUSTRIES: Record<string, IndustryMeta> = {
  clinics: {
    slug: "ai-chatbot-for-clinics-hyderabad",
    seoTitle: "AI WhatsApp Chatbot for Clinics & Hospitals in Hyderabad — Visionary AI",
    seoDescription:
      "AI WhatsApp assistant for clinics, dental and hospitals in Hyderabad: answers fees and timings in Telugu, English & Hindi, books appointments and sends reminders 24/7. Free 3-day trial.",
    kicker: "For clinics · dental · hospitals · diagnostics",
    title: "An AI front desk for your clinic – on WhatsApp, 24/7",
    subtitle:
      "Patients ask fees, doctor timings and location at any hour. Your AI assistant answers in Telugu, English or Hindi, books the appointment and sends a reminder – while your staff focus on patients.",
    before: ["Night enquiries answered next morning", "Front desk repeats fees & timings all day", "No-shows from forgotten appointments", "Leads from ads lost in the chat list"],
    after: ["Every patient answered in seconds, 24/7", "Fees, doctors, timings & location answered automatically", "Reminders before every appointment", "Every enquiry tracked with its source"],
    features: [
      { title: "Appointment booking", desc: "Patient picks a day and time; confirmation and calendar link are sent automatically." },
      { title: "Telugu, English & Hindi", desc: "Replies in the language the patient writes in – just like your receptionist." },
      { title: "Reminders & follow-ups", desc: "Automatic reminders cut no-shows; follow-ups for check-ups and recalls." },
      { title: "Google reviews", desc: "Happy patients get a review link after their visit to grow your rating." },
    ],
    shots: [{ src: "/showcase/chatbot-1.png", title: "Patient books an appointment at 10:42 PM" }, { src: "/showcase/chatbot-2.png", title: "Every enquiry scored and tracked" }],
    faq: [
      { q: "Will it give medical advice?", a: "No. It answers practical questions (fees, timings, doctors, location, booking) and hands anything medical to your team." },
      { q: "Does it work with our existing WhatsApp number?", a: "Yes – after the free trial we connect it to your clinic's WhatsApp Business number using the official Meta API." },
      { q: "How much does it cost?", a: "Setup starts at ₹14,999 one-time (50% off for our first 10 clients), plus a small monthly support plan shared in your personalised quotation." },
    ],
  },
  realestate: {
    slug: "ai-chatbot-for-real-estate-hyderabad",
    seoTitle: "AI WhatsApp Chatbot for Real Estate in Hyderabad — Visionary AI",
    seoDescription:
      "AI WhatsApp assistant for builders and real estate agents in Hyderabad: replies to ad leads in seconds, qualifies budget & BHK, books site visits and routes hot buyers to your sales team. Free 3-day trial.",
    kicker: "For builders · developers · real estate agents",
    title: "Turn every property enquiry into a site visit – automatically",
    subtitle:
      "Leads from Meta ads and portals go cold in minutes. Your AI assistant replies instantly in Telugu or English, asks budget, BHK and location, books the site visit and alerts your sales team about hot buyers.",
    before: ["Ad leads wait hours for a reply", "Sales team calls buyers without budget", "Site visits not confirmed or reminded", "No idea which ad brings real buyers"],
    after: ["Every lead answered in seconds, day and night", "Budget, BHK, location & timeline captured", "Site visits booked with reminders", "Hot buyers routed to your team with full context"],
    features: [
      { title: "Instant lead qualification", desc: "Asks budget, BHK, location and timeline; scores leads hot / warm / cold." },
      { title: "Site-visit booking", desc: "Offers slots and confirms visits; sends location and reminders." },
      { title: "Brochures & price lists", desc: "Shares project details, floor plans and price sheets on request." },
      { title: "Ad lead tracking", desc: "See which Meta / Google ads bring buyers who actually visit." },
    ],
    shots: [{ src: "/showcase/voice-1.png", title: "AI qualifies a 2BHK buyer and books a site visit" }, { src: "/showcase/automation-2.png", title: "Daily summary of leads on WhatsApp" }],
    faq: [
      { q: "Can it handle leads from Meta ads?", a: "Yes – Click-to-WhatsApp ad leads are answered instantly and tagged with the ad they came from." },
      { q: "Can my sales team take over?", a: "Anytime. Hot buyers are routed to your team with a summary, and they can reply in the same chat." },
      { q: "How much does it cost?", a: "Growth setup is ₹34,999 one-time (50% off for our first 10 clients), plus a small monthly support plan shared in your personalised quotation." },
    ],
  },
};

export function IndustryPage({ data }: { data: IndustryMeta }) {
  return (
    <div className="min-h-screen bg-canvas text-neutral-100 antialiased">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-canvas/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-200 hover:text-white">
            <img src="/logo.png" alt="Visionary AI Automations" className="size-7 rounded-md object-cover ring-1 ring-white/10" />
            Visionary AI
          </Link>
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white">
            <ArrowLeft className="size-3.5" /> Back to home
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 pt-16 pb-12 sm:pt-24">
        <p className="text-xs font-medium uppercase tracking-widest text-accent-cyan">{data.kicker}</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">{data.title}</h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">{data.subtitle}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/trial" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#20BF5B]">
            <Sparkles className="size-4" /> Start 3-day free trial
          </Link>
          <WhatsAppButton serviceKey="whatsapp-chatbot" source={`industry-${data.slug}`} label="Chat on WhatsApp" variant="ghost" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-white/5 bg-surface p-6">
            <div className="text-sm font-semibold uppercase tracking-widest text-rose-400">Before</div>
            <ul className="mt-4 space-y-3">{data.before.map((b) => <li key={b} className="flex gap-3 text-sm text-zinc-400"><X className="mt-0.5 size-4 shrink-0 text-rose-400" />{b}</li>)}</ul>
          </div>
          <div className="rounded-3xl border border-[#25D366]/30 bg-[#25D366]/5 p-6">
            <div className="text-sm font-semibold uppercase tracking-widest text-[#25D366]">After</div>
            <ul className="mt-4 space-y-3">{data.after.map((a) => <li key={a} className="flex gap-3 text-sm text-zinc-200"><Check className="mt-0.5 size-4 shrink-0 text-[#25D366]" />{a}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-3xl font-semibold tracking-tight text-white">What your AI assistant does</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-white/5 bg-surface p-6">
              <div className="text-base font-semibold text-white">{f.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-3xl font-semibold tracking-tight text-white">See it in action</h2>
        <p className="mt-2 text-sm text-zinc-400">Sample screens with demo data.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {data.shots.map((s) => (
            <figure key={s.src} className="overflow-hidden rounded-3xl border border-white/10 bg-surface">
              <img src={s.src} alt={s.title} width={1200} height={750} loading="lazy" decoding="async" className="w-full" />
              <figcaption className="p-5 text-sm font-semibold text-white">{s.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-12">
        <h2 className="text-3xl font-semibold tracking-tight text-white">FAQ</h2>
        <div className="mt-6 space-y-3">
          {data.faq.map((f) => (
            <details key={f.q} className="rounded-2xl border border-white/5 bg-surface p-5">
              <summary className="cursor-pointer text-sm font-medium text-neutral-100">{f.q}</summary>
              <p className="mt-3 text-sm text-zinc-400">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="border-t border-white/5">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white">Try it free for 3 days</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-zinc-400">Trained on your own services and prices in minutes. No card needed. Hyderabad · Telangana · Andhra Pradesh.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/trial" className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#20BF5B]">Start free trial</Link>
            <WhatsAppButton serviceKey="whatsapp-chatbot" source={`industry-${data.slug}-bottom`} label="WhatsApp +91 94910 71248" variant="ghost" />
          </div>
        </div>
      </section>
    </div>
  );
}
