import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Minus, Sparkles, ShieldCheck, Gift, Calculator } from "lucide-react";
import { WhatsAppButton } from "./WhatsAppButton";

type Plan = {
  name: string;
  tag: string;
  forWho: string;
  setup: number | null;
  monthly: number | null;
  perks: string[];
  featured?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Starter",
    tag: "Launch",
    forWho: "Shops, salons, small clinics",
    setup: 14999,
    monthly: 2999,
    perks: [
      "WhatsApp AI agent, 24/7",
      "Telugu, English & Hindi replies",
      "FAQs, prices & menu buttons",
      "Appointment booking + calendar",
      "Monthly performance report",
    ],
  },
  {
    name: "Growth",
    tag: "Most popular",
    forWho: "Clinics, real estate, coaching",
    setup: 34999,
    monthly: 6999,
    featured: true,
    perks: [
      "Everything in Starter",
      "CRM dashboard + lead scoring",
      "Automatic follow-ups",
      "Instagram + Messenger inbox",
      "Broadcast templates & Google reviews",
      "Meta ad lead tracking",
    ],
  },
  {
    name: "Pro",
    tag: "Scale",
    forWho: "Hospitals, builders, multi-branch",
    setup: 74999,
    monthly: 14999,
    perks: [
      "Everything in Growth",
      "AI voice agent + 500 call minutes",
      "3-level sales routing to your team",
      "Custom integrations (CRM, ERP, sheets)",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    tag: "Bespoke",
    forWho: "Large & multi-location teams",
    setup: null,
    monthly: null,
    perks: [
      "Dedicated team & SLAs",
      "Security review",
      "Custom AI workflows",
      "24/7 monitoring",
    ],
  },
];

const ROWS: [string, boolean | string, boolean | string, boolean | string][] = [
  ["24/7 WhatsApp AI agent", true, true, true],
  ["Telugu · English · Hindi", true, true, true],
  ["Appointment booking + calendar", true, true, true],
  ["CRM dashboard & lead scoring", false, true, true],
  ["Automatic follow-ups", false, true, true],
  ["Instagram + Messenger", false, true, true],
  ["Broadcasts & review requests", false, true, true],
  ["AI voice agent", false, false, "500 min/mo"],
  ["Sales routing to human team", false, false, true],
  ["Custom integrations", false, false, true],
  ["Support", "WhatsApp", "WhatsApp + call", "Priority"],
];

const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

function Cell({ v }: { v: boolean | string }) {
  if (v === true) return <Check className="mx-auto size-4 text-accent-cyan" />;
  if (v === false) return <Minus className="mx-auto size-4 text-zinc-600" />;
  return <span className="text-xs text-zinc-300">{v}</span>;
}

function Roi() {
  const [enquiries, setEnquiries] = useState(20);
  const [missed, setMissed] = useState(30);
  const [value, setValue] = useState(5000);
  const [close, setClose] = useState(20);
  const lostLeads = enquiries * 30 * (missed / 100);
  const lostRevenue = lostLeads * (close / 100) * value;
  const recovered = lostRevenue * 0.6;
  const fields: [string, number, (n: number) => void, number, number, number, string][] = [
    ["Enquiries per day", enquiries, setEnquiries, 1, 200, 1, ""],
    ["Enquiries missed or replied late", missed, setMissed, 5, 80, 5, "%"],
    ["Average customer value", value, setValue, 500, 100000, 500, "₹"],
    ["Enquiries that become customers", close, setClose, 5, 60, 5, "%"],
  ];
  return (
    <div className="mt-16 grid gap-6 rounded-3xl border border-white/5 bg-surface p-6 sm:p-8 lg:grid-cols-2">
      <div>
        <div className="flex items-center gap-2 text-accent-cyan">
          <Calculator className="size-5" />
          <span className="text-[10px] font-medium uppercase tracking-[0.25em]">ROI calculator</span>
        </div>
        <h3 className="mt-3 text-2xl font-semibold">How much are slow replies costing you?</h3>
        <div className="mt-6 space-y-5">
          {fields.map(([label, val, set, min, max, step, unit]) => (
            <label key={label} className="block">
              <div className="flex justify-between text-sm text-zinc-400">
                <span>{label}</span>
                <span className="font-semibold text-neutral-100">
                  {unit === "₹" ? inr(val) : `${val}${unit}`}
                </span>
              </div>
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={val}
                onChange={(e) => set(Number(e.target.value))}
                className="mt-2 w-full accent-[#22d3ee]"
              />
            </label>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center rounded-2xl bg-gradient-to-b from-accent-blue/10 to-transparent p-6">
        <p className="text-sm text-zinc-400">Leads you lose every month</p>
        <p className="text-3xl font-semibold">{Math.round(lostLeads)}</p>
        <p className="mt-4 text-sm text-zinc-400">Revenue lost every month</p>
        <p className="text-4xl font-semibold text-rose-400">{inr(lostRevenue)}</p>
        <p className="mt-4 text-sm text-zinc-400">Revenue an AI agent could recover (est. 60%)</p>
        <p className="text-4xl font-semibold text-[#25D366]">{inr(recovered)}</p>
        <p className="mt-3 text-xs text-zinc-500">Estimate only, based on the numbers you entered.</p>
        <div className="mt-6">
          <WhatsAppButton serviceKey="general" source="pricing-roi" label="Get my free AI demo" variant="primary" fullWidth />
        </div>
      </div>
    </div>
  );
}

export function Pricing() {
  const [annual, setAnnual] = useState(false);
  return (
    <div>
      <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1 text-sm">
          {["Monthly", "Annual"].map((l, i) => (
            <button
              key={l}
              onClick={() => setAnnual(i === 1)}
              className={`rounded-full px-5 py-2 transition ${annual === (i === 1) ? "bg-neutral-100 text-canvas" : "text-zinc-400"}`}
            >
              {l}
              {i === 1 && <span className="ml-2 text-xs text-[#25D366]">2 months free</span>}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-2xl border border-[#25D366]/30 bg-[#25D366]/10 px-4 py-2 text-sm text-[#25D366]">
          <Gift className="size-4 shrink-0" />
          Founding offer: 50% off setup for our first 10 clients
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PLANS.map((p) => {
          const monthly = p.monthly && (annual ? (p.monthly * 10) / 12 : p.monthly);
          return (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-3xl border p-6 ${p.featured ? "border-accent-blue/40 bg-gradient-to-b from-accent-blue/10 to-surface" : "border-white/5 bg-surface"}`}
            >
              {p.featured && (
                <span className="absolute -top-3 right-6 inline-flex items-center gap-1 rounded-full bg-accent-blue px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                  <Sparkles className="size-3" /> Popular
                </span>
              )}
              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-accent-cyan">{p.tag}</span>
              <h3 className="mt-3 text-xl font-semibold">{p.name}</h3>
              <p className="text-xs text-zinc-500">{p.forWho}</p>
              {monthly ? (
                <>
                  <div className="mt-4 text-3xl font-semibold tracking-tight">
                    {inr(monthly)}
                    <span className="text-sm font-normal text-zinc-400">/month</span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-400">
                    + {inr(p.setup!)} one-time setup{annual && " · billed yearly"}
                  </p>
                </>
              ) : (
                <div className="mt-4 text-3xl font-semibold tracking-tight">Custom</div>
              )}
              <ul className="mt-6 flex-1 space-y-2 text-sm text-zinc-400">
                {p.perks.map((it) => (
                  <li key={it} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent-cyan" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                {p.monthly ? (
                  <Link
                    to="/trial"
                    className={`inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold transition ${p.featured ? "bg-[#25D366] text-white hover:bg-[#20BF5B]" : "border border-white/10 bg-white/5 text-neutral-100 hover:border-[#25D366]/40 hover:bg-white/10"}`}
                  >
                    Start 3-day free trial
                  </Link>
                ) : (
                  <WhatsAppButton serviceKey="general" source="pricing-enterprise" label="Talk to us" variant="ghost" fullWidth />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid gap-3 text-sm text-zinc-400 sm:grid-cols-2 lg:grid-cols-4">
        <p className="flex items-start gap-2"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#25D366]" />30-day results guarantee: faster replies, or your first month is refunded.</p>
        <p className="flex items-start gap-2"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#25D366]" />Meta WhatsApp & call charges billed at cost, no markup.</p>
        <p className="flex items-start gap-2"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#25D366]" />3-day free trial on our demo number with your business details. No card needed.</p>
        <p className="flex items-start gap-2"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#25D366]" />No lock-in. Cancel monthly plans anytime.</p>
      </div>

      <div className="mt-12 overflow-x-auto rounded-3xl border border-white/5 bg-surface">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-white/5 text-left">
              <th className="p-4 font-medium text-zinc-400">Compare plans</th>
              {["Starter", "Growth", "Pro"].map((n) => (
                <th key={n} className="p-4 text-center font-semibold">{n}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map(([label, a, b, c]) => (
              <tr key={label} className="border-b border-white/5 last:border-0">
                <td className="p-4 text-zinc-300">{label}</td>
                <td className="p-4 text-center"><Cell v={a} /></td>
                <td className="p-4 text-center"><Cell v={b} /></td>
                <td className="p-4 text-center"><Cell v={c} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Roi />
    </div>
  );
}
