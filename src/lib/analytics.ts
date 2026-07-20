// Client-side analytics loader for GA4 + Meta Pixel.
// IDs are configurable at runtime via /settings/analytics (persisted in
// localStorage) and fall back to VITE_GA4_ID / VITE_META_PIXEL_ID at build time.

export const GA4_STORAGE_KEY = "vaa_ga4_id";
export const META_PIXEL_STORAGE_KEY = "vaa_meta_pixel_id";

const ENV_GA4 = (import.meta.env.VITE_GA4_ID as string | undefined) || "";
const ENV_PIXEL = (import.meta.env.VITE_META_PIXEL_ID as string | undefined) || "";

function isPlaceholder(v: string) {
  return !v || /^G-?X+$/i.test(v) || /^X+$/i.test(v);
}

export function getGa4Id(): string {
  if (typeof window === "undefined") return ENV_GA4;
  const v = window.localStorage.getItem(GA4_STORAGE_KEY) || ENV_GA4;
  return isPlaceholder(v) ? "" : v;
}

export function getMetaPixelId(): string {
  if (typeof window === "undefined") return ENV_PIXEL;
  const v = window.localStorage.getItem(META_PIXEL_STORAGE_KEY) || ENV_PIXEL;
  return isPlaceholder(v) ? "" : v;
}

export function setGa4Id(id: string) {
  if (typeof window === "undefined") return;
  if (id) window.localStorage.setItem(GA4_STORAGE_KEY, id.trim());
  else window.localStorage.removeItem(GA4_STORAGE_KEY);
}

export function setMetaPixelId(id: string) {
  if (typeof window === "undefined") return;
  if (id) window.localStorage.setItem(META_PIXEL_STORAGE_KEY, id.trim());
  else window.localStorage.removeItem(META_PIXEL_STORAGE_KEY);
}

let ga4Loaded = "";
let pixelLoaded = "";

export function loadAnalytics() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const ga4 = getGa4Id();
  if (ga4 && ga4Loaded !== ga4) {
    // dataLayer + gtag shim
    window.dataLayer = window.dataLayer || [];
    if (!window.gtag) {
      window.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer!.push(arguments as unknown as unknown[]);
      } as (...args: unknown[]) => void;
      window.gtag("js", new Date());
    }
    window.gtag("config", ga4, { send_page_view: true });

    if (!document.getElementById("ga4-script")) {
      const s = document.createElement("script");
      s.id = "ga4-script";
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4)}`;
      document.head.appendChild(s);
    }
    ga4Loaded = ga4;
  }

  const pixel = getMetaPixelId();
  if (pixel && pixelLoaded !== pixel) {
    if (!window.fbq) {
      /* eslint-disable */
      (function (f: any, b: any, e: string, v: string) {
        if (f.fbq) return;
        const n: any = (f.fbq = function () {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments);
        });
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = true;
        n.version = "2.0";
        n.queue = [];
        const t = b.createElement(e);
        t.async = true;
        t.src = v;
        const s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
      /* eslint-enable */
    }
    window.fbq!("init", pixel);
    window.fbq!("track", "PageView");
    pixelLoaded = pixel;
  }
}
