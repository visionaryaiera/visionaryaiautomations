import { createFileRoute } from "@tanstack/react-router";
import { IndustryPage, INDUSTRIES } from "@/components/site/IndustryPage";

const data = INDUSTRIES.realestate;
const url = "https://www.visionaryaiautomations.com/ai-chatbot-for-real-estate-hyderabad";

export const Route = createFileRoute("/ai-chatbot-for-real-estate-hyderabad")({
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
