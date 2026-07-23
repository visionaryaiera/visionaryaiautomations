import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ExternalLink } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import {
  GOOGLE_FORMS,
  SERVICE_KEYS,
  SERVICE_LABELS,
  getFormOverrides,
  setFormOverrides,
  clearFormOverrides,
  isValidFormUrl,
} from "@/lib/forms";
import type { ServiceKey } from "@/lib/whatsapp";

export const Route = createFileRoute("/settings/forms")({
  head: () => ({
    meta: [
      { title: "Google Form Settings — Visionary AI Automations" },
      {
        name: "description",
        content:
          "Manage the Google Form URL for each service without changing code.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: FormsSettings,
});

function FormsSettings() {
  const [values, setValues] = useState<Record<ServiceKey, string>>(
    () => Object.fromEntries(SERVICE_KEYS.map((k) => [k, ""])) as Record<ServiceKey, string>,
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const overrides = getFormOverrides();
    setValues(
      Object.fromEntries(
        SERVICE_KEYS.map((k) => [k, overrides[k] ?? ""]),
      ) as Record<ServiceKey, string>,
    );
    setReady(true);
  }, []);

  const invalid = SERVICE_KEYS.filter((k) => !isValidFormUrl(values[k]));

  const save = () => {
    if (invalid.length) return;
    setFormOverrides(values);
    toast.success("Google Form URLs saved", {
      description: "Every service CTA now opens the URL you provided.",
    });
  };

  const clear = () => {
    clearFormOverrides();
    setValues(
      Object.fromEntries(SERVICE_KEYS.map((k) => [k, ""])) as Record<ServiceKey, string>,
    );
    toast.message("Overrides cleared — using code defaults");
  };

  return (
    <main className="min-h-screen bg-canvas text-neutral-100 font-sans">
      <Toaster theme="dark" position="top-center" richColors />
      <div className="mx-auto max-w-2xl px-6 py-24">
        <Link to="/" className="text-xs uppercase tracking-widest text-accent-cyan">
          ← Back home
        </Link>
        <h1 className="mt-6 text-3xl sm:text-4xl font-semibold tracking-tight">
          Google Form URLs
        </h1>
        <p className="mt-3 text-sm text-zinc-400">
          Paste each service's Google Form share link. Every "Submit
          Requirements" CTA across the site will open the matching form.
          Saved locally in your browser — clear to fall back to the code
          defaults.
        </p>

        <div className="mt-10 space-y-6">
          {SERVICE_KEYS.map((key) => {
            const value = values[key];
            const bad = !isValidFormUrl(value);
            return (
              <div key={key}>
                <div className="flex items-center justify-between gap-3">
                  <label className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                    {SERVICE_LABELS[key]}
                  </label>
                  {value && !bad ? (
                    <a
                      href={value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-accent-cyan hover:underline"
                    >
                      Open <ExternalLink className="size-3" />
                    </a>
                  ) : null}
                </div>
                <input
                  type="url"
                  inputMode="url"
                  autoComplete="off"
                  placeholder="https://docs.google.com/forms/d/e/…/viewform"
                  value={value}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, [key]: e.target.value }))
                  }
                  disabled={!ready}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-neutral-100 outline-none placeholder:text-zinc-600 focus:border-accent-cyan/60 focus:bg-white/10"
                />
                {bad ? (
                  <p className="mt-1.5 text-xs text-red-400">
                    Must be a docs.google.com or forms.gle URL.
                  </p>
                ) : (
                  <p className="mt-1.5 text-xs text-zinc-500">
                    Default:{" "}
                    <span className="font-mono text-zinc-600">
                      {GOOGLE_FORMS[key].slice(0, 60)}…
                    </span>
                  </p>
                )}
              </div>
            );
          })}

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={save}
              disabled={invalid.length > 0}
              className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#20BF5B] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Save URLs
            </button>
            <button
              onClick={clear}
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-zinc-400 hover:text-red-400"
            >
              Clear overrides
            </button>
          </div>

          <p className="pt-4 text-xs text-zinc-500">
            Tip: in each Google Form, add a hidden "Service" pre-fill so
            submissions arrive tagged. Analytics settings live at{" "}
            <Link to="/settings/analytics" className="text-accent-cyan hover:underline">
              /settings/analytics
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}