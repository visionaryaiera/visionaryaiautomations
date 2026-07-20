import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { loadAnalytics, getGa4Id, getMetaPixelId } from "@/lib/analytics";

/**
 * Client-only analytics bootstrap. Reads GA4 + Meta Pixel IDs from
 * localStorage (configured via /settings/analytics) and injects the
 * tracking scripts. Fires page_view on route change.
 */
export function AnalyticsLoader() {
  const location = useRouterState({ select: (s) => s.location });

  useEffect(() => {
    loadAnalytics();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ga4 = getGa4Id();
    if (ga4 && window.gtag) {
      window.gtag("event", "page_view", {
        page_path: location.pathname + location.search,
        page_location: window.location.href,
      });
    }
    if (getMetaPixelId() && window.fbq) {
      window.fbq("track", "PageView");
    }
  }, [location.pathname, location.search]);

  return null;
}
