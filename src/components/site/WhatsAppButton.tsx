import { useEffect, useState } from "react";
import { MessageCircle, ArrowRight } from "lucide-react";
import {
  buildWhatsAppUrl,
  trackWhatsAppClick,
  type ServiceKey,
} from "@/lib/whatsapp";

type Variant = "primary" | "ghost" | "card" | "sticky" | "floating" | "light";

interface Props {
  serviceKey?: ServiceKey;
  source: string;
  label?: string;
  variant?: Variant;
  showReplyNote?: boolean;
  className?: string;
  fullWidth?: boolean;
  icon?: boolean;
}

const base =
  "group inline-flex items-center justify-center gap-2 font-semibold transition-all active:scale-95 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "rounded-full bg-[#25D366] px-6 py-3.5 text-sm text-white ring-1 ring-[#25D366]/60 hover:bg-[#20BF5B] hover:shadow-[0_0_40px_-8px_rgba(37,211,102,0.6)]",
  light:
    "rounded-full bg-neutral-100 px-6 py-3.5 text-sm text-canvas hover:scale-[1.02]",
  ghost:
    "rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm text-neutral-100 backdrop-blur-md hover:bg-white/10 hover:border-[#25D366]/40",
  card:
    "rounded-full bg-[#25D366]/10 border border-[#25D366]/30 px-4 py-2.5 text-xs text-[#25D366] hover:bg-[#25D366] hover:text-white",
  sticky:
    "rounded-full bg-[#25D366] px-5 py-3 text-sm text-white shadow-[0_10px_40px_-10px_rgba(37,211,102,0.7)] hover:bg-[#20BF5B]",
  floating:
    "rounded-full bg-[#25D366] text-white shadow-[0_0_30px_-5px_rgba(37,211,102,0.7)] hover:scale-105 size-14",
};

export function WhatsAppButton({
  serviceKey = "general",
  source,
  label = "Get Free Consultation",
  variant = "primary",
  showReplyNote = false,
  className = "",
  fullWidth = false,
  icon = true,
}: Props) {
  const href = buildWhatsAppUrl(serviceKey);

  return (
    <div className={`flex flex-col ${fullWidth ? "w-full" : ""} ${variant === "primary" || variant === "ghost" || variant === "light" ? "items-center sm:items-start" : "items-center"}`}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${label} on WhatsApp`}
        onClick={() => trackWhatsAppClick(source, serviceKey)}
        className={`${base} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      >
        {icon && variant !== "floating" && (
          <MessageCircle className="size-4 shrink-0" />
        )}
        {variant === "floating" ? (
          <MessageCircle className="size-6" />
        ) : (
          <>
            <span>{label}</span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </a>
      {showReplyNote && variant !== "floating" && (
        <span className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-medium text-zinc-500">
          <span className="relative inline-flex size-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-75" />
            <span className="relative inline-block size-1.5 rounded-full bg-[#25D366]" />
          </span>
          Typically replies within minutes
        </span>
      )}
    </div>
  );
}

/**
 * Global floating WhatsApp bubble + sticky "Book Free Consultation" pill.
 * Mounted once in the root layout so it appears on every route.
 */
export function GlobalWhatsAppLayer() {
  const [showSticky, setShowSticky] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const floatHref = buildWhatsAppUrl("general");

  return (
    <>
      {/* Floating bubble */}
      <a
        href={floatHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp — typically replies in minutes"
        onClick={() => trackWhatsAppClick("floating", "general")}
        className="group fixed bottom-5 right-5 z-[60] inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_40px_-5px_rgba(37,211,102,0.7)] transition-transform hover:scale-110"
      >
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-40" />
        <MessageCircle className="size-6" />
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-canvas/90 px-3 py-1.5 text-xs font-medium text-neutral-100 backdrop-blur-md ring-1 ring-white/10 sm:group-hover:inline-block">
          Chat with us — replies in minutes
        </span>
      </a>

      {/* Sticky Book Free Consultation pill */}
      <div
        className={`fixed z-[59] transition-all duration-300 ${
          showSticky
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0 pointer-events-none"
        } bottom-24 right-5 sm:bottom-6 sm:left-6 sm:right-auto`}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <a
          href={floatHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick("sticky", "general")}
          className="group inline-flex items-center gap-2 rounded-full bg-[#25D366] pl-4 pr-2 py-2 text-xs sm:text-sm font-semibold text-white shadow-[0_10px_40px_-10px_rgba(37,211,102,0.8)] ring-1 ring-white/10 hover:bg-[#20BF5B]"
        >
          <MessageCircle className="size-4" />
          <span>Book Free Consultation</span>
          <span className="inline-flex size-7 items-center justify-center rounded-full bg-white/15">
            <ArrowRight className="size-3.5" />
          </span>
        </a>
      </div>
    </>
  );
}