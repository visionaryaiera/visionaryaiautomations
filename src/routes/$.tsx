import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

// Old / guessed URLs (and links Google found earlier) -> the right page with a permanent redirect,
// so search engines stop reporting 404s. Anything else falls through to the 404 page.
const REDIRECTS: Record<string, string> = {
  "home": "/",
  "index": "/",
  "index.html": "/",
  "about": "/#about",
  "about-us": "/#about",
  "contact": "/#contact",
  "contact-us": "/#contact",
  "pricing": "/#pricing",
  "plans": "/#pricing",
  "portfolio": "/#portfolio",
  "work": "/#portfolio",
  "case-studies": "/#portfolio",
  "industries": "/#industries",
  "faq": "/#faq",
  "showcase": "/#showcase",
  "process": "/#process",
  "blog": "/",
  "free-trial": "/trial",
  "demo": "/trial",
  "book": "/trial",
  "privacy-policy": "/privacy",
  "terms-of-service": "/terms",
  "terms-and-conditions": "/terms",
  "services/chatbot": "/services/whatsapp-chatbot",
  "services/whatsapp": "/services/whatsapp-chatbot",
  "services/whatsapp-automation": "/services/whatsapp-chatbot",
  "whatsapp-chatbot": "/services/whatsapp-chatbot",
  "services/voice": "/services/voice-agent",
  "services/ai-voice-agent": "/services/voice-agent",
  "voice-agent": "/services/voice-agent",
  "services/automation": "/services/ai-automation",
  "ai-automation": "/services/ai-automation",
  "services/website": "/services/ai-business-website",
  "services/websites": "/services/ai-business-website",
  "services/web-development": "/services/ai-business-website",
  "website": "/services/ai-business-website",
  "services/video-ads": "/services/ai-video-ads",
  "services/video": "/services/ai-video-ads",
  "video-ads": "/services/ai-video-ads",
};

export const Route = createFileRoute("/$")({
  beforeLoad: ({ params }) => {
    const key = String((params as { _splat?: string })._splat || "").replace(/\/+$/, "").toLowerCase();
    // Owner shortcut: website /admin opens the CRM dashboard on the bot server.
    if (key === "admin" || key === "dashboard" || key === "crm")
      throw redirect({ href: "https://api.visionaryaiautomations.com/admin", statusCode: 302 });
    const to = REDIRECTS[key];
    if (to) throw redirect({ href: to, statusCode: 301 });
    throw notFound();
  },
});
