import { createFileRoute } from "@tanstack/react-router";
import { IndustryPage, INDUSTRIES } from "@/components/site/IndustryPage";

const data = INDUSTRIES.clinics;
const url = "https://www.visionaryaiautomations.com/ai-chatbot-for-clinics-hyderabad";

export const Route = createFileRoute("/ai-chatbot-for-clinics-hyderabad")({
  head: () => ({
    meta: [
      { title: data.seoTitle },
      { name: "description", content: data.seoDescription },
      { property: "og:title", content: data.seoTitle },
      { property: "og:description", content: data.seoDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
    ],
    links: [{ rel: "canonical", href: url }],
  }),
  component: () => <IndustryPage data={data} />,
});
