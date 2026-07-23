// Google Forms per service. Replace these placeholder URLs with your
// real Google Form links (Edit form → Send → Link icon → Copy).
// Each form should collect: Name, Business Name, Phone, Email, Industry,
// Requirements, Budget, Timeline, Preferred Meeting Time, Notes.

import type { ServiceKey } from "./whatsapp";

export const GOOGLE_FORMS: Record<ServiceKey, string> = {
  "ai-automation":
    "https://docs.google.com/forms/d/e/1FAIpQLSc_AI_AUTOMATION_PLACEHOLDER/viewform?usp=sf_link",
  "whatsapp-chatbot":
    "https://docs.google.com/forms/d/e/1FAIpQLSc_WHATSAPP_CHATBOT_PLACEHOLDER/viewform?usp=sf_link",
  "voice-agent":
    "https://docs.google.com/forms/d/e/1FAIpQLSc_VOICE_AGENT_PLACEHOLDER/viewform?usp=sf_link",
  website:
    "https://docs.google.com/forms/d/e/1FAIpQLSc_WEBSITE_PLACEHOLDER/viewform?usp=sf_link",
  "video-ads":
    "https://docs.google.com/forms/d/e/1FAIpQLSc_VIDEO_ADS_PLACEHOLDER/viewform?usp=sf_link",
  general:
    "https://docs.google.com/forms/d/e/1FAIpQLSc_GENERAL_PLACEHOLDER/viewform?usp=sf_link",
};

const STORAGE_KEY = "vai:google_forms";

export const SERVICE_KEYS: ServiceKey[] = [
  "ai-automation",
  "whatsapp-chatbot",
  "voice-agent",
  "website",
  "video-ads",
  "general",
];

export const SERVICE_LABELS: Record<ServiceKey, string> = {
  "ai-automation": "AI Automation",
  "whatsapp-chatbot": "WhatsApp AI Chatbot",
  "voice-agent": "AI Voice Agent",
  website: "AI Business Website",
  "video-ads": "AI Video Ads",
  general: "General / Fallback",
};

function readOverrides(): Partial<Record<ServiceKey, string>> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function getFormOverrides(): Partial<Record<ServiceKey, string>> {
  return readOverrides();
}

export function setFormOverrides(map: Partial<Record<ServiceKey, string>>) {
  if (typeof window === "undefined") return;
  const cleaned: Partial<Record<ServiceKey, string>> = {};
  for (const k of SERVICE_KEYS) {
    const v = (map[k] ?? "").trim();
    if (v) cleaned[k] = v;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
}

export function clearFormOverrides() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function isValidFormUrl(url: string): boolean {
  if (!url) return true;
  try {
    const u = new URL(url);
    return (
      (u.hostname === "docs.google.com" || u.hostname === "forms.gle") &&
      !url.includes("PLACEHOLDER")
    );
  } catch {
    return false;
  }
}

export function getFormUrl(key: ServiceKey = "general"): string {
  const overrides = readOverrides();
  return (
    overrides[key] ||
    overrides.general ||
    GOOGLE_FORMS[key] ||
    GOOGLE_FORMS.general
  );
}

export function trackFormClick(source: string, service: ServiceKey = "general") {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", "form_click", {
      event_category: "engagement",
      event_label: source,
      service,
      source,
    });
  } catch {
    /* no-op */
  }
  try {
    window.fbq?.("trackCustom", "FormClick", { source, service });
  } catch {
    /* no-op */
  }
}