// Centralized WhatsApp helpers for Visionary AI Automations.
// Single source of truth for the primary number, per-service pre-filled
// messages, URL builder, and analytics tracking (GA4 + Meta Pixel).

export const WHATSAPP_NUMBER = "919491071248";
export const WHATSAPP_DISPLAY = "+91 94910 71248";
export const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;

export type ServiceKey =
  | "ai-automation"
  | "whatsapp-chatbot"
  | "voice-agent"
  | "website"
  | "video-ads"
  | "general";

export const SERVICE_MESSAGES: Record<ServiceKey, string> = {
  "ai-automation": `Hello Visionary AI Automations,

I am interested in AI Automation for my business.

Business Name:
Industry:
Current Process:
Automation Goals:
Requirements:`,
  "whatsapp-chatbot": `Hello Visionary AI Automations,

I need a WhatsApp AI Chatbot.

Business Name:
Industry:
Business Type:
Expected Features:
Requirements:`,
  "voice-agent": `Hello Visionary AI Automations,

I need an AI Voice Agent.

Business Name:
Industry:
Inbound / Outbound:
Expected Features:
Requirements:`,
  website: `Hello Visionary AI Automations,

I need a Professional AI Business Website.

Business Name:
Industry:
Website Type:
Pages Required:
Special Features:
Requirements:`,
  "video-ads": `Hello Visionary AI Automations,

I need AI Video Ads for my business.

Business Name:
Industry:
Product / Service:
Target Audience:
Video Type:
Duration:
Requirements:`,
  general: `Hello Visionary AI Automations,

I would like to book a free consultation.

Business Name:
Industry:
What you need:
Requirements:`,
};

export function buildWhatsAppUrl(key: ServiceKey = "general"): string {
  const text = SERVICE_MESSAGES[key] ?? SERVICE_MESSAGES.general;
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackWhatsAppClick(source: string, service: ServiceKey = "general") {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", "whatsapp_click", {
      event_category: "engagement",
      event_label: source,
      service,
      source,
    });
  } catch {
    /* no-op */
  }
  try {
    window.fbq?.("trackCustom", "WhatsAppClick", { source, service });
  } catch {
    /* no-op */
  }
}