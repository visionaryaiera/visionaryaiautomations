import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/site/ServicePage";
import { getServiceBySlug } from "@/lib/services";

const service = getServiceBySlug("ai-video-ads")!;

export const Route = createFileRoute("/services/ai-video-ads")({
  head: () => ({
    meta: [
      { title: service.seoTitle },
      { name: "description", content: service.seoDescription },
      { property: "og:title", content: service.seoTitle },
      { property: "og:description", content: service.seoDescription },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: service.seoTitle },
      { name: "twitter:description", content: service.seoDescription },
    ],
  }),
  component: () => <ServicePage service={service} />,
});