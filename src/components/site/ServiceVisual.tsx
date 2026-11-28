import { useEffect, useState } from "react";
import { SERVICE_EXTRAS } from "@/lib/serviceExtras";

/** Small showcase next to each service: auto-rotating screens (or a demo video) + one Before → After line. */
export function ServiceVisual({ slug }: { slug?: string }) {
  const extra = slug ? SERVICE_EXTRAS[slug] : undefined;
  const shots = extra?.shots || [];
  const video = slug === "whatsapp-chatbot" ? "/showcase/whatsapp-demo.mp4" : null;
  const [i, setI] = useState(0);
  useEffect(() => {
    if (video || shots.length < 2) return;
    const t = setInterval(() => setI((x) => (x + 1) % shots.length), 3500);
    return () => clearInterval(t);
  }, [video, shots.length]);
  if (!extra) return null;
  return (
    <div className="w-full shrink-0 md:w-72">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30">
        {video ? (
          <video src={video} poster={shots[0]?.src} autoPlay muted loop playsInline preload="none" width={288} height={512}
            className="mx-auto aspect-[9/16] max-h-80 w-auto object-cover" aria-label="WhatsApp AI assistant demo" />
        ) : (
          <div className="relative aspect-[16/10]">
            {shots.map((s, k) => (
              <img key={s.src} src={s.src} alt={s.title} width={1200} height={750} loading="lazy" decoding="async"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${k === i ? "opacity-100" : "opacity-0"}`} />
            ))}
          </div>
        )}
        {!video && shots[i] ? (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 pb-2 pt-6 text-[11px] font-medium text-white">{shots[i].title}</div>
        ) : null}
      </div>
      {extra.before?.[0] && extra.after?.[0] ? (
        <p className="mt-3 text-xs leading-relaxed">
          <span className="text-rose-400/90">✕ {extra.before[0]}</span>
          <br />
          <span className="text-[#25D366]">✓ {extra.after[0]}</span>
        </p>
      ) : null}
    </div>
  );
}
