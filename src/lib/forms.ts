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

export function getFormUrl(key: ServiceKey = "general"): string {
  return GOOGLE_FORMS[key] ?? GOOGLE_FORMS.general;
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